import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLocation } from 'wouter';
import { ArrowLeft, Download, Loader2 } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function AdminEmails() {
  const [, setLocation] = useLocation();
  const [isExporting, setIsExporting] = useState(false);

  const { data: emails, isLoading, error } = trpc.assessment.getAllEmails.useQuery();

  const handleExportXLS = async () => {
    if (!emails || emails.length === 0) {
      toast.error('Nenhum e-mail para exportar');
      return;
    }

    setIsExporting(true);
    try {
      // Criar dados para o XLS
      const headers = ['E-mail', 'Data de Registro'];
      const rows = emails.map((email) => [
        email.email,
        new Date(email.createdAt).toLocaleString('pt-BR'),
      ]);

      // Criar conteúdo CSV (compatível com Excel)
      const csvContent = [
        headers.join('\t'),
        ...rows.map((row) => row.join('\t')),
      ].join('\n');

      // Criar blob e download
      const blob = new Blob([csvContent], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `emails_interessados_${new Date().toISOString().split('T')[0]}.xls`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success(`${emails.length} e-mails exportados com sucesso!`);
    } catch (error) {
      console.error('Erro ao exportar:', error);
      toast.error('Erro ao exportar e-mails');
    } finally {
      setIsExporting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-gray-600">Carregando e-mails...</p>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 text-center border-red-200 bg-red-50">
            <p className="text-red-600 mb-4">Erro ao carregar e-mails</p>
            <Button
              onClick={() => setLocation('/')}
              variant="outline"
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={() => setLocation('/')}
            variant="ghost"
            className="gap-2 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            E-mails Interessados
          </h1>
          <p className="text-gray-600">
            Total de {emails?.length || 0} e-mail(s) capturado(s)
          </p>
        </div>

        {/* Export Button */}
        <Card className="p-6 mb-8 border-0 shadow-sm">
          <Button
            onClick={handleExportXLS}
            disabled={isExporting || !emails || emails.length === 0}
            className="gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Exportando...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Exportar para XLS
              </>
            )}
          </Button>
        </Card>

        {/* Emails List */}
        {emails && emails.length > 0 ? (
          <Card className="border-0 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      E-mail
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Data de Registro
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {emails.map((email, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {email.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(email.createdAt).toLocaleString('pt-BR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        ) : (
          <Card className="p-8 text-center border-0 shadow-sm">
            <p className="text-gray-600">Nenhum e-mail capturado ainda</p>
          </Card>
        )}
      </div>
    </div>
  );
}
