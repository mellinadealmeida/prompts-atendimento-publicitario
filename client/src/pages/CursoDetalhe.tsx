import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRoute, useLocation } from 'wouter';
import { Clock, BookOpen, Users, ArrowLeft, Play, CheckCircle, Lock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const cursosData: Record<string, {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  level: string;
  duration: string;
  modules: number;
  students: number;
  category: string;
  slug: string;
  objectives: string[];
  modulesList: { title: string; duration: string; free: boolean }[];
}> = {
  'fundamentos-atendimento': {
    id: 1,
    title: 'Fundamentos do Atendimento Publicitário',
    description: 'Do básico ao estratégico: entenda o papel, as responsabilidades e como se destacar como profissional de atendimento.',
    longDescription: 'Este curso é o ponto de partida para quem deseja construir uma carreira sólida em atendimento publicitário. Você vai entender a evolução do papel, as competências essenciais, e como se posicionar como parceiro estratégico do cliente e da agência.',
    level: 'Iniciante',
    duration: '4h de conteúdo',
    modules: 6,
    students: 200,
    category: 'Fundamentos',
    slug: 'fundamentos-atendimento',
    objectives: [
      'Compreender o papel do atendimento publicitário na agência moderna',
      'Identificar as competências essenciais para o profissional de atendimento',
      'Desenvolver habilidades de gestão de relacionamento com clientes',
      'Construir processos eficientes de comunicação interna e externa',
      'Posicionar-se como parceiro estratégico do negócio do cliente',
    ],
    modulesList: [
      { title: 'Introdução ao Atendimento Publicitário', duration: '35min', free: true },
      { title: 'O Papel Estratégico do Atendimento', duration: '45min', free: true },
      { title: 'Competências Essenciais', duration: '40min', free: false },
      { title: 'Gestão de Relacionamento com Clientes', duration: '50min', free: false },
      { title: 'Processos e Fluxos de Trabalho', duration: '45min', free: false },
      { title: 'Posicionamento Estratégico', duration: '40min', free: false },
    ],
  },
  'comunicacao-assertiva': {
    id: 2,
    title: 'Comunicação Assertiva e Gestão de Relacionamento',
    description: 'Domine técnicas de escuta ativa, gestão de expectativas e resolução de conflitos com clientes.',
    longDescription: 'A comunicação é a ferramenta mais poderosa do profissional de atendimento. Neste curso, você vai dominar técnicas avançadas de escuta ativa, aprender a gerenciar expectativas de forma proativa e desenvolver habilidades para resolver conflitos com elegância.',
    level: 'Intermediário',
    duration: '3h de conteúdo',
    modules: 5,
    students: 150,
    category: 'Comunicação',
    slug: 'comunicacao-assertiva',
    objectives: [
      'Dominar técnicas de escuta ativa e comunicação empática',
      'Gerenciar expectativas de clientes de forma proativa',
      'Resolver conflitos com elegância e assertividade',
      'Conduzir reuniões produtivas e apresentações impactantes',
      'Construir relacionamentos de longo prazo baseados em confiança',
    ],
    modulesList: [
      { title: 'Fundamentos da Comunicação Assertiva', duration: '35min', free: true },
      { title: 'Escuta Ativa e Empatia', duration: '40min', free: false },
      { title: 'Gestão de Expectativas', duration: '35min', free: false },
      { title: 'Resolução de Conflitos', duration: '40min', free: false },
      { title: 'Reuniões e Apresentações', duration: '30min', free: false },
    ],
  },
  'personal-branding': {
    id: 3,
    title: 'Personal Branding para Atendimento',
    description: 'Construa sua marca pessoal: currículo estratégico, portfólio de impacto e posicionamento no LinkedIn.',
    longDescription: 'Sua carreira é sua marca. Neste curso, você vai aprender a construir um posicionamento profissional forte, criar um portfólio que demonstre seu valor, e usar o LinkedIn como ferramenta estratégica de visibilidade e networking.',
    level: 'Intermediário',
    duration: '3.5h de conteúdo',
    modules: 4,
    students: 120,
    category: 'Carreira',
    slug: 'personal-branding',
    objectives: [
      'Definir seu posicionamento profissional único',
      'Criar um currículo estratégico que destaque resultados',
      'Montar um portfólio de impacto para atendimento',
      'Otimizar seu perfil no LinkedIn para atrair oportunidades',
    ],
    modulesList: [
      { title: 'Identidade Profissional', duration: '50min', free: true },
      { title: 'Currículo Estratégico', duration: '45min', free: false },
      { title: 'Portfólio de Impacto', duration: '55min', free: false },
      { title: 'LinkedIn como Ferramenta Estratégica', duration: '40min', free: false },
    ],
  },
  'gestao-projetos': {
    id: 4,
    title: 'Gestão de Projetos e Processos',
    description: 'Organize fluxos de trabalho, gerencie cronogramas e domine ferramentas essenciais para a eficiência.',
    longDescription: 'Eficiência operacional é o que diferencia um bom atendimento de um atendimento excelente. Aprenda a organizar fluxos de trabalho, gerenciar cronogramas complexos e dominar as ferramentas que vão elevar sua produtividade.',
    level: 'Intermediário',
    duration: '2.5h de conteúdo',
    modules: 4,
    students: 90,
    category: 'Processos',
    slug: 'gestao-projetos',
    objectives: [
      'Organizar fluxos de trabalho eficientes',
      'Gerenciar cronogramas e prazos complexos',
      'Dominar ferramentas de gestão de projetos',
      'Implementar processos de melhoria contínua',
    ],
    modulesList: [
      { title: 'Fundamentos de Gestão de Projetos', duration: '35min', free: true },
      { title: 'Fluxos de Trabalho e Processos', duration: '40min', free: false },
      { title: 'Ferramentas e Tecnologia', duration: '35min', free: false },
      { title: 'Melhoria Contínua', duration: '30min', free: false },
    ],
  },
};

function getLevelColor(level: string) {
  switch (level) {
    case 'Iniciante': return 'bg-green-100 text-green-800';
    case 'Intermediário': return 'bg-amber-100 text-amber-800';
    case 'Avançado': return 'bg-red-100 text-red-800';
    default: return 'bg-stone-100 text-stone-800';
  }
}

export default function CursoDetalhe() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute('/cursos/:slug');

  if (!match || !params?.slug) {
    setLocation('/cursos');
    return null;
  }

  const curso = cursosData[params.slug];

  if (!curso) {
    return (
      <div className="min-h-screen bg-stone-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-stone-800 mb-4">Curso não encontrado</h1>
          <p className="text-stone-600 mb-8">O curso que você procura não está disponível.</p>
          <Button onClick={() => setLocation('/cursos')} className="bg-amber-600 hover:bg-amber-700">
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para Cursos
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <button
            onClick={() => setLocation('/cursos')}
            className="flex items-center text-amber-300 hover:text-amber-200 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para Cursos
          </button>
          <Badge className={`${getLevelColor(curso.level)} mb-4`}>{curso.level}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{curso.title}</h1>
          <p className="text-lg text-stone-300 max-w-3xl mb-6">{curso.longDescription}</p>
          <div className="flex flex-wrap gap-6 text-stone-300">
            <span className="flex items-center gap-2"><Clock className="w-5 h-5" /> {curso.duration}</span>
            <span className="flex items-center gap-2"><BookOpen className="w-5 h-5" /> {curso.modules} módulos</span>
            <span className="flex items-center gap-2"><Users className="w-5 h-5" /> {curso.students} alunos</span>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="md:col-span-2 space-y-8">
          {/* Objectives */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-stone-800 mb-4">O que você vai aprender</h2>
            <ul className="space-y-3">
              {curso.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span className="text-stone-700">{obj}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Modules */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-stone-800 mb-4">Conteúdo do Curso</h2>
            <div className="space-y-3">
              {curso.modulesList.map((mod, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-stone-50 border border-stone-200">
                  <div className="flex items-center gap-3">
                    {mod.free ? (
                      <Play className="w-5 h-5 text-amber-600" />
                    ) : (
                      <Lock className="w-5 h-5 text-stone-400" />
                    )}
                    <span className="text-stone-800 font-medium">{mod.title}</span>
                    {mod.free && <Badge className="bg-green-100 text-green-700 text-xs">Gratuito</Badge>}
                  </div>
                  <span className="text-sm text-stone-500">{mod.duration}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="p-6 sticky top-24">
            <div className="text-center mb-6">
              <p className="text-sm text-stone-500 mb-1">Investimento</p>
              <p className="text-3xl font-bold text-stone-800">R$ 297</p>
              <p className="text-sm text-stone-500">ou 12x de R$ 29,70</p>
            </div>
            <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white mb-3">
              Matricular-se Agora
            </Button>
            <Button variant="outline" className="w-full border-amber-600 text-amber-700 hover:bg-amber-50">
              Assistir Aula Gratuita
            </Button>
            <div className="mt-6 pt-6 border-t border-stone-200 space-y-3 text-sm text-stone-600">
              <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-amber-600" /> Acesso vitalício</p>
              <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-amber-600" /> Certificado de conclusão</p>
              <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-amber-600" /> Materiais complementares</p>
              <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-amber-600" /> Suporte por e-mail</p>
              <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-amber-600" /> 7 dias de garantia</p>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
