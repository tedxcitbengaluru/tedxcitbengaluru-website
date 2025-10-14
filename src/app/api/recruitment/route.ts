import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;

// Map team slugs to sheet names
const SHEET_NAMES: Record<string, string> = {
  'technical': 'Technical',
  'event-management': 'Event Management',
  'sponsorship': 'Sponsorship',
  'curation': 'Curation',
  'design': 'Design',
  'media': 'Media',
};

// Define headers for each team's sheet
const TEAM_HEADERS: Record<string, string[]> = {
  'technical': [
    'Timestamp',
    'Name',
    'USN',
    'College Email',
    'Personal Email',
    'Phone',
    'Department',
    'Semester',
    'otherClubs',
    'Team',
    'Project Description',
    'Crazy Feature',
    'Incident Response',
    'Portfolio Link',
    'Tools & Next Learning',
    'One Word',
    'Proof Link',
    'Goals',
  ],
  'event-management': [
    'Timestamp',
    'Name',
    'USN',
    'College Email',
    'Personal Email',
    'Phone',
    'Department',
    'Semester',
    'otherClubs',
    'Team',
    'Why Event Management',
    'TEDx Meaning',
    'What Excites You',
    'Handle Pressure',
    'Teamwork Example',
    'Prior Experience',
    'Preferred Tasks',
    'Management Strategies',
    'Tackle Non-Working Members',
    'Portfolio Link',
    'Campaign Idea',
  ],
  'sponsorship': [
    'Timestamp',
    'Name',
    'USN',
    'College Email',
    'Personal Email',
    'Phone',
    'Department',
    'Semester',
    'otherClubs',
    'Team',
    'Outreach Strategy',
    'Pitch Script',
    'Channels Used',
    'Business Selection',
    'Relationship Building',
    'Proposal Contents',
    'Handle Objections',
    'Availability Plan',
  ],
  'curation': [
    'Timestamp',
    'Name',
    'USN',
    'College Email',
    'Personal Email',
    'Phone',
    'Department',
    'Semester',
    'otherClubs',
    'Team',
    'Writing Proficiency',
    'Captions',
    'Theme Ideas',
    'What Resonates',
    'Philosophical Thought',
    'Why Curation',
    'AI vs Curators',
    'Content Enhancement',
    'Image Description',
  ],
  'design': [
    'Timestamp',
    'Name',
    'USN',
    'College Email',
    'Personal Email',
    'Phone',
    'Department',
    'Semester',
    'otherClubs',
    'Team',
    'Software Proficiency',
    'Learning New Tools',
    'Engagement Strategies',
    'Proud Project',
    'Design Trends',
    'Inspiration Sources',
    'Team Communication',
    'Past Work Links',
  ],
  'media': [
    'Timestamp',
    'Name',
    'USN',
    'College Email',
    'Personal Email',
    'Phone',
    'Department',
    'Semester',
    'otherClubs',
    'Team',
    'Software Proficiency',
    'Proud Project',
    'Inspiration',
    'New Tools Comfort',
    'Engagement Strategy',
    'Past Work Links',
  ],
};

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const {
      basicDetails,
      technicalDetails,
      eventManagementDetails,
      sponsorshipDetails,
      curationDetails,
      designDetails,
      mediaDetails,
    } = data;

    if (!basicDetails || !basicDetails.team) {
      return NextResponse.json(
        { error: 'Basic details and team selection are required' },
        { status: 400 }
      );
    }

    if (!SPREADSHEET_ID) {
      return NextResponse.json(
        { error: 'Spreadsheet ID not configured' },
        { status: 500 }
      );
    }

    // Determine team slug from team name
    const teamSlugMap: Record<string, string> = {
      'Technical': 'technical',
      'Event Management': 'event-management',
      'Sponsorship': 'sponsorship',
      'Curation': 'curation',
      'Design': 'design',
      'Media': 'media',
    };

    const teamSlug = teamSlugMap[basicDetails.team];
    if (!teamSlug) {
      return NextResponse.json(
        { error: 'Invalid team selected' },
        { status: 400 }
      );
    }

    const sheetName = SHEET_NAMES[teamSlug];
    if (!sheetName) {
      return NextResponse.json(
        { error: 'Sheet configuration not found for team' },
        { status: 400 }
      );
    }

    // ✅ Ensure sheet exists with headers
    await ensureSheetExists(sheetName, teamSlug);

    // ✅ USN uniqueness check across all sheets
    const newUSN = (basicDetails.usn || '').trim().toUpperCase();
    const isUSNDuplicate = await checkUSNAcrossAllSheets(newUSN);

    if (isUSNDuplicate) {
      return NextResponse.json(
        { error: 'USN already registered. Please verify your details.' },
        { status: 400 }
      );
    }

    // ✅ Prepare row data
    const timestamp = new Date().toISOString();
    let rowData: any[] = [
      timestamp,
      basicDetails.name || '',
      basicDetails.usn || '',
      basicDetails.collegeEmail || '',
      basicDetails.personalEmail || '',
      basicDetails.phone || '',
      basicDetails.department || '',
      basicDetails.semester || '',
      basicDetails.otherClubs || '',
      basicDetails.team || '',
    ];

    // Add team-specific fields
    switch (teamSlug) {
      case 'technical':
        if (technicalDetails) {
          rowData.push(
            technicalDetails.project || '',
            technicalDetails.crazyFeature || '',
            technicalDetails.incidentResponse || '',
            technicalDetails.portfolioLink || '',
            technicalDetails.toolsAndNext || '',
            technicalDetails.oneWord || '',
            technicalDetails.proofLink || '',
            technicalDetails.goals || ''
          );
        }
        break;
      case 'event-management':
        if (eventManagementDetails) {
          rowData.push(
            eventManagementDetails.why || '',
            eventManagementDetails.meaning || '',
            eventManagementDetails.excites || '',
            eventManagementDetails.pressure || '',
            eventManagementDetails.teamwork || '',
            eventManagementDetails.experience || '',
            eventManagementDetails.prefer || '',
            eventManagementDetails.strategies || '',
            eventManagementDetails.tackle || '',
            eventManagementDetails.portfolio || '',
            eventManagementDetails.campaign || ''
          );
        }
        break;
      case 'sponsorship':
        if (sponsorshipDetails) {
          rowData.push(
            sponsorshipDetails.outreach || '',
            sponsorshipDetails.pitch || '',
            sponsorshipDetails.channels || '',
            sponsorshipDetails.selection || '',
            sponsorshipDetails.relationships || '',
            sponsorshipDetails.proposal || '',
            sponsorshipDetails.objections || '',
            sponsorshipDetails.availability || ''
          );
        }
        break;
      case 'curation':
        if (curationDetails) {
          rowData.push(
            curationDetails.writingProficiency || '',
            curationDetails.captions || '',
            curationDetails.themes || '',
            curationDetails.resonate || '',
            curationDetails.philosophy || '',
            curationDetails.why || '',
            curationDetails.ai || '',
            curationDetails.enhance || '',
            curationDetails.imageDesc || ''
          );
        }
        break;
      case 'design':
        if (designDetails) {
          rowData.push(
            designDetails.proficiency || '',
            designDetails.newTools || '',
            designDetails.strategies || '',
            designDetails.project || '',
            designDetails.trends || '',
            designDetails.inspiration || '',
            designDetails.communication || '',
            designDetails.links || ''
          );
        }
        break;
      case 'media':
        if (mediaDetails) {
          rowData.push(
            mediaDetails.proficiency || '',
            mediaDetails.project || '',
            mediaDetails.inspiration || '',
            mediaDetails.tools || '',
            mediaDetails.strategy || '',
            mediaDetails.links || ''
          );
        }
        break;
      default:
        return NextResponse.json(
          { error: 'Unknown team type' },
          { status: 400 }
        );
    }

    // ✅ Append new data
    const range = `${sheetName}!A:Z`;
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [rowData] },
    });

    return NextResponse.json(
      { success: true, message: 'Application submitted successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    return NextResponse.json(
      {
        error: 'Failed to submit application',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// ✅ Helper: Check USN across all sheets
async function checkUSNAcrossAllSheets(usn: string): Promise<boolean> {
  try {
    if (!SPREADSHEET_ID) return false;

    const normalizedUSN = usn.trim().toUpperCase();

    for (const teamSlug of Object.keys(SHEET_NAMES)) {
      const sheetName = SHEET_NAMES[teamSlug];
      const existingRows = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${sheetName}!C2:C`, // C = USN column
      });

      const usnList = existingRows.data.values?.flat().map((v) => v.trim().toUpperCase()) || [];

      if (usnList.includes(normalizedUSN)) {
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error('Error checking USN across sheets:', error);
    throw error;
  }
}

// ✅ Helper: Ensure the sheet exists and has headers
async function ensureSheetExists(sheetName: string, teamSlug: string) {
  try {
    if (!SPREADSHEET_ID) return;

    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    });

    const sheetExists = spreadsheet.data.sheets?.some(
      (sheet) => sheet.properties?.title === sheetName
    );

    if (!sheetExists) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: sheetName,
                  gridProperties: { frozenRowCount: 1 },
                },
              },
            },
          ],
        },
      });

      const headers = TEAM_HEADERS[teamSlug] || [];
      if (headers.length > 0) {
        const headerRange = `${sheetName}!A1:${String.fromCharCode(64 + headers.length)}1`;
        await sheets.spreadsheets.values.update({
          spreadsheetId: SPREADSHEET_ID,
          range: headerRange,
          valueInputOption: 'USER_ENTERED',
          requestBody: { values: [headers] },
        });

        const sheetId = await getSheetId(sheetName);
        if (sheetId !== null) {
          await sheets.spreadsheets.batchUpdate({
            spreadsheetId: SPREADSHEET_ID,
            requestBody: {
              requests: [
                {
                  repeatCell: {
                    range: { sheetId, startRowIndex: 0, endRowIndex: 1 },
                    cell: {
                      userEnteredFormat: {
                        backgroundColor: { red: 0.9, green: 0.9, blue: 0.9 },
                        textFormat: { bold: true },
                      },
                    },
                    fields: 'userEnteredFormat(backgroundColor,textFormat)',
                  },
                },
              ],
            },
          });
        }
      }
    }
  } catch (error) {
    console.error('Error ensuring sheet exists:', error);
    throw error;
  }
}

// ✅ Helper: Get Sheet ID
async function getSheetId(sheetName: string): Promise<number | null> {
  try {
    if (!SPREADSHEET_ID) return null;

    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    });

    const sheet = spreadsheet.data.sheets?.find(
      (s) => s.properties?.title === sheetName
    );

    return sheet?.properties?.sheetId ?? null;
  } catch (error) {
    console.error('Error getting sheet ID:', error);
    return null;
  }
}