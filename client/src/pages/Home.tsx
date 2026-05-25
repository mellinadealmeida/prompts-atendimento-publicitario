import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLocation } from 'wouter';
import { ArrowRight, CheckCircle2, Zap, Target, Users, TrendingUp, BookOpen } from 'lucide-react';

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-lg text-gray-900">Mentoria Estratégica</span>
          </div>
          <Button
            onClick={() => setLocation('/assessment')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            Começar Autoavaliação
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Transforme sua Carreira em
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Atendimento Publicitário
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Uma mentoria completa para profissionais que buscam evoluir de forma estratégica, seja para crescer onde está, encarar uma transição ou buscar uma recolocação.
          </p>
          <Button
            onClick={() => setLocation('/assessment')}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8"
          >
            Iniciar Diagnóstico <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <Card className="p-6 text-center border-0 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl font-bold text-blue-600 mb-2">200+</div>
            <p className="text-gray-600">Profissionais inscritos</p>
          </Card>
          <Card className="p-6 text-center border-0 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl font-bold text-indigo-600 mb-2">6</div>
            <p className="text-gray-600">Módulos de vídeo</p>
          </Card>
          <Card className="p-6 text-center border-0 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl font-bold text-purple-600 mb-2">4</div>
            <p className="text-gray-600">Pilares de competência</p>
          </Card>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white py-20 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Por que esta mentoria?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Você recebeu mais de 200 inscrições porque os profissionais de atendimento publicitário precisam de orientação estratégica. Esta plataforma foi criada para atender a essa demanda de forma escalável e inteligente.
              </p>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Roteiros de vídeo didáticos sobre comunicação, currículo, portfólio e LinkedIn</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Autoavaliação interativa com diagnóstico de competências</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Material de apoio em PDF com checklists e templates</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Recomendações personalizadas de desenvolvimento</span>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-0">
                <Target className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Visão Estratégica</h3>
                <p className="text-sm text-gray-600">Entenda negócio e proponha soluções</p>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 border-0">
                <Users className="w-8 h-8 text-indigo-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Relacionamento</h3>
                <p className="text-sm text-gray-600">Escuta ativa e gestão de crises</p>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-0">
                <TrendingUp className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Execução</h3>
                <p className="text-sm text-gray-600">Processos e organização</p>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-pink-50 to-pink-100 border-0">
                <BookOpen className="w-8 h-8 text-pink-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Personal Branding</h3>
                <p className="text-sm text-gray-600">Currículo, portfólio e LinkedIn</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Módulos de Vídeo
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: 'Introdução: O Novo Atendimento',
              description: 'Do "anotador de pedidos" ao parceiro estratégico. Entenda a evolução do papel e seu impacto.',
              icon: '🎯',
            },
            {
              title: 'Comunicação Assertiva e Escuta Ativa',
              description: 'Domine as habilidades essenciais para conduzir reuniões, gerenciar expectativas e crises.',
              icon: '💬',
            },
            {
              title: 'Currículo Estratégico',
              description: 'Transforme sua lista de tarefas em um documento que vende resultados e impacto.',
              icon: '📄',
            },
            {
              title: 'Portfólio de Atendimento',
              description: 'Tangibilize o invisível: mostre seus cases, KPIs e o valor que você gerou.',
              icon: '🎨',
            },
            {
              title: 'Posicionamento no LinkedIn',
              description: 'Otimize seu perfil, construa networking estratégico e produza conteúdo de autoridade.',
              icon: '🔗',
            },
            {
              title: 'Carreira e Transição',
              description: 'Enxergue caminhos de evolução: crescimento interno, transição ou recolocação estratégica.',
              icon: '🚀',
            },
          ].map((module, idx) => (
            <Card key={idx} className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">{module.icon}</div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{module.title}</h3>
              <p className="text-gray-600">{module.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para transformar sua carreira?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Comece com o diagnóstico de competências e receba recomendações personalizadas
          </p>
          <Button
            onClick={() => setLocation('/assessment')}
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8"
          >
            Iniciar Autoavaliação <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-white">Mentoria Estratégica</span>
              </div>
              <p className="text-sm">Transformando carreiras em atendimento publicitário</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Conteúdo</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Vídeos</a></li>
                <li><a href="#" className="hover:text-white transition">Autoavaliação</a></li>
                <li><a href="#" className="hover:text-white transition">Material de Apoio</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Recursos</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition">Termos</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 Mentoria Estratégica. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
