import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { maskCarga, maskSeriesRepeticoes } from '@/lib/masks';

interface TreinamentoResistidoFormProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
}

const resistidoExercises = [
  { name: 'Diagonal 1', value: 'diagonal_1' },
  { name: 'Diagonal 2', value: 'diagonal_2' },
  { name: 'Flexão de cotovelo', value: 'flexao_cotovelo' },
  { name: 'Extensão de cotovelo', value: 'extensao_cotovelo' },
  { name: 'Flexão de ombro', value: 'flexao_ombro' },
  { name: 'Extensão de joelho', value: 'extensao_joelho' },
  { name: 'Flexão de joelho', value: 'flexao_joelho' },
  { name: 'Flexão de quadril', value: 'flexao_quadril' },
  { name: 'Extensão de quadril', value: 'extensao_quadril' },
  { name: 'Flexão plantar', value: 'flexao_plantar' },
];

export const TreinamentoResistidoForm = ({
  register,
  setValue,
  watch,
}: TreinamentoResistidoFormProps) => {
  const selected = watch('treinamento_resistido') || {};

  const handleCheckboxChange = (exerciseValue: string, checked: boolean) => {
    const updatedExercises = { ...selected };
    if (checked) {
      updatedExercises[exerciseValue] = {
        carga: '',
        series_repeticoes: '',
      };
    } else {
      delete updatedExercises[exerciseValue];
    }
    setValue('treinamento_resistido', updatedExercises);
  };

  return (
    <div className="space-y-4">
      {resistidoExercises.map(exercise => {
        const isChecked = Boolean(selected[exercise.value]);

        return (
          <div
            key={exercise.value}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <Checkbox
                id={exercise.value}
                checked={isChecked}
                onCheckedChange={checked =>
                  handleCheckboxChange(exercise.value, checked as boolean)
                }
              />
              <Label
                htmlFor={exercise.value}
                className="font-medium cursor-pointer"
              >
                {exercise.name}
              </Label>
            </div>

            {isChecked && (
              <div className="ml-6 grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`${exercise.value}_carga`}>Carga</Label>
                  <Input
                    id={`${exercise.value}_carga`}
                    placeholder="Ex: 5kg"
                    {...register(
                      `treinamento_resistido.${exercise.value}.carga`
                    )}
                    onChange={e => {
                      const masked = maskCarga(e.target.value);
                      setValue(
                        `treinamento_resistido.${exercise.value}.carga`,
                        masked
                      );
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor={`${exercise.value}_series`}>
                    Séries/Repetições
                  </Label>
                  <Input
                    id={`${exercise.value}_series`}
                    placeholder="Ex: 3/10"
                    {...register(
                      `treinamento_resistido.${exercise.value}.series_repeticoes`
                    )}
                    onChange={e => {
                      const masked = maskSeriesRepeticoes(e.target.value);
                      setValue(
                        `treinamento_resistido.${exercise.value}.series_repeticoes`,
                        masked
                      );
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
