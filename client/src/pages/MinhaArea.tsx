import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/_core/hooks/useAuth';
import { getLoginUrl } from '@/const';
import { useLocation } from 'wouter';
import { BookOpen, Play, FileText, TrendingUp, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Placeholder data - will be replaced with real data from API
const meusCursos = [
  {
    title: 'Fundamentos do Atendimento Publicitário',
    progress: 65,
    totalModules: 6,
    completedModules: 4,
    lastAccessed: '2 dias atrás',
  },
  {
    title: 'Comunicação Assertiva e Gestão de Relacionamento',
    progress: 30,
    totalModules: 5,
    completedModules: 2,
    lastAccessed: '1 semana atrás',
  },
];

const meusVideos = [
  { title: 'Gestão de Contas Complexas', duration: '25:00', watched: true },
  { title: 'Negociação com Clientes Difíceis', duration: '20:30', watched: true },
  { title: 'Métricas que Importam', duration: '22:15', watched: false },
  { title: 'Workshop: Currículo Estratégico', duration: '45:00', watched: false },
];

const materiaisSalvos = [
  { title: 'E-book: Atendimento Publicitário', type: 'PDF' },
  { title: 'Template de Briefing Estratégico', type: 'DOCX' },
  { title: 'Checklist de Onboarding', type: 'PDF' },
];

export default function MinhaArea() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <div className="animate-pulse text-stone-500">Carregando...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-stone-50">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <Card className="p-8 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-stone-900 mb-4">Acesse sua Área</h2>
            <p className="text-stone-600 mb-6">
              Faça login para acessar seus cursos, vídeos e materiais salvos.
            </p>
            <Button
              onClick={() => { window.location.href = getLoginUrl(); }}
              className="w-full bg-amber-700 hover:bg-amber-800 text-white"
              size="lg"
            >
              Entrar / Cadastrar
            </Button>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const overallProgress = meusCursos.length > 0
    ? Math.round(meusCursos.reduce((sum, c) => sum + c.progress, 0) / meusCursos.length)
    : 0;

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      {/* Header */}
      <section className="bg-white border-b border-stone-200 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-stone-900">
                Olá, {user.name || 'Aluno'}!
              </h1>
              <p className="text-stone-600">Acompanhe seu progresso e continue aprendendo.</p>
            </div>
            <div className="flex items-center gap-4">
              <Card className="px-4 py-2 flex items-center gap-2 border-stone-200">
                <TrendingUp className="w-5 h-5 text-amber-700" />
                <div>
                  <p className="text-xs text-stone-500">Progresso Geral</p>
                  <p className="font-bold text-stone-900">{overallProgress}%</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs defaultValue="cursos" className="w-full">
            <TabsList className="mb-6 bg-white border border-stone-200">
              <TabsTrigger value="cursos" className="gap-2">
                <BookOpen className="w-4 h-4" /> Meus Cursos
              </TabsTrigger>
              <TabsTrigger value="videos" className="gap-2">
                <Play className="w-4 h-4" /> Vídeos Premium
              </TabsTrigger>
              <TabsTrigger value="materiais" className="gap-2">
                <FileText className="w-4 h-4" /> Materiais Salvos
              </TabsTrigger>
              <TabsTrigger value="progresso" className="gap-2">
                <TrendingUp className="w-4 h-4" /> Evolução
              </TabsTrigger>
            </TabsList>

            <TabsContent value="cursos">
              {meusCursos.length === 0 ? (
                <Card className="p-12 text-center border-stone-200">
                  <BookOpen className="w-12 h-12 text-stone-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-stone-900 mb-2">Nenhum curso ainda</h3>
                  <p className="text-stone-600 mb-6">Explore nosso catálogo e comece sua jornada de aprendizado.</p>
                  <Button onClick={() => setLocation('/cursos')} className="bg-amber-700 hover:bg-amber-800 text-white">
                    Ver Cursos Disponíveis
                  </Button>
                </Card>
              ) : (
                <div className="space-y-4">
                  {meusCursos.map((curso, idx) => (
                    <Card key={idx} className="p-6 border-stone-200 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-stone-900 mb-2">{curso.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-stone-500 mb-3">
                            <span className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" /> {curso.completedModules}/{curso.totalModules} módulos
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" /> {curso.lastAccessed}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Progress value={curso.progress} className="h-2 flex-1" />
                            <span className="text-sm font-medium text-amber-700">{curso.progress}%</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Continuar <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="videos">
              <div className="grid md:grid-cols-2 gap-4">
                {meusVideos.map((video, idx) => (
                  <Card key={idx} className="p-4 border-stone-200 flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      video.watched ? 'bg-green-100' : 'bg-stone-100'
                    }`}>
                      {video.watched ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <Play className="w-5 h-5 text-stone-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-stone-900 text-sm truncate">{video.title}</h4>
                      <p className="text-xs text-stone-500">{video.duration}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-amber-700">
                      {video.watched ? 'Rever' : 'Assistir'}
                    </Button>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="materiais">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {materiaisSalvos.map((material, idx) => (
                  <Card key={idx} className="p-4 border-stone-200 flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-amber-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-stone-900 text-sm truncate">{material.title}</h4>
                      <p className="text-xs text-stone-500">{material.type}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-amber-700">
                      Baixar
                    </Button>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="progresso">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 border-stone-200">
                  <h3 className="font-semibold text-stone-900 mb-4">Progresso por Competência</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-stone-700">Visão Estratégica</span>
                        <span className="font-medium text-amber-700">72%</span>
                      </div>
                      <Progress value={72} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-stone-700">Gestão de Relacionamento</span>
                        <span className="font-medium text-amber-700">58%</span>
                      </div>
                      <Progress value={58} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-stone-700">Execução e Processos</span>
                        <span className="font-medium text-amber-700">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-stone-700">Personal Branding</span>
                        <span className="font-medium text-amber-700">45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                  </div>
                </Card>
                <Card className="p-6 border-stone-200">
                  <h3 className="font-semibold text-stone-900 mb-4">Resumo</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-stone-100">
                      <span className="text-stone-600 text-sm">Cursos em andamento</span>
                      <span className="font-semibold text-stone-900">{meusCursos.length}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-stone-100">
                      <span className="text-stone-600 text-sm">Vídeos assistidos</span>
                      <span className="font-semibold text-stone-900">{meusVideos.filter(v => v.watched).length}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-stone-100">
                      <span className="text-stone-600 text-sm">Materiais salvos</span>
                      <span className="font-semibold text-stone-900">{materiaisSalvos.length}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-stone-600 text-sm">Progresso geral</span>
                      <span className="font-bold text-amber-700">{overallProgress}%</span>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}
