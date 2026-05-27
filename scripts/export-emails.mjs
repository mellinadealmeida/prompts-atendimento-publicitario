#!/usr/bin/env node

/**
 * Script para exportar e-mails interessados em formato XLSX
 * 
 * Uso: node scripts/export-emails.mjs
 * 
 * Gera um arquivo `emails_interessados_YYYY-MM-DD.xlsx` no diretório raiz
 */

import mysql from 'mysql2/promise';
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

async function exportEmails() {
  try {
    // Validate DATABASE_URL
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL não está configurada. Verifique o arquivo .env');
    }

    console.log('📧 Conectando ao banco de dados...');

    // Parse DATABASE_URL
    const dbUrl = new URL(process.env.DATABASE_URL);
    const connection = await mysql.createConnection({
      host: dbUrl.hostname,
      user: dbUrl.username,
      password: dbUrl.password,
      database: dbUrl.pathname.slice(1),
      port: dbUrl.port || 3306,
    });

    console.log('✅ Conectado ao banco de dados');

    // Fetch all interested emails
    console.log('📥 Buscando e-mails interessados...');
    const [rows] = await connection.query(
      'SELECT email, createdAt FROM interestedEmails ORDER BY createdAt DESC'
    );

    if (!rows || rows.length === 0) {
      console.log('⚠️  Nenhum e-mail encontrado');
      await connection.end();
      return;
    }

    console.log(`✅ ${rows.length} e-mail(s) encontrado(s)`);

    // Prepare data for export
    const data = rows.map((row) => ({
      'E-mail': row.email,
      'Data de Registro': new Date(row.createdAt).toLocaleString('pt-BR'),
    }));

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Adjust column widths
    worksheet['!cols'] = [
      { wch: 35 }, // E-mail
      { wch: 20 }, // Data de Registro
    ];

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'E-mails Interessados');

    // Generate filename with current date
    const today = new Date().toISOString().split('T')[0];
    const filename = `emails_interessados_${today}.xlsx`;
    const filepath = path.join(projectRoot, filename);

    // Write file
    console.log(`📝 Gerando arquivo: ${filename}`);
    XLSX.writeFile(workbook, filepath);

    console.log(`✅ Arquivo exportado com sucesso: ${filepath}`);
    console.log(`📊 Total de e-mails: ${rows.length}`);

    // Close connection
    await connection.end();
  } catch (error) {
    console.error('❌ Erro ao exportar e-mails:', error.message);
    process.exit(1);
  }
}

// Run the export
exportEmails();
