import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Download, Wrench, Play, FileText } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const articles = [
  {
    title: 'O que faz um profissional de Atendimento Publicitário?',
    excerpt: 'Entenda as principais funções, responsabilidades e o papel estratégico do atendimento nas agências.',
    category: 'Fundamentos',
  },
  {
    title: 'Briefing perfeito: como traduzir a necessidade do cliente',
    excerpt: 'Técnicas para elaborar briefings claros que direcionam a equipe criativa com precisão.',
    category: 'Processos',
  },
  {
    title: 'Gestão de crises no atendimento: guia prático',
    excerpt: 'Como lidar com situações delicadas mantendo o relacionamento e a confiança do cliente.',
    category: 'Relacionamento',
  },
];

const downloadMaterials = [
  {
    title: 'E-book: Atendimento Publicitário - O que você precisa saber',
    description: 'Guia completo para quem está começando na área.',
    type: 'PDF',
  },
  {
    title: 'Template de Briefing Estratégico',
    description: 'Modelo pronto para uso com campos essenciais.',
    type: 'DOCX',
  },
  {
    title: 'Checklist de Onboarding de Cliente',
    description: 'Lista completa para não esquecer nenhum passo.',
    type: 'PDF',
  },
];

const tools = [
  {
    title: 'Autoavaliação de Competências',
    description: 'Diagnóstico interativo para mapear seus pontos fortes e áreas de desenvolvimento.',
    link: '/assessment',
  },
  {
    title: 'Calculadora de Produtividade',
    description: 'Avalie como você distribui seu tempo entre tarefas operacionais e estratégicas.',
    link: '#',
  },
];

export default function Biblioteca() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      {/* Header */}
      <section className="bg-white border-b border-stone-200 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-amber-700 font-medium mb-2 text-sm uppercase tracking-wide">Biblioteca Gratuita</p>
            <h1 className="text-4xl font-bold text-stone-900 mb-4">
              Central de Conteúdos Gratuitos
            </h1>
            <p className="text-lg text-stone-600">
              Artigos, materiais para download, ferramentas e vídeos para impulsionar sua carreira em atendimento publicitário.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs defaultValue="artigos" className="w-full">
            <TabsList className="mb-8 bg-white border border-stone-200">
              <TabsTrigger value="artigos" className="gap-2">
                <FileText className="w-4 h-4" /> Artigos
              </TabsTrigger>
              <TabsTrigger value="materiais" className="gap-2">
                <Download className="w-4 h-4" /> Materiais
              </TabsTrigger>
              <TabsTrigger value="ferramentas" className="gap-2">
                <Wrench className="w-4 h-4" /> Ferramentas
              </TabsTrigger>
              <TabsTrigger value="videos" className="gap-2">
                <Play className="w-4 h-4" /> Vídeos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="artigos">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article, idx) => (
                  <Card key={idx} className="p-6 border-stone-200 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="w-5 h-5 text-amber-700" />
                      <span className="text-xs font-medium text-amber-700 uppercase tracking-wide">{article.category}</span>
                    </div>
                    <h3 className="font-semibold text-stone-900 mb-2">{article.title}</h3>
                    <p className="text-sm text-stone-600">{article.excerpt}</p>
                  </Card>
                ))}
              </div>
              <div className="mt-8 text-center">
                <p className="text-stone-500 text-sm">Mais artigos em breve. Cadastre-se para ser notificado!</p>
              </div>
            </TabsContent>

            <TabsContent value="materiais">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {downloadMaterials.map((material, idx) => (
                  <Card key={idx} className="p-6 border-stone-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-3">
                      <Download className="w-5 h-5 text-amber-700" />
                      <span className="text-xs font-medium bg-amber-100 text-amber-800 px-2 py-0.5 rounded">{material.type}</span>
                    </div>
                    <h3 className="font-semibold text-stone-900 mb-2">{material.title}</h3>
                    <p className="text-sm text-stone-600 mb-4">{material.description}</p>
                    <Button variant="outline" size="sm" className="w-full">
                      <Download className="w-4 h-4 mr-2" /> Baixar
                    </Button>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ferramentas">
              <div className="grid md:grid-cols-2 gap-6">
                {tools.map((tool, idx) => (
                  <Card key={idx} className="p-6 border-stone-200 hover:shadow-md transition-shadow">
                    <Wrench className="w-8 h-8 text-amber-700 mb-3" />
                    <h3 className="font-semibold text-lg text-stone-900 mb-2">{tool.title}</h3>
                    <p className="text-stone-600 mb-4">{tool.description}</p>
                    <Button variant="outline" size="sm">
                      Acessar Ferramenta
                    </Button>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="videos">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="overflow-hidden border-stone-200 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="aspect-video bg-stone-200 flex items-center justify-center">
                    <Play className="w-12 h-12 text-stone-400" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-stone-900 mb-1">Introdução ao Atendimento</h3>
                    <p className="text-sm text-stone-600">Visão geral da profissão e suas possibilidades.</p>
                  </div>
                </Card>
              </div>
              <div className="mt-8 text-center">
                <p className="text-stone-500 text-sm">Mais vídeos gratuitos em breve!</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}
