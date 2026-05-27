import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ChevronDown, ChevronUp, Download } from 'lucide-react';
import ResultsModal from '@/components/ResultsModal';

interface Question {
  id: string;
  category: string;
  question: string;
  description?: string;
  weight: number;
}

interface CategoryScore {
  name: string;
  score: number;
  weight: number;
  description: string;
}

const QUESTIONS: Question[] = [
  // Visão Estratégica (peso 2)
  {
    id: 'vs1',
    category: 'Visão Estratégica',
    question: 'Você compreende profundamente os objetivos de negócio dos seus clientes?',
    description: 'Capacidade de entender metas, KPIs e desafios do cliente além do briefing inicial.',
    weight: 2,
  },
  {
    id: 'vs2',
    category: 'Visão Estratégica',
    question: 'Você consegue conectar ações de comunicação aos resultados de negócio?',
    description: 'Habilidade de demonstrar como as campanhas impactam nas métricas de negócio do cliente.',
    weight: 2,
  },
  {
    id: 'vs3',
    category: 'Visão Estratégica',
    question: 'Você propõe soluções estratégicas antes que o cliente peça?',
    description: 'Proatividade em identificar oportunidades e apresentar ideias inovadoras.',
    weight: 2,
  },
  {
    id: 'vs4',
    category: 'Visão Estratégica',
    question: 'Você utiliza dados para embasar suas decisões e recomendações?',
    description: 'Análise de dados para fundamentar estratégias e comprovar resultados.',
    weight: 2,
  },

  // Gestão de Relacionamento (peso 2)
  {
    id: 'gr1',
    category: 'Gestão de Relacionamento',
    question: 'Você pratica escuta ativa durante reuniões e conversas com clientes?',
    description: 'Capacidade de ouvir além das palavras, identificando necessidades latentes.',
    weight: 2,
  },
  {
    id: 'gr2',
    category: 'Gestão de Relacionamento',
    question: 'Você consegue gerenciar expectativas de forma proativa?',
    description: 'Habilidade de alinhar expectativas realistas e evitar frustrações.',
    weight: 2,
  },
  {
    id: 'gr3',
    category: 'Gestão de Relacionamento',
    question: 'Você demonstra empatia genuína com os desafios do cliente?',
    description: 'Capacidade de se colocar no lugar do cliente e compreender suas perspectivas.',
    weight: 2,
  },
  {
    id: 'gr4',
    category: 'Gestão de Relacionamento',
    question: 'Você consegue lidar com crises e situações delicadas com calma e estratégia?',
    description: 'Inteligência emocional para gerenciar conflitos e preservar relacionamentos.',
    weight: 2,
  },

  // Execução e Processos (peso 1.5)
  {
    id: 'ep1',
    category: 'Execução e Processos',
    question: 'Você elabora briefings claros e estruturados?',
    description: 'Capacidade de traduzir necessidades do cliente em direcionamentos para a equipe criativa.',
    weight: 1.5,
  },
  {
    id: 'ep2',
    category: 'Execução e Processos',
    question: 'Você cumpre prazos e gerencia cronogramas efetivamente?',
    description: 'Organização e disciplina para entregar projetos dentro do prazo.',
    weight: 1.5,
  },
  {
    id: 'ep3',
    category: 'Execução e Processos',
    question: 'Você documenta decisões e alinhamentos de forma clara?',
    description: 'Hábito de registrar informações importantes para evitar retrabalho e mal-entendidos.',
    weight: 1.5,
  },
  {
    id: 'ep4',
    category: 'Execução e Processos',
    question: 'Você utiliza ferramentas e softwares de gestão de projetos?',
    description: 'Domínio de CRM, project management tools e plataformas de comunicação.',
    weight: 1.5,
  },

  // Personal Branding (peso 1.5)
  {
    id: 'pb1',
    category: 'Personal Branding',
    question: 'Seu currículo destaca resultados e impacto, não apenas tarefas?',
    description: 'Capacidade de comunicar seu valor de forma quantificável e estratégica.',
    weight: 1.5,
  },
  {
    id: 'pb2',
    category: 'Personal Branding',
    question: 'Você possui um portfólio que mostra seus cases de sucesso?',
    description: 'Documentação clara de projetos, resultados e seu papel estratégico.',
    weight: 1.5,
  },
  {
    id: 'pb3',
    category: 'Personal Branding',
    question: 'Seu perfil no LinkedIn está otimizado e atualizado?',
    description: 'Presença profissional forte com headline estratégico, sobre bem escrito e recomendações.',
    weight: 1.5,
  },
  {
    id: 'pb4',
    category: 'Personal Branding',
    question: 'Você produz conteúdo ou compartilha insights sobre sua área?',
    description: 'Visibilidade e posicionamento como autoridade através de posts, artigos ou comentários relevantes.',
    weight: 1.5,
  },
];

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'Visão Estratégica': 'Capacidade de entender negócio, propor soluções estratégicas e usar dados para decisões.',
  'Gestão de Relacionamento': 'Habilidades de comunicação, empatia, escuta ativa e gestão de crises.',
  'Execução e Processos': 'Organização, disciplina, documentação e uso de ferramentas de gestão.',
  'Personal Branding': 'Posicionamento profissional através de currículo, portfólio, LinkedIn e conteúdo.',
};

