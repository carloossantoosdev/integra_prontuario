import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { maskCarga, maskSeriesRepeticoes } from '@/lib/masks';

interface ExerciciosFuncionaisFormProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
}

const functionalExercises = [
  { name: 'Treino de sentar e levantar', value: 'sentar_levantar' },
  { name: 'Subir e descer degrau', value: 'subir_descer_degrau' },
  { name: 'Agachamento', value: 'agachamento' },
  { name: 'AVDs', value: 'avds' },
  { name: 'AIVDs', value: 'aivds' },
];

export const ExerciciosFuncionaisForm = ({
  register,
  setValue,
  watch,
}: ExerciciosFuncionaisFormProps) => {
  const selected = watch('treinamento_funcional') || {};

  const handleCheckboxChange = (exerciseValue: string, checked: boolean) => {
    const updatedExercises = { ...selected };
    if (checked) {
      updatedExercises[exerciseValue] =
        exerciseValue === 'avds' || exerciseValue === 'aivds'
          ? { descricao: '' }
          : { carga: '', series_repeticoes: '' };
    } else {
      delete updatedExercises[exerciseValue];
    }
    setValue('treinamento_funcional', updatedExercises);
  };

  return (
    <div className="space-y-4">
      {functionalExercises.map(exercise => {
        const isChecked = Boolean(selected[exercise.value]);
        const isAVD = exercise.value === 'avds' || exercise.value === 'aivds';

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
              <div className="ml-6">
                {isAVD ? (
                  <div>
                    <Label htmlFor={`${exercise.value}_descricao`}>
                      Descrição
                    </Label>
                    <Input
                      id={`${exercise.value}_descricao`}
                      {...register(
                        `treinamento_funcional.${exercise.value}.descricao`
                      )}
                      className="w-full"
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`${exercise.value}_carga`}>Carga</Label>
                      <Input
                        id={`${exercise.value}_carga`}
                        placeholder="Ex: 5kg"
                        {...register(
                          `treinamento_funcional.${exercise.value}.carga`
                        )}
                        onChange={e => {
                          const masked = maskCarga(e.target.value);
                          setValue(
                            `treinamento_funcional.${exercise.value}.carga`,
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
                          `treinamento_funcional.${exercise.value}.series_repeticoes`
                        )}
                        onChange={e => {
                          const masked = maskSeriesRepeticoes(e.target.value);
                          setValue(
                            `treinamento_funcional.${exercise.value}.series_repeticoes`,
                            masked
                          );
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
