import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(req: Request) {
  try {
    const teamMembersData = await req.json();

    // Safety Check: Instantly tells you if your .env file isn't loading
    if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      throw new Error("Missing crucial Google Environment Variables in .env.local");
    }

    // Authenticate with Google Sheets (Updated to remove deprecation warning)
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Get the authenticated client
    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: authClient as any });
    
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // Security Helper: Prepends a single quote to force Google Sheets to read it as plain text
    const sanitize = (str: string | undefined | null) => (str ? `'${str}` : 'N/A');

    // Map the data into spreadsheet rows
    const rows = teamMembersData.map((member: any) => {
      // Generates the visual QR code right in the cell using the ID in Column B
      const qrImageFormula = `=IMAGE("https://quickchart.io/qr?text=${member.ticketId}&size=200")`;

      return [
        new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }), 
        member.ticketId,                                                  
        member.ticketType,                                                
        sanitize(member.name),                                            
        sanitize(member.email),                                           
        sanitize(member.phoneNo),                                         
        sanitize(member.usn),                                             
        sanitize(member.workStudy === 'other' ? member.workStudyCustom : member.workStudy), 
        sanitize(member.department),                                      
        sanitize(member.semester),                                        
        sanitize(member.findUs === 'other' ? member.findUsCustom : member.findUs),  
        member.paymentType ? member.paymentType.toUpperCase() : 'UPI',                                 
        sanitize(member.paymentType === 'upi' ? member.upiTransactionId : member.teamMemberName), 
        member.paymentScreenshot || 'N/A',                                
        'FALSE',                                                          
        qrImageFormula                                                    
      ];
    });

    // Append all rows to the Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:P', // Make sure your Google Sheet tab is named 'Sheet1'
      valueInputOption: 'USER_ENTERED', // Critical: Allows the =IMAGE() formula to evaluate
      requestBody: {
        values: rows,
      },
    });

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("Sheets Upload Error:", error.message);
    return NextResponse.json({ error: error.message || 'Failed to write to Google Sheets' }, { status: 500 });
  }
}