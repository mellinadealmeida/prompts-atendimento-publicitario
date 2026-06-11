import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const cases = [
  {
    title: 'Como estruturei o atendimento de uma agência do zero',
    description: 'Um relato sobre a construção de processos, cultura e resultados em uma agência que não tinha área de atendimento.',
    type: 'case' as const,
    tags: ['Processos', 'Gestão'],
  },
  {
    title: 'Gestão de crise: quando o cliente ameaça sair',
    description: 'Estratégias reais utilizadas para reverter situações críticas e fortalecer o relacionamento.',
    type: 'case' as const,
    tags: ['Relacionamento', 'Crise'],
  },
  {
    title: 'De estagiária a diretora de atendimento em 8 anos',
    description: 'A trajetória, decisões e aprendizados que marcaram essa evolução profissional.',
    type: 'case' as const,
    tags: ['Carreira', 'Liderança'],
  },
];

const entrevistas = [
  {
    title: 'Entrevista com Diretora de Atendimento - Agência Top 10',
    description: 'Insights sobre liderança, gestão de equipes e o futuro do atendimento nas grandes agências.',
    guest: 'Convidada especial',
    hasVideo: true,
  },
  {
    title: 'O que os clientes realmente esperam do atendimento?',
    description: 'Perspectiva do lado do cliente sobre o que faz um atendimento ser excepcional.',
    guest: 'Diretor de Marketing',
    hasVideo: true,
  },
];

const conversas = [
  {
    title: 'Bate-papo: Transição de carreira para atendimento',
    description: 'Profissionais que vieram de outras áreas compartilham como foi a mudança e o que aprenderam.',
    participants: '3 profissionais',
    hasVideo: true,
  },
  {
    title: 'Mesa redonda: O atendimento na era da IA',
    description: 'Como a inteligência artificial está transformando o dia a dia do profissional de atendimento.',
    participants: '4 profissionais',
    hasVideo: true,
  },
];

function getTypeColor(type: string) {
  switch (type) {
    case 'case': return 'bg-blue-100 text-blue-800';
    case 'entrevista': return 'bg-purple-100 text-purple-800';
    case 'conversa': return 'bg-green-100 text-green-800';
    default: return 'bg-stone-100 text-stone-800';
  }
}

export default function Cases() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      {/* Header */}
      <section className="bg-white border-b border-stone-200 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-amber-700 font-medium mb-2 text-sm uppercase tracking-wide">Cases & Entrevistas</p>
            <h1 className="text-4xl font-bold text-stone-900 mb-4">
              Hub de Autoridade
            </h1>
            <p className="text-lg text-stone-600">
              Cases reais, entrevistas com líderes do mercado e conversas que inspiram e ensinam.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs defaultValue="cases" className="w-full">
            <TabsList className="mb-8 bg-white border border-stone-200">
              <TabsTrigger value="cases">Cases</TabsTrigger>
              <TabsTrigger value="entrevistas">Entrevistas</TabsTrigger>
              <TabsTrigger value="conversas">Conversas</TabsTrigger>
            </TabsList>

            <TabsContent value="cases">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cases.map((item, idx) => (
                  <Card key={idx} className="p-6 border-stone-200 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={getTypeColor(item.type)}>Case</Badge>
                      {item.tags.map((tag, tIdx) => (
                        <Badge key={tIdx} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                    <h3 className="font-semibold text-stone-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-stone-600">{item.description}</p>
                    <button className="mt-4 text-amber-700 text-sm font-medium flex items-center gap-1 hover:text-amber-800">
                      Ler mais <ArrowRight className="w-3 h-3" />
                    </button>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="entrevistas">
              <div className="grid md:grid-cols-2 gap-6">
                {entrevistas.map((item, idx) => (
                  <Card key={idx} className="overflow-hidden border-stone-200 hover:shadow-md transition-shadow cursor-pointer">
                    {item.hasVideo && (
                      <div className="aspect-video bg-stone-200 flex items-center justify-center group">
                        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 text-amber-700 ml-1" />
                        </div>
                      </div>
                    )}
                    <div className="p-6">
                      <Badge className="bg-purple-100 text-purple-800 mb-3">Entrevista</Badge>
                      <h3 className="font-semibold text-stone-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-stone-600 mb-2">{item.description}</p>
                      <p className="text-xs text-stone-500">Com: {item.guest}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="conversas">
              <div className="grid md:grid-cols-2 gap-6">
                {conversas.map((item, idx) => (
                  <Card key={idx} className="overflow-hidden border-stone-200 hover:shadow-md transition-shadow cursor-pointer">
                    {item.hasVideo && (
                      <div className="aspect-video bg-stone-200 flex items-center justify-center group">
                        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 text-amber-700 ml-1" />
                        </div>
                      </div>
                    )}
                    <div className="p-6">
                      <Badge className="bg-green-100 text-green-800 mb-3">Conversa</Badge>
                      <h3 className="font-semibold text-stone-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-stone-600 mb-2">{item.description}</p>
                      <p className="text-xs text-stone-500">Participantes: {item.participants}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}
