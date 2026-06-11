import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLocation } from 'wouter';
import { Clock, BookOpen, Users, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const cursos = [
  {
    id: 1,
    title: 'Fundamentos do Atendimento Publicitário',
    description: 'Do básico ao estratégico: entenda o papel, as responsabilidades e como se destacar como profissional de atendimento.',
    level: 'Iniciante',
    duration: '4h de conteúdo',
    modules: 6,
    students: 200,
    category: 'Fundamentos',
    slug: 'fundamentos-atendimento',
  },
  {
    id: 2,
    title: 'Comunicação Assertiva e Gestão de Relacionamento',
    description: 'Domine técnicas de escuta ativa, gestão de expectativas e resolução de conflitos com clientes.',
    level: 'Intermediário',
    duration: '3h de conteúdo',
    modules: 5,
    students: 150,
    category: 'Comunicação',
    slug: 'comunicacao-assertiva',
  },
  {
    id: 3,
    title: 'Personal Branding para Atendimento',
    description: 'Construa sua marca pessoal: currículo estratégico, portfólio de impacto e posicionamento no LinkedIn.',
    level: 'Intermediário',
    duration: '3.5h de conteúdo',
    modules: 4,
    students: 120,
    category: 'Carreira',
    slug: 'personal-branding',
  },
  {
    id: 4,
    title: 'Gestão de Projetos e Processos',
    description: 'Organize fluxos de trabalho, gerencie cronogramas e domine ferramentas essenciais para a eficiência.',
    level: 'Intermediário',
    duration: '2.5h de conteúdo',
    modules: 4,
    students: 90,
    category: 'Processos',
    slug: 'gestao-projetos',
  },
];

function getLevelColor(level: string) {
  switch (level) {
    case 'Iniciante': return 'bg-green-100 text-green-800';
    case 'Intermediário': return 'bg-amber-100 text-amber-800';
    case 'Avançado': return 'bg-red-100 text-red-800';
    default: return 'bg-stone-100 text-stone-800';
  }
}

export default function Cursos() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      {/* Header */}
      <section className="bg-white border-b border-stone-200 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-amber-700 font-medium mb-2 text-sm uppercase tracking-wide">Cursos</p>
            <h1 className="text-4xl font-bold text-stone-900 mb-4">
              Formações para sua Evolução Profissional
            </h1>
            <p className="text-lg text-stone-600">
              Cursos completos com vídeo-aulas, materiais de apoio e acompanhamento de progresso. Aprenda no seu ritmo.
            </p>
          </div>
        </div>
      </section>

      {/* Course Catalog */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {cursos.map((curso) => (
              <Card key={curso.id} className="overflow-hidden border-stone-200 hover:shadow-lg transition-shadow">
                <div className="aspect-[16/7] bg-gradient-to-br from-stone-800 to-amber-900 flex items-center justify-center p-6">
                  <h3 className="text-white text-xl font-bold text-center">{curso.title}</h3>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={getLevelColor(curso.level)}>{curso.level}</Badge>
                    <Badge variant="outline">{curso.category}</Badge>
                  </div>
                  <p className="text-stone-600 mb-4">{curso.description}</p>
                  <div className="flex items-center gap-4 text-sm text-stone-500 mb-6">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {curso.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" /> {curso.modules} módulos
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" /> {curso.students} alunos
                    </span>
                  </div>
                  <Button
                    onClick={() => setLocation(`/cursos/${curso.slug}`)}
                    className="w-full bg-amber-700 hover:bg-amber-800 text-white"
                  >
                    Ver Detalhes <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-stone-900 mb-4">Não sabe por onde começar?</h2>
          <p className="text-stone-600 mb-6">
            Faça nossa autoavaliação gratuita e descubra quais competências você precisa desenvolver primeiro.
          </p>
          <Button onClick={() => setLocation('/assessment')} variant="outline" size="lg">
            Fazer Autoavaliação Gratuita <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
