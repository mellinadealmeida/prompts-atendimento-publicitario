import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/_core/hooks/useAuth';
import { getLoginUrl } from '@/const';
import { useLocation } from 'wouter';
import {
  Users, BookOpen, Play, FileText, BarChart3, Settings,
  Search, Plus, Edit, Trash2, Eye, Shield, ArrowLeft
} from 'lucide-react';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Placeholder data - will be replaced with real API calls
const usersData = [
  { id: 1, name: 'Maria Silva', email: 'maria@email.com', role: 'user', createdAt: '2025-01-15', courses: 2 },
  { id: 2, name: 'João Santos', email: 'joao@email.com', role: 'user', createdAt: '2025-02-20', courses: 1 },
  { id: 3, name: 'Ana Oliveira', email: 'ana@email.com', role: 'user', createdAt: '2025-03-10', courses: 3 },
  { id: 4, name: 'Pedro Costa', email: 'pedro@email.com', role: 'user', createdAt: '2025-04-05', courses: 0 },
  { id: 5, name: 'Mellina D\'Anello', email: 'mellina@email.com', role: 'admin', createdAt: '2024-12-01', courses: 0 },
];

const coursesData = [
  { id: 1, title: 'Fundamentos do Atendimento Publicitário', students: 200, published: true, modules: 6 },
  { id: 2, title: 'Comunicação Assertiva e Gestão de Relacionamento', students: 150, published: true, modules: 5 },
  { id: 3, title: 'Personal Branding para Atendimento', students: 120, published: true, modules: 4 },
  { id: 4, title: 'Gestão de Projetos e Processos', students: 90, published: false, modules: 4 },
];

