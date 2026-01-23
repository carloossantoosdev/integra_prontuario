import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface TreinamentoAerobicoFormProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

const aerobicType = [
  { name: 'Caminhada', value: 'Caminhada' },
  { name: 'Esteira', value: 'Esteira' },
  { name: 'Marcha estática', value: 'Marcha estática' },
  { name: 'Cicloergometria de MMSS', value: 'Cicloergometria de MMSS' },
  { name: 'Cicloergometria de MMII', value: 'Cicloergometria de MMII' },
  { name: 'Circuito Funcional', value: 'Circuito Funcional' },
];

export const TreinamentoAerobicoForm = ({
  register,
  errors,
}: TreinamentoAerobicoFormProps) => {
  return (
    <div className="space-y-6">
      {/* Tipo */}
      <div>
        <Label className="text-base font-semibold mb-3 block">Tipo</Label>
        <RadioGroup defaultValue="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {aerobicType.map(({ name, value }) => (
              <div
                key={value}
                className="flex items-center space-x-2"
              >
                <RadioGroupItem
                  value={value}
                  id={`tipo_${value}`}
                  {...register('treinamento_aerobico.tipo')}
                />
                <Label
                  htmlFor={`tipo_${value}`}
                  className="font-normal cursor-pointer"
                >
                  {name}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
        {errors.treinamento_aerobico && 'tipo' in errors.treinamento_aerobico && (
          <p className="text-sm text-destructive mt-2">
            {(errors.treinamento_aerobico as any).tipo?.message as string}
          </p>
        )}
      </div>

      {/* Campos de Intensidade, Duração e Carga */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="intensidade">Intensidade</Label>
          <Input
            id="intensidade"
            {...register('treinamento_aerobico.intensidade')}
          />
          {errors.treinamento_aerobico && 'intensidade' in errors.treinamento_aerobico && (
            <p className="text-sm text-destructive mt-1">
              {(errors.treinamento_aerobico as any).intensidade?.message as string}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="duracao">Duração</Label>
          <Input
            id="duracao"
            {...register('treinamento_aerobico.duracao')}
          />
          {errors.treinamento_aerobico && 'duracao' in errors.treinamento_aerobico && (
            <p className="text-sm text-destructive mt-1">
              {(errors.treinamento_aerobico as any).duracao?.message as string}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="carga">Carga</Label>
          <Input
            id="carga"
            {...register('treinamento_aerobico.carga')}
          />
          {errors.treinamento_aerobico && 'carga' in errors.treinamento_aerobico && (
            <p className="text-sm text-destructive mt-1">
              {(errors.treinamento_aerobico as any).carga?.message as string}
            </p>
          )}
        </div>
      </div>

      {/* Circuito Funcional */}
      <div>
        <Label htmlFor="circuito_funcional">
          Observações (Descrição de circuito funcional ou outro)
        </Label>
        <Input
          id="circuito_funcional"
          {...register('treinamento_aerobico.circuito_funcional')}
          placeholder="Descreva o circuito funcional..."
        />
      </div>
    </div>
  );
};
