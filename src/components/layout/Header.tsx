import { Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { useAuth } from '@/providers/AuthProvider'; // AUTENTICAÇÃO COMENTADA
// import { useNavigate } from 'react-router-dom'; // AUTENTICAÇÃO COMENTADA

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  // ============================================
  // AUTENTICAÇÃO COMENTADA TEMPORARIAMENTE
  // Para reativar, descomente os blocos abaixo
  // ============================================
  
  /*
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  */

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" style={{ borderColor: 'var(--color-border)' }}>
      <div className="flex h-16 items-center px-4 gap-4">
        {/* Menu Button (Mobile) */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden hover:bg-secondary/10"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" style={{ color: 'var(--integra-turquoise)' }} />
        </Button>

        {/* Logo (Mobile) */}
        <div className="flex items-center gap-2 lg:hidden">
          <img
            src="/Logo.png"
            alt="Integra"
            className="h-10 object-contain"
          />
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* AUTENTICAÇÃO COMENTADA - Nome do usuário e botão de logout */}
          {/*
          {user?.name && (
            <span className="text-sm font-medium hidden sm:inline-block" style={{ color: 'var(--integra-petroleum)' }}>
              {user.name}
            </span>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="hover:bg-destructive/10"
            style={{ color: 'var(--integra-petroleum)' }}
          >
            <LogOut className="h-5 w-5" />
          </Button>
          */}
        </div>
      </div>
    </header>
  );
}
