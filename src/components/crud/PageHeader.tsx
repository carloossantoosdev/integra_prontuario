import { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  actions?: ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  showBackButton = false,
  actions,
}: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="mb-6 pb-6 border-b-2" style={{ borderColor: 'var(--integra-cyan)' }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="hover:bg-secondary/10"
            >
              <ArrowLeft className="h-5 w-5" style={{ color: 'var(--integra-turquoise)' }} />
            </Button>
          )}
          <div>
            <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--integra-primary-darkest)' }}>
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 text-base" style={{ color: 'var(--integra-text-nav)' }}>
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}

