import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLocation } from 'wouter';
import { ArrowRight, Play, BookOpen, Users, Target, TrendingUp, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const featuredVideos = [
  {
    title: 'O Novo Atendimento Publicitário',
    description: 'Entenda a evolução do papel e como se posicionar como parceiro estratégico.',
    thumbnail: 'https://img.youtube.com/vi/placeholder1/maxresdefault.jpg',
    duration: '12:34',
  },
  {
    title: 'Comunicação Assertiva na Prática',
    description: 'Técnicas para conduzir reuniões e gerenciar expectativas com confiança.',
    thumbnail: 'https://img.youtube.com/vi/placeholder2/maxresdefault.jpg',
    duration: '15:20',
  },
  {
    title: 'Como Montar seu Portfólio de Atendimento',
    description: 'Tangibilize o invisível: mostre seus cases, KPIs e o valor que você gerou.',
    thumbnail: 'https://img.youtube.com/vi/placeholder3/maxresdefault.jpg',
    duration: '18:45',
  },
];

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE4YzEuNjU3IDAgMy0xLjM0MyAzLTNzLTEuMzQzLTMtMy0zLTMgMS4zNDMtMyAzIDEuMzQzIDMgMyAzem0wIDM2YzEuNjU3IDAgMy0xLjM0MyAzLTNzLTEuMzQzLTMtMy0zLTMgMS4zNDMtMyAzIDEuMzQzIDMgMyAzem0tMTgtMThjMS42NTcgMCAzLTEuMzQzIDMtM3MtMS4zNDMtMy0zLTMtMyAxLjM0My0zIDMgMS4zNDMgMyAzIDN6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 py-24 md:py-32 relative">
          <div className="max-w-3xl">
            <p className="text-amber-400 font-medium mb-4 tracking-wide uppercase text-sm">Mellina D'Anello</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Transforme sua Carreira em{' '}
              <span className="text-amber-400">Atendimento Publicitário</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-300 mb-8 leading-relaxed max-w-2xl">
              Cursos, mentoria e conteúdos exclusivos para profissionais que buscam evoluir de forma estratégica na área de atendimento publicitário.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => setLocation('/cursos')}
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 text-white px-8"
              >
                Explorar Cursos <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                onClick={() => setLocation('/assessment')}
                size="lg"
                variant="outline"
                className="border-stone-400 text-white hover:bg-white/10 px-8"
              >
                Fazer Autoavaliação Gratuita
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-amber-700 mb-1">200+</div>
              <p className="text-stone-600 text-sm">Profissionais impactados</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-amber-700 mb-1">10+</div>
              <p className="text-stone-600 text-sm">Anos de experiência</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-amber-700 mb-1">6</div>
              <p className="text-stone-600 text-sm">Módulos de conteúdo</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-amber-700 mb-1">4</div>
              <p className="text-stone-600 text-sm">Pilares de competência</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Videos */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-stone-900 mb-2">Vídeos em Destaque</h2>
              <p className="text-stone-600">Conteúdos gratuitos para você começar sua transformação</p>
            </div>
            <Button variant="outline" onClick={() => setLocation('/videos')} className="hidden md:flex">
              Ver todos <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredVideos.map((video, idx) => (
              <Card key={idx} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow group cursor-pointer">
                <div className="relative aspect-video bg-stone-200">
                  <div className="absolute inset-0 flex items-center justify-center bg-stone-800/20 group-hover:bg-stone-800/40 transition-colors">
                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-amber-700 ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-stone-900 mb-2">{video.title}</h3>
                  <p className="text-sm text-stone-600 line-clamp-2">{video.description}</p>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" onClick={() => setLocation('/videos')}>
              Ver todos os vídeos <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-3">O que você encontra aqui</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Uma plataforma completa para o desenvolvimento profissional em atendimento publicitário
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card
              className="p-6 border-stone-200 hover:border-amber-300 hover:shadow-md transition-all cursor-pointer"
              onClick={() => setLocation('/cursos')}
            >
              <BookOpen className="w-10 h-10 text-amber-700 mb-4" />
              <h3 className="font-semibold text-lg text-stone-900 mb-2">Cursos</h3>
              <p className="text-stone-600 text-sm">Formações completas com vídeo-aulas, materiais de apoio e certificado.</p>
            </Card>
            <Card
              className="p-6 border-stone-200 hover:border-amber-300 hover:shadow-md transition-all cursor-pointer"
              onClick={() => setLocation('/mentoria')}
            >
              <Target className="w-10 h-10 text-amber-700 mb-4" />
              <h3 className="font-semibold text-lg text-stone-900 mb-2">Mentoria Guiada</h3>
              <p className="text-stone-600 text-sm">Programa de autodesenvolvimento com diagnóstico, jornada e acompanhamento.</p>
            </Card>
            <Card
              className="p-6 border-stone-200 hover:border-amber-300 hover:shadow-md transition-all cursor-pointer"
              onClick={() => setLocation('/biblioteca')}
            >
              <Sparkles className="w-10 h-10 text-amber-700 mb-4" />
              <h3 className="font-semibold text-lg text-stone-900 mb-2">Biblioteca Gratuita</h3>
              <p className="text-stone-600 text-sm">Artigos, materiais para download, ferramentas e vídeos gratuitos.</p>
            </Card>
            <Card
              className="p-6 border-stone-200 hover:border-amber-300 hover:shadow-md transition-all cursor-pointer"
              onClick={() => setLocation('/agencias')}
            >
              <Users className="w-10 h-10 text-amber-700 mb-4" />
              <h3 className="font-semibold text-lg text-stone-900 mb-2">Para Agências</h3>
              <p className="text-stone-600 text-sm">Treinamentos, workshops, palestras e consultorias para equipes.</p>
            </Card>
            <Card
              className="p-6 border-stone-200 hover:border-amber-300 hover:shadow-md transition-all cursor-pointer"
              onClick={() => setLocation('/cases')}
            >
              <TrendingUp className="w-10 h-10 text-amber-700 mb-4" />
              <h3 className="font-semibold text-lg text-stone-900 mb-2">Cases & Entrevistas</h3>
              <p className="text-stone-600 text-sm">Histórias reais, entrevistas e conversas com profissionais do mercado.</p>
            </Card>
            <Card
              className="p-6 border-stone-200 hover:border-amber-300 hover:shadow-md transition-all cursor-pointer"
              onClick={() => setLocation('/assessment')}
            >
              <Target className="w-10 h-10 text-amber-700 mb-4" />
              <h3 className="font-semibold text-lg text-stone-900 mb-2">Autoavaliação</h3>
              <p className="text-stone-600 text-sm">Diagnóstico gratuito de competências com recomendações personalizadas.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-700 to-amber-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para transformar sua carreira?
          </h2>
          <p className="text-lg text-amber-100 mb-8 max-w-2xl mx-auto">
            Comece com o diagnóstico gratuito de competências e descubra seus pontos fortes e áreas de desenvolvimento.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              onClick={() => setLocation('/assessment')}
              size="lg"
              className="bg-white text-amber-800 hover:bg-stone-100 px-8"
            >
              Iniciar Autoavaliação Gratuita <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              onClick={() => setLocation('/cursos')}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8"
            >
              Ver Cursos
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