export default function SelfAssessment() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Visão Estratégica');
  const [showResults, setShowResults] = useState(false);

  const categories = Array.from(new Set(QUESTIONS.map(q => q.category)));
  const totalQuestions = QUESTIONS.length;
  const answeredQuestions = Object.keys(answers).length;
  const progressPercentage = (answeredQuestions / totalQuestions) * 100;

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const calculateCategoryScores = (): CategoryScore[] => {
    return categories.map(category => {
      const categoryQuestions = QUESTIONS.filter(q => q.category === category);
      const totalWeight = categoryQuestions.reduce((sum, q) => sum + q.weight, 0);
      
      let weightedScore = 0;
      categoryQuestions.forEach(question => {
        const answer = answers[question.id] || 0;
        weightedScore += (answer / 5) * question.weight;
      });

      const score = totalWeight > 0 ? (weightedScore / totalWeight) * 100 : 0;
      
      return {
        name: category,
        score: Math.round(score),
        weight: totalWeight,
        description: CATEGORY_DESCRIPTIONS[category] || '',
      };
    });
  };

  const categoryScores = calculateCategoryScores();
  const overallScore = categoryScores.length > 0
    ? Math.round(categoryScores.reduce((sum, cat) => sum + cat.score, 0) / categoryScores.length)
    : 0;

  const isComplete = answeredQuestions === totalQuestions;

  const renderQuestionsByCategory = (category: string) => {
    const categoryQuestions = QUESTIONS.filter(q => q.category === category);
    
    return (
      <div key={category} className="mb-6">
        <button
          onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
          className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-colors"
        >
          <div className="text-left">
            <h3 className="font-semibold text-lg text-gray-900">{category}</h3>
            <p className="text-sm text-gray-600 mt-1">{CATEGORY_DESCRIPTIONS[category]}</p>
          </div>
          {expandedCategory === category ? (
            <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
          ) : (
            <ChevronDown className="w-5 h-5 text-blue-600 flex-shrink-0" />
          )}
        </button>

        {expandedCategory === category && (
          <div className="mt-4 space-y-6 pl-4">
            {categoryQuestions.map(question => (
              <div key={question.id} className="border-l-2 border-blue-200 pl-4">
                <div className="mb-3">
                  <p className="font-medium text-gray-900">{question.question}</p>
                  {question.description && (
                    <p className="text-sm text-gray-600 mt-1">{question.description}</p>
                  )}
                </div>
                
                <RadioGroup
                  value={answers[question.id]?.toString() || ''}
                  onValueChange={(value) => handleAnswer(question.id, parseInt(value))}
                >
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="1" id={`${question.id}-1`} />
                      <Label htmlFor={`${question.id}-1`} className="text-xs sm:text-sm cursor-pointer whitespace-nowrap">
                        Não
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="2" id={`${question.id}-2`} />
                      <Label htmlFor={`${question.id}-2`} className="text-xs sm:text-sm cursor-pointer whitespace-nowrap">
                        Às vezes
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="3" id={`${question.id}-3`} />
                      <Label htmlFor={`${question.id}-3`} className="text-xs sm:text-sm cursor-pointer whitespace-nowrap">
                        Parcialmente
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="4" id={`${question.id}-4`} />
                      <Label htmlFor={`${question.id}-4`} className="text-xs sm:text-sm cursor-pointer whitespace-nowrap">
                        Geralmente
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="5" id={`${question.id}-5`} />
                      <Label htmlFor={`${question.id}-5`} className="text-xs sm:text-sm cursor-pointer whitespace-nowrap">
                        Sempre
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Diagnóstico de Competências
          </h1>
          <p className="text-lg text-gray-600">
            Avalie suas habilidades como profissional de atendimento publicitário
          </p>
        </div>

        {/* Progress */}
        <Card className="mb-8 p-6 border-0 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">
              Progresso: {answeredQuestions} de {totalQuestions} perguntas
            </span>
            <span className="text-sm font-semibold text-blue-600">{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </Card>

        {/* Questions */}
        <div className="space-y-4 mb-8">
          {categories.map(category => renderQuestionsByCategory(category))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => setShowResults(true)}
            disabled={!isComplete}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
          >
            Ver Resultados
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              setAnswers({});
              setExpandedCategory('Visão Estratégica');
            }}
          >
            Limpar Respostas
          </Button>
        </div>

        {/* Results Modal */}
        {showResults && (
          <ResultsModal
            categoryScores={categoryScores}
            overallScore={overallScore}
            onClose={() => setShowResults(false)}
          />
        )}
      </div>
    </div>
  );
}
