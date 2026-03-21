import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(req: Request) {
  try {
    const teamMembersData = await req.json();

    // Safety Check
    if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      throw new Error("Missing crucial Google Environment Variables in .env.local");
    }

    // Authenticate
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: authClient as any });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // --- NEW: DUPLICATE PREVENTION LOGIC ---

    // 1. Fetch existing emails (Column E) and phone numbers (Column F)
    const existingDataResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!E:F', 
    });

    const existingRows = existingDataResponse.data.values || [];

    // Helper to clean up strings (removes the single quote we add during sanitize, trims, and lowers case)
    const normalize = (val: any) => val ? String(val).replace(/^'/, '').trim().toLowerCase() : '';

    const existingEmails = new Set(existingRows.map(row => normalize(row[0])));
    const existingPhones = new Set(existingRows.map(row => normalize(row[1])));

    // 2. Check incoming payload against database AND for internal duplicates (in case of a group ticket)
    const incomingEmails = new Set();
    const incomingPhones = new Set();

    for (const member of teamMembersData) {
      const email = normalize(member.email);
      const phone = normalize(member.phoneNo);

      // Check against database
      if (existingEmails.has(email)) {
        return NextResponse.json({ error: `Clearance Denied: Email ${member.email} is already registered.` }, { status: 409 });
      }
      if (existingPhones.has(phone)) {
        return NextResponse.json({ error: `Clearance Denied: Phone ${member.phoneNo} is already registered.` }, { status: 409 });
      }

      // Check for internal duplicates within the same group submission
      if (incomingEmails.has(email) || incomingPhones.has(phone)) {
        return NextResponse.json({ error: `Clearance Denied: Duplicate details found within your group form.` }, { status: 409 });
      }

      incomingEmails.add(email);
      incomingPhones.add(phone);
    }

    // --- END DUPLICATE PREVENTION LOGIC ---

    const sanitize = (str: string | undefined | null) => (str ? `'${str}` : 'N/A');

    // Map the data into spreadsheet rows
    const rows = teamMembersData.map((member: any) => {
      const qrImageFormula = `=IMAGE("https://quickchart.io/qr?text=${member.ticketId}&size=200")`;

      return [
        new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }), // A: Timestamp
        member.ticketId,                                                  // B: Ticket ID
        member.ticketType,                                                // C: Ticket Tier
        sanitize(member.name),                                            // D: Name
        sanitize(member.email),                                           // E: Email
        sanitize(member.phoneNo),                                         // F: Phone
        sanitize(member.usn),                                             // G: USN / Roll No
        sanitize(member.workStudy === 'other' ? member.workStudyCustom : member.workStudy), // H: Base
        sanitize(member.department),                                      // I: Department
        sanitize(member.semester),                                        // J: Semester
        sanitize(member.findUs === 'other' ? member.findUsCustom : member.findUs),          // K: Origin Node
        sanitize(member.idea),                                            // L: Idea
        member.paymentType ? member.paymentType.toUpperCase() : 'UPI',    // M: Payment Type
        sanitize(member.paymentType === 'upi' ? member.upiTransactionId : member.teamMemberName), // N: Transaction ID
        member.paymentScreenshot || 'N/A',                                // O: Screenshot Link
        'FALSE',                                                          // P: Verification Status
        qrImageFormula                                                    // Q: Visual QR Code
      ];
    });

    // Append all rows to the Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:Q',
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: rows },
    });

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("Sheets Upload Error:", error.message);
    return NextResponse.json({ error: 'Critical systems error during data submission.' }, { status: 500 });
  }
}