const videosData = [
  { id: 1, title: 'O Novo Atendimento Publicitário', category: 'gratuito', views: 1200, published: true },
  { id: 2, title: 'Comunicação Assertiva na Prática', category: 'gratuito', views: 890, published: true },
  { id: 3, title: 'Gestão de Contas Complexas', category: 'exclusivo', views: 340, published: true },
  { id: 4, title: 'Negociação com Clientes Difíceis', category: 'exclusivo', views: 280, published: true },
  { id: 5, title: 'Workshop: Currículo Estratégico', category: 'workshop', views: 450, published: true },
];

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

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
            <Shield className="w-12 h-12 text-stone-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-stone-900 mb-4">Acesso Restrito</h2>
            <p className="text-stone-600 mb-6">
              Faça login com uma conta de administrador para acessar este painel.
            </p>
            <Button
              onClick={() => { window.location.href = getLoginUrl(); }}
              className="w-full bg-amber-700 hover:bg-amber-800 text-white"
              size="lg"
            >
              Entrar
            </Button>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  if (user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-stone-50">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <Card className="p-8 max-w-md w-full text-center">
            <Shield className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-stone-900 mb-4">Acesso Negado</h2>
            <p className="text-stone-600 mb-6">
              Você não tem permissão para acessar o painel administrativo.
            </p>
            <Button onClick={() => setLocation('/')} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para Home
            </Button>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const filteredUsers = usersData.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      {/* Header */}
      <section className="bg-white border-b border-stone-200 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-5 h-5 text-amber-700" />
                <h1 className="text-2xl font-bold text-stone-900">Painel Administrativo</h1>
              </div>
              <p className="text-stone-600 text-sm">Gerencie usuários, cursos, vídeos e conteúdos da plataforma.</p>
            </div>
            <div className="flex items-center gap-4 text-sm text-stone-600">
              <Card className="px-3 py-2 border-stone-200">
                <span className="font-medium">{usersData.length}</span> usuários
              </Card>
              <Card className="px-3 py-2 border-stone-200">
                <span className="font-medium">{coursesData.length}</span> cursos
              </Card>
              <Card className="px-3 py-2 border-stone-200">
                <span className="font-medium">{videosData.length}</span> vídeos
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs defaultValue="usuarios" className="w-full">
            <TabsList className="mb-6 bg-white border border-stone-200">
              <TabsTrigger value="usuarios" className="gap-2">
                <Users className="w-4 h-4" /> Usuários
              </TabsTrigger>
              <TabsTrigger value="cursos" className="gap-2">
                <BookOpen className="w-4 h-4" /> Cursos
              </TabsTrigger>
              <TabsTrigger value="videos" className="gap-2">
                <Play className="w-4 h-4" /> Vídeos
              </TabsTrigger>
              <TabsTrigger value="conteudos" className="gap-2">
                <FileText className="w-4 h-4" /> Conteúdos
              </TabsTrigger>
              <TabsTrigger value="metricas" className="gap-2">
                <BarChart3 className="w-4 h-4" /> Métricas
              </TabsTrigger>
            </TabsList>

            {/* Usuários Tab */}
            <TabsContent value="usuarios">
              <Card className="border-stone-200">
                <div className="p-4 border-b border-stone-200 flex items-center justify-between gap-4 flex-wrap">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                    <Input
                      placeholder="Buscar usuários..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Button size="sm" className="bg-amber-700 hover:bg-amber-800 text-white">
                    <Plus className="w-4 h-4 mr-1" /> Adicionar Usuário
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-stone-50 border-b border-stone-200">
                      <tr>
                        <th className="text-left px-4 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">Nome</th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">E-mail</th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">Função</th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">Cursos</th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">Cadastro</th>
                        <th className="text-right px-4 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {filteredUsers.map((u) => (
                        <tr key={u.id} className="hover:bg-stone-50">
                          <td className="px-4 py-3 text-sm font-medium text-stone-900">{u.name}</td>
                          <td className="px-4 py-3 text-sm text-stone-600">{u.email}</td>
                          <td className="px-4 py-3">
                            <Badge className={u.role === 'admin' ? 'bg-amber-100 text-amber-800' : 'bg-stone-100 text-stone-700'}>
                              {u.role === 'admin' ? 'Admin' : 'Aluno'}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-sm text-stone-600">{u.courses}</td>
                          <td className="px-4 py-3 text-sm text-stone-500">{u.createdAt}</td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="w-4 h-4 text-stone-500" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Edit className="w-4 h-4 text-stone-500" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>

            {/* Cursos Tab */}
            <TabsContent value="cursos">
              <Card className="border-stone-200">
                <div className="p-4 border-b border-stone-200 flex items-center justify-between">
                  <h3 className="font-semibold text-stone-900">Gerenciar Cursos</h3>
                  <Button size="sm" className="bg-amber-700 hover:bg-amber-800 text-white">
                    <Plus className="w-4 h-4 mr-1" /> Novo Curso
                  </Button>
                </div>
                <div className="divide-y divide-stone-100">
                  {coursesData.map((course) => (
                    <div key={course.id} className="p-4 flex items-center justify-between gap-4 hover:bg-stone-50">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-stone-900 text-sm truncate">{course.title}</h4>
                          <Badge className={course.published ? 'bg-green-100 text-green-800' : 'bg-stone-100 text-stone-600'}>
                            {course.published ? 'Publicado' : 'Rascunho'}
                          </Badge>
                        </div>
                        <p className="text-xs text-stone-500">{course.students} alunos · {course.modules} módulos</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="w-4 h-4 text-stone-500" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Vídeos Tab */}
            <TabsContent value="videos">
              <Card className="border-stone-200">
                <div className="p-4 border-b border-stone-200 flex items-center justify-between">
                  <h3 className="font-semibold text-stone-900">Gerenciar Vídeos</h3>
                  <Button size="sm" className="bg-amber-700 hover:bg-amber-800 text-white">
                    <Plus className="w-4 h-4 mr-1" /> Novo Vídeo
                  </Button>
                </div>
                <div className="divide-y divide-stone-100">
                  {videosData.map((video) => (
                    <div key={video.id} className="p-4 flex items-center justify-between gap-4 hover:bg-stone-50">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-stone-900 text-sm truncate">{video.title}</h4>
                          <Badge variant="outline" className="text-xs capitalize">{video.category}</Badge>
                        </div>
                        <p className="text-xs text-stone-500">{video.views} visualizações</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="w-4 h-4 text-stone-500" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Conteúdos Tab */}
            <TabsContent value="conteudos">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 border-stone-200">
                  <h3 className="font-semibold text-stone-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-amber-700" /> Artigos
                  </h3>
                  <p className="text-sm text-stone-600 mb-4">Gerencie os artigos da biblioteca gratuita.</p>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-1" /> Novo Artigo
                  </Button>
                </Card>
                <Card className="p-6 border-stone-200">
                  <h3 className="font-semibold text-stone-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-amber-700" /> Materiais
                  </h3>
                  <p className="text-sm text-stone-600 mb-4">Gerencie materiais para download.</p>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-1" /> Novo Material
                  </Button>
                </Card>
                <Card className="p-6 border-stone-200">
                  <h3 className="font-semibold text-stone-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-amber-700" /> Cases & Entrevistas
                  </h3>
                  <p className="text-sm text-stone-600 mb-4">Gerencie cases, entrevistas e conversas.</p>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-1" /> Novo Case
                  </Button>
                </Card>
                <Card className="p-6 border-stone-200">
                  <h3 className="font-semibold text-stone-900 mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-amber-700" /> Configurações
                  </h3>
                  <p className="text-sm text-stone-600 mb-4">Configurações gerais da plataforma.</p>
                  <Button variant="outline" size="sm">
                    Acessar
                  </Button>
                </Card>
              </div>
            </TabsContent>

            {/* Métricas Tab */}
            <TabsContent value="metricas">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card className="p-4 border-stone-200">
                  <p className="text-xs text-stone-500 uppercase tracking-wide mb-1">Total de Usuários</p>
                  <p className="text-3xl font-bold text-stone-900">{usersData.length}</p>
                  <p className="text-xs text-green-600 mt-1">+12% este mês</p>
                </Card>
                <Card className="p-4 border-stone-200">
                  <p className="text-xs text-stone-500 uppercase tracking-wide mb-1">Cursos Ativos</p>
                  <p className="text-3xl font-bold text-stone-900">{coursesData.filter(c => c.published).length}</p>
                  <p className="text-xs text-stone-500 mt-1">de {coursesData.length} total</p>
                </Card>
                <Card className="p-4 border-stone-200">
                  <p className="text-xs text-stone-500 uppercase tracking-wide mb-1">Vídeos Publicados</p>
                  <p className="text-3xl font-bold text-stone-900">{videosData.filter(v => v.published).length}</p>
                  <p className="text-xs text-stone-500 mt-1">{videosData.reduce((sum, v) => sum + v.views, 0)} views total</p>
                </Card>
                <Card className="p-4 border-stone-200">
                  <p className="text-xs text-stone-500 uppercase tracking-wide mb-1">Matrículas</p>
                  <p className="text-3xl font-bold text-stone-900">{coursesData.reduce((sum, c) => sum + c.students, 0)}</p>
                  <p className="text-xs text-green-600 mt-1">+8% este mês</p>
                </Card>
              </div>
              <Card className="p-6 border-stone-200">
                <h3 className="font-semibold text-stone-900 mb-4">Atividade Recente</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-stone-600">Maria Silva se matriculou em "Fundamentos do Atendimento"</span>
                    <span className="text-stone-400 ml-auto text-xs">2h atrás</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-stone-600">João Santos completou o módulo 3 de "Comunicação Assertiva"</span>
                    <span className="text-stone-400 ml-auto text-xs">5h atrás</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    <span className="text-stone-600">Novo cadastro: Ana Oliveira</span>
                    <span className="text-stone-400 ml-auto text-xs">1 dia atrás</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <span className="text-stone-600">Pedro Costa fez a autoavaliação</span>
                    <span className="text-stone-400 ml-auto text-xs">2 dias atrás</span>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}
