import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(req: Request) {
  try {
    const { ticketId } = await req.json();

    if (!ticketId) {
      return NextResponse.json({ success: false, message: "No Ticket ID provided" }, { status: 400 });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: authClient as any });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // 1. Fetch all rows to find the ticket
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A:O', // Fetching up to Column O (Checked In status)
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return NextResponse.json({ success: false, message: "Database is empty." }, { status: 404 });
    }

    // 2. Find the row with the matching Ticket ID (Column B is index 1)
    const rowIndex = rows.findIndex(row => row[1] === ticketId);

    if (rowIndex === -1) {
      return NextResponse.json({ success: false, message: "INVALID TICKET: Not found in database." }, { status: 404 });
    }

    const row = rows[rowIndex];
    const attendeeName = row[3]; // Column D
    const ticketTier = row[2];   // Column C
    const isCheckedIn = row[14]; // Column O

    // 3. Check if they already entered
    if (isCheckedIn === 'TRUE') {
      return NextResponse.json({ 
        success: false, 
        message: `ALREADY SCANNED: ${attendeeName} has already checked in.`,
        name: attendeeName,
        tier: ticketTier
      }, { status: 403 });
    }

    // 4. Update the "Checked In" cell (Column O) for this specific row to 'TRUE'
    // Note: Google Sheets rows are 1-indexed. So array index 0 is row 1.
    const sheetRowNumber = rowIndex + 1; 
    
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `Sheet1!O${sheetRowNumber}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [['TRUE']],
      },
    });

    // 5. Return success to the scanner!
    return NextResponse.json({ 
      success: true, 
      message: "ACCESS GRANTED",
      name: attendeeName,
      tier: ticketTier
    });

  } catch (error: any) {
    console.error("Verification Error:", error.message);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}