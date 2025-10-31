import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Edit, Trash2, Loader2 } from 'lucide-react';
import { PageHeader } from '@/components/crud/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
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
import { useOne } from '@/hooks/useSupabaseQuery';
import { useDelete } from '@/hooks/useSupabaseMutation';
import { supabaseClient } from '@/utils/supabaseClient';
import moment from 'moment';

export const PacienteShow = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [vitalsData, setVitalsData] = useState<any[]>([]);
  const [loadingVitals, setLoadingVitals] = useState(true);
  const [filterDate, setFilterDate] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: paciente, isLoading } = useOne<any>('pacientes', id);

  const deleteMutation = useDelete({
    resource: 'pacientes',
    mutationOptions: {
      onSuccess: () => {
        navigate('/pacientes');
      },
    },
  });

  useEffect(() => {
    const fetchVitals = async () => {
      if (paciente?.id) {
        setLoadingVitals(true);
        try {
          const area = String(paciente.area_atendimento || '').toUpperCase();
          const collectionName = area.includes('DNM')
            ? 'evolucao_dnm'
            : 'evolucao_rcp';

          const { data: vitalsResult, error } = await supabaseClient
            .from(collectionName)
            .select('*')
            .eq('patient_id', paciente.id)
            .order('data_atendimento', { ascending: false })
            .limit(50);

          if (error) {
            throw error;
          }

          setVitalsData(vitalsResult || []);
        } catch (error) {
          console.error('Erro ao buscar evoluções:', error);
          setVitalsData([]);
        }
        setLoadingVitals(false);
      }
    };

    fetchVitals();
  }, [paciente]);

  const filteredVitalsData = vitalsData.filter(vital => {
    if (!filterDate) return true;
    try {
      const vitalDate = vital?.data_atendimento || vital?.created;
      return new Date(vitalDate).toISOString().slice(0, 10) === filterDate;
    } catch {
      return false;
    }
  });

  const formatFieldName = (key: string): string => {
    if (key === 'series_repeticoes') return 'Séries/Repetições';
    if (key === 'carga') return 'Carga';
    return key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
  };

  const renderValue = (value: any): React.ReactNode => {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'object') {
      // Se for um objeto, renderizar suas propriedades formatadas
      const entries = Object.entries(value)
        .filter(([_, v]) => v !== false && v !== null && v !== undefined && v !== '');
      
      if (entries.length === 0) return '-';
      
      return (
        <div className="space-y-1">
          {entries.map(([k, v], index) => (
            <div key={k}>
              <span className="font-semibold">{formatFieldName(k)}:</span>{' '}
              <span>{String(v)}</span>
              {index < entries.length - 1 && <span className="text-muted-foreground"> • </span>}
            </div>
          ))}
        </div>
      );
    }
    return String(value);
  };

  const renderDataTable = (data: any) => {
    if (!data || typeof data !== 'object') return null;

    return Object.entries(data).map(([key, value]) => (
      <TableRow key={key}>
        <TableCell className="font-medium capitalize">
          {formatFieldName(key)}
        </TableCell>
        <TableCell>{renderValue(value)}</TableCell>
      </TableRow>
    ));
  };

  if (isLoading || loadingVitals) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!paciente) {
    return (
      <div>
        <PageHeader
          title="Paciente não encontrado"
          showBackButton
        />
        <p>O paciente solicitado não foi encontrado.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Detalhes: ${paciente.nome}`}
        showBackButton
        actions={
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => navigate(`/pacientes/edit/${id}`)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
            <Button
              variant="destructive"
              onClick={() => setDeleteId(id!)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir
            </Button>
          </div>
        }
      />

      {/* Dados do Paciente */}
      <Card>
        <CardHeader>
          <CardTitle>Informações do Paciente</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Nome</TableCell>
                <TableCell>{paciente.nome}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Data de Nascimento
                </TableCell>
                <TableCell>
                  {paciente.data_nascimento
                    ? format(new Date(paciente.data_nascimento), 'dd/MM/yyyy')
                    : '-'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Início do Atendimento
                </TableCell>
                <TableCell>
                  {paciente.inicio_atendimento
                    ? format(
                        new Date(paciente.inicio_atendimento),
                        'dd/MM/yyyy'
                      )
                    : '-'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Valor</TableCell>
                <TableCell>
                  {paciente.valor
                    ? `R$ ${paciente.valor.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`
                    : 'R$ 0,00'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Área de Atendimento
                </TableCell>
                <TableCell>{paciente.area_atendimento}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Filtro de Data */}
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <Label htmlFor="filterDate">Filtrar por Data</Label>
          <Input
            id="filterDate"
            type="date"
            value={filterDate}
            onChange={e => setFilterDate(e.target.value)}
          />
        </div>
        {filterDate && (
          <Button
            variant="outline"
            onClick={() => setFilterDate('')}
          >
            Limpar Filtro
          </Button>
        )}
      </div>

      {/* Evoluções */}
      <Card>
        <CardHeader>
          <CardTitle>Evoluções</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredVitalsData.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Nenhuma evolução encontrada.
            </p>
          ) : (
            <Accordion
              type="single"
              collapsible
              className="w-full"
            >
              {filteredVitalsData.map(vital => {
                const date = vital?.data_atendimento || vital?.created;
                return (
                  <AccordionItem
                    key={vital.id}
                    value={vital.id}
                  >
                    <AccordionTrigger>
                      Evolução {paciente.area_atendimento} -{' '}
                      {moment(date).format('DD/MM/YYYY')}
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      {vital.ssvv_inicial && (
                        <div>
                          <h4 className="font-semibold mb-2">
                            Sinais Vitais Iniciais
                          </h4>
                          <Table>
                            <TableBody>
                              {renderDataTable(vital.ssvv_inicial)}
                            </TableBody>
                          </Table>
                        </div>
                      )}

                      {vital.ssvv_final && (
                        <div>
                          <h4 className="font-semibold mb-2">
                            Sinais Vitais Finais
                          </h4>
                          <Table>
                            <TableBody>
                              {renderDataTable(vital.ssvv_final)}
                            </TableBody>
                          </Table>
                        </div>
                      )}

                      {vital.ausculta_pulmonar && Object.keys(vital.ausculta_pulmonar).length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2">
                            Ausculta Pulmonar
                          </h4>
                          
                          {vital.ausculta_pulmonar.localizacao && Object.keys(vital.ausculta_pulmonar.localizacao).length > 0 && (
                            <div className="mb-3">
                              <p className="font-medium text-sm mb-1">Localização:</p>
                              <div className="flex flex-wrap gap-2">
                                {Object.entries(vital.ausculta_pulmonar.localizacao)
                                  .filter(([_, value]) => value === 'on' || value === true)
                                  .map(([key]) => (
                                    <span key={key} className="px-2 py-1 bg-primary/10 text-primary rounded text-sm">
                                      {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          )}

                          {vital.ausculta_pulmonar.ruidos && Object.keys(vital.ausculta_pulmonar.ruidos).length > 0 && (
                            <div className="mb-3">
                              <p className="font-medium text-sm mb-1">Ruídos:</p>
                              <div className="flex flex-wrap gap-2">
                                {Object.entries(vital.ausculta_pulmonar.ruidos)
                                  .filter(([_, value]) => value === 'on' || value === true)
                                  .map(([key]) => (
                                    <span key={key} className="px-2 py-1 bg-secondary/10 text-secondary rounded text-sm">
                                      {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          )}

                          {vital.ausculta_pulmonar.mv && Object.keys(vital.ausculta_pulmonar.mv).length > 0 && (
                            <div className="mb-3">
                              <p className="font-medium text-sm mb-1">Murmúrio Vesicular (MV):</p>
                              <div className="flex flex-wrap gap-2">
                                {Object.entries(vital.ausculta_pulmonar.mv)
                                  .filter(([_, value]) => value === 'on' || value === true)
                                  .map(([key]) => (
                                    <span key={key} className="px-2 py-1 bg-tertiary/10 text-tertiary rounded text-sm">
                                      {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Treinamento Aeróbico */}
                      {vital.treinamento_aerobico && Object.keys(vital.treinamento_aerobico).length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2">1. Treinamento Aeróbico</h4>
                          <Table>
                            <TableBody>
                              {renderDataTable(vital.treinamento_aerobico)}
                            </TableBody>
                          </Table>
                        </div>
                      )}

                      {/* Treinamento Resistido */}
                      {vital.treinamento_resistido && Object.keys(vital.treinamento_resistido).length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2">2. Treinamento Resistido</h4>
                          <Table>
                            <TableBody>
                              {renderDataTable(vital.treinamento_resistido)}
                            </TableBody>
                          </Table>
                        </div>
                      )}

                      {/* Exercícios Funcionais */}
                      {vital.treinamento_funcional && Object.keys(vital.treinamento_funcional).length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2">3. Exercícios Funcionais</h4>
                          <Table>
                            <TableBody>
                              {renderDataTable(vital.treinamento_funcional)}
                            </TableBody>
                          </Table>
                        </div>
                      )}

                      {/* TMI */}
                      {vital.tmi && Object.keys(vital.tmi).length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2">4. TMI (Treinamento Muscular Inspiratório)</h4>
                          <Table>
                            <TableBody>
                              {renderDataTable(vital.tmi)}
                            </TableBody>
                          </Table>
                        </div>
                      )}

                      {/* Terapia de Expansão */}
                      {vital.terapia_expansao && Object.keys(vital.terapia_expansao).length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2">5. Terapia de Expansão Pulmonar</h4>
                          <Table>
                            <TableBody>
                              {renderDataTable(vital.terapia_expansao)}
                            </TableBody>
                          </Table>
                        </div>
                      )}

                      {/* Terapia de Remoção de Secreção */}
                      {vital.terapia_remo_secrecao && Object.keys(vital.terapia_remo_secrecao).length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2">6. Terapia de Remoção de Secreção</h4>
                          <Table>
                            <TableBody>
                              {renderDataTable(vital.terapia_remo_secrecao)}
                            </TableBody>
                          </Table>
                        </div>
                      )}

                      <div className="pt-4 border-t space-y-2">
                        {vital.fisioterapeuta && (
                          <p>
                            <span className="font-medium">Fisioterapeuta:</span>{' '}
                            {vital.fisioterapeuta}
                          </p>
                        )}
                        {vital.observacao && (
                          <p>
                            <span className="font-medium">Observações:</span>{' '}
                            {vital.observacao}
                          </p>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          )}
        </CardContent>
      </Card>

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
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
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
