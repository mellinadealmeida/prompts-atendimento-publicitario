# Exportar E-mails Interessados

Este documento descreve como exportar os e-mails capturados na plataforma de mentoria para um arquivo Excel.

## Como Usar

### 1. Via npm/pnpm

Execute o comando de exportação:

```bash
pnpm export:emails
```

Ou com npm:

```bash
npm run export:emails
```

### 2. Resultado

O script irá:
- Conectar ao banco de dados usando a variável `DATABASE_URL`
- Buscar todos os e-mails interessados capturados
- Gerar um arquivo XLSX no formato: `emails_interessados_YYYY-MM-DD.xlsx`
- Salvar o arquivo na raiz do projeto

### 3. Arquivo Gerado

O arquivo Excel conterá:
- **Coluna 1**: E-mail (largura: 35 caracteres)
- **Coluna 2**: Data de Registro (largura: 20 caracteres)

Os e-mails são ordenados por data de registro (mais recentes primeiro).

## Pré-requisitos

- Variável de ambiente `DATABASE_URL` configurada
- Acesso ao banco de dados MySQL/TiDB
- Node.js 18+ instalado

## Exemplo de Saída

```
📧 Conectando ao banco de dados...
✅ Conectado ao banco de dados
📥 Buscando e-mails interessados...
✅ 42 e-mail(s) encontrado(s)
📝 Gerando arquivo: emails_interessados_2026-05-27.xlsx
✅ Arquivo exportado com sucesso: /path/to/project/emails_interessados_2026-05-27.xlsx
📊 Total de e-mails: 42
```

## Automação

Para automatizar a exportação em intervalos regulares, você pode:

1. Usar cron jobs (Linux/Mac):
```bash
0 9 * * * cd /path/to/project && pnpm export:emails
```

2. Usar Task Scheduler (Windows):
```
Ação: Executar programa
Programa: node
Argumentos: scripts/export-emails.mjs
Diretório: C:\path\to\project
```

3. Usar GitHub Actions para exportar automaticamente:
```yaml
name: Export Emails
on:
  schedule:
    - cron: '0 9 * * *'
jobs:
  export:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm export:emails
      - uses: actions/upload-artifact@v3
        with:
          name: emails-export
          path: emails_interessados_*.xlsx
```

## Troubleshooting

### Erro: "DATABASE_URL não está configurada"
- Verifique se a variável de ambiente `DATABASE_URL` está definida
- Verifique o arquivo `.env` ou variáveis de ambiente do sistema

### Erro de conexão ao banco de dados
- Verifique se o banco de dados está acessível
- Verifique as credenciais no `DATABASE_URL`
- Verifique se a tabela `interestedEmails` existe

### Nenhum e-mail encontrado
- Verifique se há e-mails capturados na tabela `interestedEmails`
- Execute uma query diretamente no banco: `SELECT COUNT(*) FROM interestedEmails;`
