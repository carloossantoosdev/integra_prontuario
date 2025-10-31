import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { PageHeader } from './PageHeader';

interface FormContainerProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
}

export function FormContainer({
  title,
  subtitle,
  children,
  onSubmit,
  onCancel,
  isLoading = false,
  submitLabel = 'Salvar',
  cancelLabel = 'Cancelar',
}: FormContainerProps) {
  return (
    <div>
      <PageHeader title={title} subtitle={subtitle} showBackButton />

      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            {children}

            <div className="flex justify-end gap-2 pt-4 border-t">
              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  disabled={isLoading}
                >
                  {cancelLabel}
                </Button>
              )}

              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {submitLabel}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

