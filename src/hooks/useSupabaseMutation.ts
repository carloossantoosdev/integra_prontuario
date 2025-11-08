import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { supabaseClient } from '@/utils/supabaseClient';
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

  // Separar os callbacks customizados
  const customOnSuccess = mutationOptions?.onSuccess;
  const customOnError = mutationOptions?.onError;

  // Remover onSuccess e onError das opções
  const { onSuccess, onError, ...restMutationOptions } = mutationOptions || {};

  return useMutation({
    mutationFn: async (variables: TVariables) => {
      const { data, error } = await supabaseClient
        .from(resource)
        .insert(variables as any)
        .select()
        .single();

      if (error) {
        throw new Error(error.message || 'Erro ao criar registro');
      }

      return data as TData;
    },
    onSuccess: async (data, variables, context) => {
      // Aguardar a invalidação do cache antes de continuar
      await queryClient.invalidateQueries({ queryKey: ['list', resource] });
      toast.success('Registro criado com sucesso!');
      // Executar o onSuccess customizado, se fornecido
      if (customOnSuccess) {
        (customOnSuccess as any)(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao criar registro';
      toast.error(errorMessage);
      // Executar o onError customizado, se fornecido
      if (customOnError) {
        (customOnError as any)(error, variables, context);
      }
    },
    ...restMutationOptions,
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

  // Separar os callbacks customizados
  const customOnSuccess = mutationOptions?.onSuccess;
  const customOnError = mutationOptions?.onError;

  // Remover onSuccess e onError das opções
  const { onSuccess, onError, ...restMutationOptions } = mutationOptions || {};

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: TVariables }) => {
      const { data: result, error } = await supabaseClient
        .from(resource)
        .update(data as any)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message || 'Erro ao atualizar registro');
      }

      return result as TData;
    },
    onSuccess: async (data, variables, context) => {
      // Aguardar a invalidação do cache antes de continuar
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['list', resource] }),
        queryClient.invalidateQueries({
          queryKey: ['one', resource, variables.id],
        }),
      ]);
      toast.success('Registro atualizado com sucesso!');
      // Executar o onSuccess customizado, se fornecido
      if (customOnSuccess) {
        (customOnSuccess as any)(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao atualizar registro';
      toast.error(errorMessage);
      // Executar o onError customizado, se fornecido
      if (customOnError) {
        (customOnError as any)(error, variables, context);
      }
    },
    ...restMutationOptions,
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

  // Separar os callbacks customizados
  const customOnSuccess = mutationOptions?.onSuccess;
  const customOnError = mutationOptions?.onError;

  // Remover onSuccess e onError das opções
  const { onSuccess, onError, ...restMutationOptions } = mutationOptions || {};

  return useMutation({
    mutationFn: async (id: string) => {
      // Se for paciente, deletar evoluções relacionadas
      if (resource === 'pacientes') {
        const collections = ['evolucao_rcp', 'evolucao_dnm'];
        for (const collection of collections) {
          try {
            const { data: related } = await supabaseClient
              .from(collection)
              .select('id')
              .eq('patient_id', id);

            if (related && related.length > 0) {
              const idsToDelete = related.map(r => r.id);
              await supabaseClient
                .from(collection)
                .delete()
                .in('id', idsToDelete);
            }
          } catch (error) {
            console.error(`Erro ao deletar ${collection}:`, error);
          }
        }
      }

      const { error } = await supabaseClient
        .from(resource)
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(error.message || 'Erro ao excluir registro');
      }
    },
    onSuccess: async (data, variables, context) => {
      // Aguardar a invalidação do cache antes de continuar
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['list', resource] }),
        queryClient.invalidateQueries({ queryKey: ['one', resource, variables] }),
      ]);
      toast.success('Registro excluído com sucesso!');
      // Executar o onSuccess customizado, se fornecido
      if (customOnSuccess) {
        (customOnSuccess as any)(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao excluir registro';
      toast.error(errorMessage);
      // Executar o onError customizado, se fornecido
      if (customOnError) {
        (customOnError as any)(error, variables, context);
      }
    },
    ...restMutationOptions,
  });
}
