import { useState, ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden relative" style={{
      background: 'linear-gradient(180deg, #f7fbfc 0%, #eef6f7 100%)'
    }}>
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `radial-gradient(circle at 80% 20%, rgba(27, 160, 164, 0.04) 0%, transparent 50%),
                            radial-gradient(circle at 20% 80%, rgba(144, 188, 33, 0.04) 0%, transparent 50%)`
        }} />
      </div>

      {/* Floating Logo Background */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <img
          src="/integra-symbol.svg"
          alt=""
          className="w-[500px] h-[500px] object-contain opacity-[0.02] dark:opacity-[0.01]"
        />
      </div>

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-col flex-1 overflow-hidden relative z-10">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
