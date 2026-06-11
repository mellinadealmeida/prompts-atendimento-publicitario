import { Button } from '@/components/ui/button';
import { useAuth } from '@/_core/hooks/useAuth';
import { getLoginUrl } from '@/const';
import { useLocation } from 'wouter';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Biblioteca Gratuita', path: '/biblioteca' },
  { label: 'Cursos', path: '/cursos' },
  { label: 'Mentoria Guiada', path: '/mentoria' },
  { label: 'Vídeos', path: '/videos' },
  { label: 'Para Agências', path: '/agencias' },
  { label: 'Cases & Entrevistas', path: '/cases' },
  { label: 'Sobre', path: '/sobre' },
];

export default function Navbar() {
  const [location, setLocation] = useLocation();
  const { user, loading, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => setLocation('/')} className="flex items-center gap-2">
            <img src="/logo-mellina.png" alt="Mellina D'Anello" className="h-10" />
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => setLocation(item.path)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  location === item.path
                    ? 'text-amber-800 bg-amber-50'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {loading ? null : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <User className="w-4 h-4" />
                    {user.name || 'Minha Conta'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {user.role === 'admin' && (
                    <DropdownMenuItem onClick={() => setLocation('/dashboard')}>
                      Painel Admin
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => setLocation('/minha-area')}>
                    Minha Área
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={() => { window.location.href = getLoginUrl(); }}
                size="sm"
                className="bg-amber-700 hover:bg-amber-800 text-white"
              >
                Entrar
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-stone-200">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    setLocation(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-3 text-left text-sm font-medium rounded-md transition-colors ${
                    location === item.path
                      ? 'text-amber-800 bg-amber-50'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="border-t border-stone-200 mt-2 pt-2">
                {user ? (
                  <>
                    <button
                      onClick={() => { setLocation('/minha-area'); setMobileMenuOpen(false); }}
                      className="px-4 py-3 text-left text-sm font-medium text-stone-600 hover:bg-stone-50 rounded-md w-full"
                    >
                      Minha Área
                    </button>
                    {user.role === 'admin' && (
                      <button
                        onClick={() => { setLocation('/dashboard'); setMobileMenuOpen(false); }}
                        className="px-4 py-3 text-left text-sm font-medium text-stone-600 hover:bg-stone-50 rounded-md w-full"
                      >
                        Painel Admin
                      </button>
                    )}
                    <button
                      onClick={() => { logout(); setMobileMenuOpen(false); }}
                      className="px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50 rounded-md w-full"
                    >
                      Sair
                    </button>
                  </>
                ) : (
                  <Button
                    onClick={() => { window.location.href = getLoginUrl(); }}
                    className="w-full bg-amber-700 hover:bg-amber-800 text-white"
                  >
                    Entrar
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
