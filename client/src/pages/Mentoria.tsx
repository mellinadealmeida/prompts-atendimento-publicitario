import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { ArrowRight, CheckCircle2, Target, Compass, TrendingUp, BookOpen, BarChart3 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const steps = [
  {
    number: '01',
    title: 'Diagnóstico Inicial',
    description: 'Autoavaliação completa para mapear suas competências atuais e identificar gaps de desenvolvimento.',
    icon: Target,
  },
  {
    number: '02',
    title: 'Plano Personalizado',
    description: 'Com base no diagnóstico, você recebe um plano de desenvolvimento com prioridades claras.',
    icon: Compass,
  },
  {
    number: '03',
    title: 'Jornada Guiada',
    description: 'Conteúdos, exercícios e desafios práticos organizados em uma trilha progressiva.',
    icon: BookOpen,
  },
  {
    number: '04',
    title: 'Acompanhamento',
    description: 'Monitore sua evolução com indicadores claros e ajuste seu plano conforme avança.',
    icon: BarChart3,
  },
  {
    number: '05',
    title: 'Resultados',
    description: 'Alcance um novo patamar profissional com competências comprovadas e posicionamento estratégico.',
    icon: TrendingUp,
  },
];

const benefits = [
  'Diagnóstico completo de competências',
  'Plano de desenvolvimento personalizado',
  'Conteúdos exclusivos e exercícios práticos',
  'Acompanhamento de progresso em tempo real',
  'Materiais de apoio complementares',
  'Acesso a comunidade de profissionais',
];

export default function Mentoria() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-br from-stone-900 to-amber-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-amber-400 font-medium mb-2 text-sm uppercase tracking-wide">Mentoria Guiada</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Programa de Autodesenvolvimento Profissional
            </h1>
            <p className="text-lg text-stone-300 mb-8">
              Uma jornada estruturada para transformar sua carreira em atendimento publicitário. Do diagnóstico ao resultado, com acompanhamento em cada etapa.
            </p>
            <Button
              onClick={() => setLocation('/assessment')}
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white px-8"
            >
              Começar pelo Diagnóstico <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-stone-900 mb-3">A Metodologia</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Um processo estruturado em 5 etapas para garantir sua evolução consistente e mensurável.
            </p>
          </div>

          <div className="space-y-6">
            {steps.map((step, idx) => (
              <Card key={idx} className="p-6 border-stone-200 hover:border-amber-300 transition-colors">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-amber-700" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Etapa {step.number}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-stone-900 mb-2">{step.title}</h3>
                    <p className="text-stone-600">{step.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-stone-900 mb-6">O que está incluído</h2>
              <div className="space-y-4">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-stone-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <Card className="p-8 bg-gradient-to-br from-amber-50 to-stone-50 border-amber-200">
              <h3 className="text-2xl font-bold text-stone-900 mb-4">Comece Agora</h3>
              <p className="text-stone-600 mb-6">
                O primeiro passo é o diagnóstico gratuito. Descubra onde você está e para onde pode ir.
              </p>
              <Button
                onClick={() => setLocation('/assessment')}
                className="w-full bg-amber-700 hover:bg-amber-800 text-white"
                size="lg"
              >
                Iniciar Diagnóstico Gratuito
              </Button>
              <p className="text-xs text-stone-500 mt-3 text-center">
                Sem compromisso. Leva apenas 5 minutos.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
