import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Play, Lock, Clock } from 'lucide-react';
import { useAuth } from '@/_core/hooks/useAuth';
import { getLoginUrl } from '@/const';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const videoCategories = {
  gratuitos: [
    { title: 'O Novo Atendimento Publicitário', duration: '12:34', description: 'Entenda a evolução do papel e como se posicionar.' },
    { title: 'Comunicação Assertiva na Prática', duration: '15:20', description: 'Técnicas para conduzir reuniões com confiança.' },
    { title: 'Como Montar seu Portfólio', duration: '18:45', description: 'Tangibilize seus resultados e conquistas.' },
    { title: 'Introdução ao Briefing Estratégico', duration: '10:15', description: 'O que todo briefing precisa ter para funcionar.' },
  ],
  exclusivos: [
    { title: 'Gestão de Contas Complexas', duration: '25:00', description: 'Estratégias para clientes com múltiplas demandas.' },
    { title: 'Negociação com Clientes Difíceis', duration: '20:30', description: 'Técnicas avançadas de negociação e persuasão.' },
    { title: 'Métricas que Importam', duration: '22:15', description: 'Como apresentar resultados de forma estratégica.' },
  ],
  workshops: [
    { title: 'Workshop: Currículo Estratégico', duration: '45:00', description: 'Construa um currículo que vende resultados.' },
    { title: 'Workshop: LinkedIn para Atendimento', duration: '50:00', description: 'Otimize seu perfil e construa autoridade.' },
  ],
  masterclasses: [
    { title: 'Masterclass: Liderança em Atendimento', duration: '1:20:00', description: 'De executor a líder: a transição estratégica.' },
    { title: 'Masterclass: Visão de Negócio', duration: '1:15:00', description: 'Como pensar como dono e agregar valor real.' },
  ],
};

export default function Videos() {
  const { user } = useAuth();

  const renderVideoCard = (video: { title: string; duration: string; description: string }, isLocked: boolean) => (
    <Card className="overflow-hidden border-stone-200 hover:shadow-md transition-shadow">
      <div className="relative aspect-video bg-stone-200 flex items-center justify-center group cursor-pointer">
        {isLocked ? (
          <div className="absolute inset-0 bg-stone-800/60 flex flex-col items-center justify-center">
            <Lock className="w-8 h-8 text-white mb-2" />
            <span className="text-white text-sm font-medium">Conteúdo Exclusivo</span>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-stone-800/20 group-hover:bg-stone-800/40 transition-colors">
            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 text-amber-700 ml-1" />
            </div>
          </div>
        )}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
          <Clock className="w-3 h-3" /> {video.duration}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-stone-900 mb-1 text-sm">{video.title}</h3>
        <p className="text-xs text-stone-600">{video.description}</p>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      {/* Header */}
      <section className="bg-white border-b border-stone-200 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="max-w-3xl">
              <p className="text-amber-700 font-medium mb-2 text-sm uppercase tracking-wide">Vídeos</p>
              <h1 className="text-4xl font-bold text-stone-900 mb-4">
                Biblioteca Audiovisual
              </h1>
              <p className="text-lg text-stone-600">
                Vídeos gratuitos e exclusivos, workshops e masterclasses para seu desenvolvimento profissional.
              </p>
            </div>
            {!user && (
              <Button
                onClick={() => { window.location.href = getLoginUrl(); }}
                className="bg-amber-700 hover:bg-amber-800 text-white"
              >
                Entrar para acessar conteúdos exclusivos
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Videos */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs defaultValue="gratuitos" className="w-full">
            <TabsList className="mb-8 bg-white border border-stone-200">
              <TabsTrigger value="gratuitos">Gratuitos</TabsTrigger>
              <TabsTrigger value="exclusivos">
                Exclusivos {!user && <Lock className="w-3 h-3 ml-1" />}
              </TabsTrigger>
              <TabsTrigger value="workshops">
                Workshops {!user && <Lock className="w-3 h-3 ml-1" />}
              </TabsTrigger>
              <TabsTrigger value="masterclasses">
                Masterclasses {!user && <Lock className="w-3 h-3 ml-1" />}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="gratuitos">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {videoCategories.gratuitos.map((video, idx) => (
                  <div key={idx}>{renderVideoCard(video, false)}</div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="exclusivos">
              {!user ? (
                <div className="text-center py-16">
                  <Lock className="w-12 h-12 text-stone-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-stone-900 mb-2">Conteúdo Exclusivo para Membros</h3>
                  <p className="text-stone-600 mb-6">Faça login ou cadastre-se para acessar os vídeos exclusivos.</p>
                  <Button onClick={() => { window.location.href = getLoginUrl(); }} className="bg-amber-700 hover:bg-amber-800 text-white">
                    Entrar / Cadastrar
                  </Button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videoCategories.exclusivos.map((video, idx) => (
                    <div key={idx}>{renderVideoCard(video, false)}</div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="workshops">
              {!user ? (
                <div className="text-center py-16">
                  <Lock className="w-12 h-12 text-stone-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-stone-900 mb-2">Workshops Exclusivos</h3>
                  <p className="text-stone-600 mb-6">Faça login para acessar os workshops gravados.</p>
                  <Button onClick={() => { window.location.href = getLoginUrl(); }} className="bg-amber-700 hover:bg-amber-800 text-white">
                    Entrar / Cadastrar
                  </Button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {videoCategories.workshops.map((video, idx) => (
                    <div key={idx}>{renderVideoCard(video, false)}</div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="masterclasses">
              {!user ? (
                <div className="text-center py-16">
                  <Lock className="w-12 h-12 text-stone-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-stone-900 mb-2">Masterclasses Premium</h3>
                  <p className="text-stone-600 mb-6">Faça login para acessar as masterclasses.</p>
                  <Button onClick={() => { window.location.href = getLoginUrl(); }} className="bg-amber-700 hover:bg-amber-800 text-white">
                    Entrar / Cadastrar
                  </Button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {videoCategories.masterclasses.map((video, idx) => (
                    <div key={idx}>{renderVideoCard(video, false)}</div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}
