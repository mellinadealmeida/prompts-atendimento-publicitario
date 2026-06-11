import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { ArrowRight, Target, Heart, Lightbulb, Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Sobre() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      {/* Header */}
      <section className="bg-white border-b border-stone-200 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-amber-700 font-medium mb-2 text-sm uppercase tracking-wide">Sobre</p>
              <h1 className="text-4xl font-bold text-stone-900 mb-6">
                Mellina D'Anello
              </h1>
              <p className="text-lg text-stone-600 mb-4 leading-relaxed">
                Com uma década de atuação em agências de eventos e publicidade, possuo vasta experiência em comunicação digital, atendimento publicitário e gestão de estratégias de conteúdo.
              </p>
              <p className="text-stone-600 leading-relaxed">
                Minha paixão pela comunicação, combinada com uma notável habilidade em gerenciar equipes, assegura entregas de alta qualidade e resultados assertivos em todos os projetos que lidero.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-72 h-72 rounded-full bg-gradient-to-br from-amber-100 to-stone-200 flex items-center justify-center overflow-hidden">
                <div className="text-center p-8">
                  <div className="text-6xl font-bold text-amber-700 mb-2">MD</div>
                  <p className="text-stone-600 text-sm">Mellina D'Anello</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trajetória */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-stone-900 mb-12 text-center">Trajetória</h2>
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-16 text-right">
                <span className="text-sm font-bold text-amber-700">2016</span>
              </div>
              <div className="border-l-2 border-amber-200 pl-6 pb-8">
                <h3 className="font-semibold text-stone-900 mb-1">Início na área de Atendimento</h3>
                <p className="text-stone-600 text-sm">Primeiros passos em agências de eventos e publicidade, aprendendo na prática o dia a dia do atendimento.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-16 text-right">
                <span className="text-sm font-bold text-amber-700">2019</span>
              </div>
              <div className="border-l-2 border-amber-200 pl-6 pb-8">
                <h3 className="font-semibold text-stone-900 mb-1">Gestão de Equipes</h3>
                <p className="text-stone-600 text-sm">Assumiu a liderança de equipes de atendimento, desenvolvendo processos e metodologias próprias.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-16 text-right">
                <span className="text-sm font-bold text-amber-700">2022</span>
              </div>
              <div className="border-l-2 border-amber-200 pl-6 pb-8">
                <h3 className="font-semibold text-stone-900 mb-1">Comunicação Digital e Estratégia</h3>
                <p className="text-stone-600 text-sm">Especialização em comunicação digital e gestão de estratégias de conteúdo para grandes marcas.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-16 text-right">
                <span className="text-sm font-bold text-amber-700">2025</span>
              </div>
              <div className="border-l-2 border-amber-200 pl-6 pb-8">
                <h3 className="font-semibold text-stone-900 mb-1">Mentoria e Educação</h3>
                <p className="text-stone-600 text-sm">Lançamento da plataforma de mentoria para profissionais de atendimento publicitário, impactando mais de 200 profissionais.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metodologia e Missão */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 border-stone-200 text-center">
              <Target className="w-10 h-10 text-amber-700 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-stone-900 mb-3">Metodologia</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Baseada em 4 pilares de competência: Visão Estratégica, Gestão de Relacionamento, Execução e Processos, e Personal Branding. Uma abordagem prática e mensurável.
              </p>
            </Card>
            <Card className="p-8 border-stone-200 text-center">
              <Heart className="w-10 h-10 text-amber-700 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-stone-900 mb-3">Missão</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Transformar a percepção e a prática do atendimento publicitário no Brasil, elevando profissionais de executores a parceiros estratégicos.
              </p>
            </Card>
            <Card className="p-8 border-stone-200 text-center">
              <Lightbulb className="w-10 h-10 text-amber-700 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-stone-900 mb-3">Visão</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Ser a principal referência em desenvolvimento profissional para atendimento publicitário na América Latina.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section className="py-20" id="contato">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Mail className="w-12 h-12 text-amber-700 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-stone-900 mb-4">Entre em Contato</h2>
          <p className="text-stone-600 mb-8">
            Quer saber mais sobre os cursos, mentoria ou serviços para agências? Entre em contato!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="mailto:contato@mellinadanello.com.br">
              <Button className="bg-amber-700 hover:bg-amber-800 text-white px-8">
                Enviar E-mail <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <a href="https://www.instagram.com/mellinadanello" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="px-8">
                Instagram
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/mellinadanello" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="px-8">
                LinkedIn
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
