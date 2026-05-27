import * as XLSX from 'xlsx';
import type { InterestedEmail } from '../drizzle/schema';

/**
 * Generate XLSX workbook from interested emails
 */
export function generateEmailsWorkbook(emails: InterestedEmail[]): XLSX.WorkBook {
  // Prepare data for export
  const data = emails.map((email) => ({
    'E-mail': email.email,
    'Data de Registro': new Date(email.createdAt).toLocaleString('pt-BR'),
  }));

  // Create worksheet from JSON data
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Adjust column widths
  worksheet['!cols'] = [
    { wch: 35 }, // E-mail
    { wch: 20 }, // Data de Registro
  ];

  // Create workbook and add worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'E-mails Interessados');

  return workbook;
}

/**
 * Get workbook as buffer for download
 */
export function getWorkbookBuffer(workbook: XLSX.WorkBook): Uint8Array {
  return XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
}

/**
 * Validate workbook structure
 */
export function validateWorkbookStructure(workbook: XLSX.WorkBook): boolean {
  if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
    return false;
  }

  const sheetName = workbook.SheetNames[0];
  if (sheetName !== 'E-mails Interessados') {
    return false;
  }

  const worksheet = workbook.Sheets[sheetName];
  if (!worksheet) {
    return false;
  }

  // Check for expected headers
  const headers = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0];
  if (!Array.isArray(headers)) {
    return false;
  }

  const expectedHeaders = ['E-mail', 'Data de Registro'];
  return expectedHeaders.every((h) => headers.includes(h));
}

/**
 * Extract data from workbook for validation
 */
export function extractWorkbookData(workbook: XLSX.WorkBook): Array<{ email: string; date: string }> {
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet) as Array<{
    'E-mail': string;
    'Data de Registro': string;
  }>;

  return data.map((row) => ({
    email: row['E-mail'],
    date: row['Data de Registro'],
  }));
}
