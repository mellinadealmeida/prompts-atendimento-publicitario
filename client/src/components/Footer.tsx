import { useLocation } from 'wouter';

export default function Footer() {
  const [, setLocation] = useLocation();

  return (
    <footer className="bg-stone-900 text-stone-400 py-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <img src="/logo-mellina.png" alt="Mellina D'Anello" className="h-10 mb-4 brightness-200" />
            <p className="text-sm leading-relaxed">
              Transformando carreiras em atendimento publicitário com metodologia, estratégia e prática.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Conteúdo</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => setLocation('/biblioteca')} className="hover:text-white transition">Biblioteca Gratuita</button></li>
              <li><button onClick={() => setLocation('/cursos')} className="hover:text-white transition">Cursos</button></li>
              <li><button onClick={() => setLocation('/videos')} className="hover:text-white transition">Vídeos</button></li>
              <li><button onClick={() => setLocation('/assessment')} className="hover:text-white transition">Autoavaliação</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Serviços</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => setLocation('/mentoria')} className="hover:text-white transition">Mentoria Guiada</button></li>
              <li><button onClick={() => setLocation('/agencias')} className="hover:text-white transition">Para Agências</button></li>
              <li><button onClick={() => setLocation('/cases')} className="hover:text-white transition">Cases & Entrevistas</button></li>
              <li><button onClick={() => setLocation('/sobre')} className="hover:text-white transition">Sobre</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contato</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:contato@mellinadanello.com.br" className="hover:text-white transition">contato@mellinadanello.com.br</a></li>
              <li><a href="https://www.instagram.com/mellinadanello" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Instagram</a></li>
              <li><a href="https://www.linkedin.com/in/mellinadanello" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>&copy; 2026 Mellina D'Anello. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <button className="hover:text-white transition">Política de Privacidade</button>
            <button className="hover:text-white transition">Termos de Uso</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
