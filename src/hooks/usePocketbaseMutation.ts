import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { pocketbaseClient } from '@/utils/pocketbaseClient';
import { toast } from 'sonner';

interface CreateOptions<TData = any, TVariables = any> {
  resource: string;
  mutationOptions?: Omit<
    UseMutationOptions<TData, Error, TVariables>,
    'mutationFn'
  >;
}

export function useCreate<TData = any, TVariables = any>(
  options: CreateOptions<TData, TVariables>
) {
  const queryClient = useQueryClient();
  const { resource, mutationOptions } = options;

  return useMutation({
    mutationFn: async (variables: TVariables) => {
      const result = await pocketbaseClient
        .collection(resource)
        .create(variables as any);
      return result as TData;
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['list', resource] });
      toast.success('Registro criado com sucesso!');
      mutationOptions?.onSuccess?.(data, variables, context);
    },
    onError: (error: Error, variables, context) => {
      toast.error(error.message || 'Erro ao criar registro');
      mutationOptions?.onError?.(error, variables, context);
    },
    ...mutationOptions,
  });
}

interface UpdateOptions<TData = any, TVariables = any> {
  resource: string;
  mutationOptions?: Omit<
    UseMutationOptions<TData, Error, { id: string; data: TVariables }>,
    'mutationFn'
  >;
}

export function useUpdate<TData = any, TVariables = any>(
  options: UpdateOptions<TData, TVariables>
) {
  const queryClient = useQueryClient();
  const { resource, mutationOptions } = options;

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: TVariables }) => {
      const result = await pocketbaseClient
        .collection(resource)
        .update(id, data as any);
      return result as TData;
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['list', resource] });
      queryClient.invalidateQueries({
        queryKey: ['one', resource, variables.id],
      });
      toast.success('Registro atualizado com sucesso!');
      mutationOptions?.onSuccess?.(data, variables, context);
    },
    onError: (error: Error, variables, context) => {
      toast.error(error.message || 'Erro ao atualizar registro');
      mutationOptions?.onError?.(error, variables, context);
    },
    ...mutationOptions,
  });
}

interface DeleteOptions {
  resource: string;
  mutationOptions?: Omit<
    UseMutationOptions<void, Error, string>,
    'mutationFn'
  >;
}

export function useDelete(options: DeleteOptions) {
  const queryClient = useQueryClient();
  const { resource, mutationOptions } = options;

  return useMutation({
    mutationFn: async (id: string) => {
      // Se for paciente, deletar evoluções relacionadas
      if (resource === 'pacientes') {
        const collections = ['evolucao_rcp', 'evolucao_dnm'];
        for (const collection of collections) {
          try {
            const related = await pocketbaseClient
              .collection(collection)
              .getList(1, 50, {
                filter: `patient_id = "${id}"`,
              });

            for (const record of related.items) {
              await pocketbaseClient.collection(collection).delete(record.id);
            }
          } catch (error) {
            console.error(`Erro ao deletar ${collection}:`, error);
          }
        }
      }

      await pocketbaseClient.collection(resource).delete(id);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['list', resource] });
      queryClient.invalidateQueries({ queryKey: ['one', resource, variables] });
      toast.success('Registro excluído com sucesso!');
      mutationOptions?.onSuccess?.(data, variables, context);
    },
    onError: (error: Error, variables, context) => {
      toast.error(error.message || 'Erro ao excluir registro');
      mutationOptions?.onError?.(error, variables, context);
    },
    ...mutationOptions,
  });
}

