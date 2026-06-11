import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Presentation, Mic, MessageSquare, CheckCircle2, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const services = [
  {
    icon: Users,
    title: 'Treinamentos',
    description: 'Capacitação personalizada para equipes de atendimento, com foco em competências estratégicas e operacionais.',
    features: ['Diagnóstico da equipe', 'Conteúdo customizado', 'Exercícios práticos', 'Avaliação de resultados'],
  },
  {
    icon: Presentation,
    title: 'Workshops',
    description: 'Sessões intensivas e práticas sobre temas específicos como briefing, gestão de contas e comunicação.',
    features: ['Formato imersivo', 'Casos reais', 'Dinâmicas em grupo', 'Material de apoio'],
  },
  {
    icon: Mic,
    title: 'Palestras',
    description: 'Apresentações inspiradoras sobre tendências, carreira e o futuro do atendimento publicitário.',
    features: ['Eventos corporativos', 'Congressos', 'Encontros de equipe', 'Keynotes'],
  },
  {
    icon: MessageSquare,
    title: 'Consultorias',
    description: 'Acompanhamento estratégico para estruturar processos, desenvolver equipes e melhorar resultados.',
    features: ['Análise de processos', 'Mentoria de líderes', 'Plano de ação', 'Acompanhamento mensal'],
  },
];

export default function Agencias() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    serviceType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.contactName || !formData.email || !formData.serviceType) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    setIsSubmitting(true);
    // Simulated submission
    setTimeout(() => {
      toast.success('Proposta enviada com sucesso! Entraremos em contato em breve.');
      setFormData({ companyName: '', contactName: '', email: '', phone: '', serviceType: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-br from-stone-900 to-stone-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-amber-400 font-medium mb-2 text-sm uppercase tracking-wide">Para Agências</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Eleve o Nível do Atendimento da sua Agência
            </h1>
            <p className="text-lg text-stone-300">
              Treinamentos, workshops, palestras e consultorias para transformar equipes de atendimento em parceiros estratégicos dos clientes.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <Card key={idx} className="p-8 border-stone-200 hover:shadow-md transition-shadow">
                <service.icon className="w-10 h-10 text-amber-700 mb-4" />
                <h3 className="text-xl font-bold text-stone-900 mb-3">{service.title}</h3>
                <p className="text-stone-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-sm text-stone-700">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-white border-t border-stone-200" id="proposta">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-3">Solicite uma Proposta</h2>
            <p className="text-stone-600">
              Preencha o formulário abaixo e entraremos em contato para entender suas necessidades e apresentar uma proposta personalizada.
            </p>
          </div>

          <Card className="p-8 border-stone-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Nome da Empresa *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Nome da agência"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactName">Nome do Contato *</Label>
                  <Input
                    id="contactName"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    placeholder="Seu nome"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@agencia.com.br"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Tipo de Serviço *</Label>
                <Select value={formData.serviceType} onValueChange={(value) => setFormData({ ...formData, serviceType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o serviço desejado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="treinamento">Treinamento</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="palestra">Palestra</SelectItem>
                    <SelectItem value="consultoria">Consultoria</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Mensagem (opcional)</Label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Conte um pouco sobre a necessidade da sua equipe..."
                  className="w-full min-h-[120px] px-3 py-2 border border-stone-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-700 hover:bg-amber-800 text-white"
                size="lg"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
