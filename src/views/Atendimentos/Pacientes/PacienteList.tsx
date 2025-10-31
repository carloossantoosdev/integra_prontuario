import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Plus, Eye, Trash2, Search, X } from 'lucide-react';
import { PageHeader } from '@/components/crud/PageHeader';
import { DataTable } from '@/components/crud/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useList } from '@/hooks/useSupabaseQuery';
import { useDelete } from '@/hooks/useSupabaseMutation';

interface Paciente {
  id: string;
  nome: string;
  data_nascimento: string;
  inicio_atendimento: string;
  valor: number;
  area_atendimento: string;
}

export const PacienteList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchNome, setSearchNome] = useState('');
  const [searchNomeDebounced, setSearchNomeDebounced] = useState('');
  const [filterArea, setFilterArea] = useState<string>('');
  const pageSize = 10;

  // Debounce para o campo de busca por nome
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchNomeDebounced(searchNome);
      setCurrentPage(0); // Reset página ao filtrar
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchNome]);

  // Construir filtros dinamicamente
  const buildFilters = () => {
    const filters: Record<string, any> = {};

    if (searchNomeDebounced) {
      filters.nome = searchNomeDebounced;
      filters._searchMode = 'contains'; // Para busca parcial
    }

    if (filterArea && filterArea !== 'all') {
      filters.area_atendimento = filterArea;
    }

    return filters;
  };

  const { data, isLoading, refetch } = useList<Paciente>({
    resource: 'pacientes',
    filters: buildFilters(),
    pagination: {
      current: currentPage + 1,
      pageSize,
    },
  });

  const deleteMutation = useDelete({
    resource: 'pacientes',
    mutationOptions: {
      onSuccess: () => {
        refetch();
        setDeleteId(null);
      },
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const columns: ColumnDef<Paciente>[] = [
    {
      accessorKey: 'nome',
      header: 'Nome',
    },
    {
      accessorKey: 'data_nascimento',
      header: 'Data de Nascimento',
      cell: ({ row }) => {
        const date = row.getValue('data_nascimento') as string;
        if (!date) return '-';
        try {
          return format(new Date(date), 'dd/MM/yyyy');
        } catch {
          return date;
        }
      },
    },
    {
      accessorKey: 'inicio_atendimento',
      header: 'Início Atendimento',
      cell: ({ row }) => {
        const date = row.getValue('inicio_atendimento') as string;
        if (!date) return '-';
        try {
          return format(new Date(date), 'dd/MM/yyyy');
        } catch {
          return date;
        }
      },
    },
    {
      accessorKey: 'valor',
      header: 'Valor',
      cell: ({ row }) => {
        const valor = row.getValue('valor') as number;
        return valor
          ? `R$ ${valor.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`
          : 'R$ 0,00';
      },
    },
    {
      accessorKey: 'area_atendimento',
      header: 'Área de Atendimento',
    },
    {
      id: 'actions',
      header: 'Ações',
      cell: ({ row }) => {
        const paciente = row.original;
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const route =
                  paciente.area_atendimento === 'RCP'
                    ? `/evolucao_rcp/create/${paciente.id}`
                    : `/evolucao_dnm/create/${paciente.id}`;
                navigate(route);
              }}
              title="Adicionar Evolução"
            >
              <Plus className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(`/pacientes/show/${paciente.id}`)}
              title="Ver Detalhes"
            >
              <Eye className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDeleteId(paciente.id)}
              title="Excluir"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        );
      },
    },
  ];

  const handleClearFilters = () => {
    setSearchNome('');
    setSearchNomeDebounced('');
    setFilterArea('');
    setCurrentPage(0);
  };

  const hasActiveFilters = searchNome || filterArea;
  const isSearching = searchNome !== searchNomeDebounced;

  return (
    <div className="space-y-4">
      <PageHeader
        title="Pacientes"
        subtitle="Gerenciar cadastro de pacientes"
        actions={
          <Button onClick={() => navigate('/pacientes/create')}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Paciente
          </Button>
        }
      />

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="searchNome">Buscar por Nome</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="searchNome"
                  placeholder="Digite o nome..."
                  value={searchNome}
                  onChange={e => setSearchNome(e.target.value)}
                  className="pl-8"
                />
                {isSearching && (
                  <div className="absolute right-2 top-2.5">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  </div>
                )}
              </div>
              {isSearching && (
                <p className="text-xs text-muted-foreground mt-1">
                  Buscando...
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="filterArea">Área de Atendimento</Label>
              <Select
                value={filterArea}
                onValueChange={value => {
                  setFilterArea(value);
                  setCurrentPage(0);
                }}
              >
                <SelectTrigger id="filterArea">
                  <SelectValue placeholder="Todas as áreas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as áreas</SelectItem>
                  <SelectItem value="RCP">RCP</SelectItem>
                  <SelectItem value="DNM">DNM</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  className="w-full"
                >
                  <X className="h-4 w-4 mr-2" />
                  Limpar Filtros
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <DataTable
        columns={columns}
        data={data?.data || []}
        loading={isLoading}
        pagination={{
          pageIndex: currentPage,
          pageSize,
          total: data?.total || 0,
          onPageChange: setCurrentPage,
        }}
      />

      <AlertDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este paciente? Esta ação também
              excluirá todas as evoluções relacionadas e não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
