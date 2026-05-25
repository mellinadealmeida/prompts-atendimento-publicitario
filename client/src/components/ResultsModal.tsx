import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Download, Share2 } from 'lucide-react';
import { useState } from 'react';

interface CategoryScore {
  name: string;
  score: number;
  weight: number;
  description: string;
}

interface ResultsModalProps {
  categoryScores: CategoryScore[];
  overallScore: number;
  onClose: () => void;
}

const RECOMMENDATIONS: Record<string, { title: string; items: string[] }> = {
  'Visão Estratégica': {
    title: 'Desenvolvendo Visão Estratégica',
    items: [
      'Dedique tempo a entender o negócio do cliente além do briefing inicial',
      'Estude relatórios de mercado e tendências da indústria do cliente',
      'Participe de reuniões estratégicas e de planejamento',
      'Aprenda a ler e interpretar KPIs e métricas de negócio',
      'Proponha análises de dados para embasar suas recomendações',
      'Assista webinars e cursos sobre estratégia de marketing digital',
    ],
  },
  'Gestão de Relacionamento': {
    title: 'Fortalecendo Relacionamentos',
    items: [
      'Pratique escuta ativa em todas as reuniões',
      'Desenvolva sua inteligência emocional através de cursos ou coaching',
      'Crie um processo de feedback regular com clientes',
      'Documente as preferências e histórico de cada cliente',
      'Antecipe problemas e comunique-se proativamente',
      'Invista em treinamentos de comunicação e negociação',
    ],
  },
  'Execução e Processos': {
    title: 'Otimizando Processos',
    items: [
      'Padronize seus briefings com um template claro e estruturado',
      'Implemente um sistema de gestão de projetos (Asana, Monday, etc.)',
      'Crie checklists para cada tipo de projeto',
      'Estabeleça prazos realistas e comunique-os claramente',
      'Revise regularmente seus processos e busque melhorias',
      'Treine sua equipe nos processos e ferramentas utilizadas',
    ],
  },
  'Personal Branding': {
    title: 'Construindo sua Marca Pessoal',
    items: [
      'Reescreva seu currículo focando em resultados e impacto',
      'Desenvolva um portfólio com seus melhores cases',
      'Otimize seu perfil no LinkedIn com headline estratégico',
      'Comece a compartilhar insights sobre sua área',
      'Peça recomendações de clientes e colegas no LinkedIn',
      'Participe de grupos e comunidades profissionais online',
    ],
  },
};

const getScoreLevel = (score: number): { label: string; color: string; bg: string } => {
  if (score >= 80) return { label: 'Excelente', color: 'text-green-700', bg: 'bg-green-50' };
  if (score >= 60) return { label: 'Bom', color: 'text-blue-700', bg: 'bg-blue-50' };
  if (score >= 40) return { label: 'Intermediário', color: 'text-yellow-700', bg: 'bg-yellow-50' };
  return { label: 'Iniciante', color: 'text-orange-700', bg: 'bg-orange-50' };
};

const getProgressColor = (score: number): string => {
  if (score >= 80) return 'bg-green-500';
  if (score >= 60) return 'bg-blue-500';
  if (score >= 40) return 'bg-yellow-500';
  return 'bg-orange-500';
};

export default function ResultsModal({ categoryScores, overallScore, onClose }: ResultsModalProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const overallLevel = getScoreLevel(overallScore);

  const handleDownloadReport = () => {
    const reportContent = `
RELATÓRIO DE AUTOAVALIAÇÃO - ATENDIMENTO PUBLICITÁRIO
======================================================

Pontuação Geral: ${overallScore}% (${overallLevel.label})

RESULTADOS POR CATEGORIA:
${categoryScores.map(cat => `
${cat.name}: ${cat.score}% (${getScoreLevel(cat.score).label})
${cat.description}
`).join('\n')}

PRÓXIMOS PASSOS:
${categoryScores.map(cat => {
  const recs = RECOMMENDATIONS[cat.name];
  return `
${recs.title}:
${recs.items.map((item, i) => `${i + 1}. ${item}`).join('\n')}
`;
}).join('\n')}

Gerado em: ${new Date().toLocaleDateString('pt-BR')}
    `;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(reportContent));
    element.setAttribute('download', `relatorio_autoavaliacao_${new Date().getTime()}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Seus Resultados</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overall Score */}
          <Card className={`p-6 border-0 ${overallLevel.bg}`}>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">
                <span className={overallLevel.color}>{overallScore}%</span>
              </div>
              <p className={`text-lg font-semibold ${overallLevel.color}`}>
                {overallLevel.label}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Sua pontuação geral de maturidade profissional
              </p>
            </div>
          </Card>

          {/* Category Scores */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Análise por Competência</h3>
            {categoryScores.map(category => {
              const level = getScoreLevel(category.score);
              const isExpanded = expandedCategory === category.name;
              const recs = RECOMMENDATIONS[category.name];

              return (
                <div key={category.name} className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedCategory(isExpanded ? null : category.name)}
                    className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="text-left flex-1">
                      <p className="font-medium text-gray-900">{category.name}</p>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </div>
                    <div className="text-right ml-4">
                      <div className={`text-2xl font-bold ${level.color}`}>
                        {category.score}%
                      </div>
                      <p className={`text-xs font-medium ${level.color}`}>{level.label}</p>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 bg-gray-50 border-t">
                      <div className="mb-4">
                        <Progress
                          value={category.score}
                          className="h-2"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">{recs.title}</h4>
                        <ul className="space-y-2">
                          {recs.items.map((item, idx) => (
                            <li key={idx} className="flex gap-3 text-sm text-gray-700">
                              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-semibold">
                                {idx + 1}
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Insights */}
          <Card className="p-4 bg-blue-50 border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">💡 Insights Importantes</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Sua avaliação é um ponto de partida para desenvolvimento contínuo</li>
              <li>• Foque primeiro nas áreas com pontuação mais baixa</li>
              <li>• Compartilhe seus resultados com um mentor ou gestor</li>
              <li>• Revise esta avaliação a cada 3-6 meses para acompanhar progresso</li>
            </ul>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleDownloadReport}
              variant="outline"
              className="flex-1"
            >
              <Download className="w-4 h-4 mr-2" />
              Baixar Relatório
            </Button>
            <Button
              onClick={onClose}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
