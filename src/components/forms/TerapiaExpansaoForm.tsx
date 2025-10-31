import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { maskCarga, maskSeriesRepeticoes } from '@/lib/masks';

interface TerapiaExpansaoFormProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
}

const terapiaExpansao = [
  { name: 'EPAP válvula', value: 'epap_valvula' },
  { name: 'EPAP artesanal', value: 'epap_artesanal' },
  { name: 'VNI', value: 'vni' },
  { name: 'RTA', value: 'rta' },
];

export const TerapiaExpansaoForm = ({
  register,
  setValue,
  watch,
}: TerapiaExpansaoFormProps) => {
  const selected = watch('terapia_expansao') || {};

  const handleCheckboxChange = (exerciseValue: string, checked: boolean) => {
    const updatedTerapia = { ...selected };
    if (checked) {
      updatedTerapia[exerciseValue] = {
        carga: '',
        series_repeticoes: '',
        parametros: '',
        manuseios: '',
      };
    } else {
      delete updatedTerapia[exerciseValue];
    }
    setValue('terapia_expansao', updatedTerapia);
  };

  return (
    <div className="space-y-4">
      {terapiaExpansao.map(exercise => {
        const isChecked = Boolean(selected[exercise.value]);
        const isVNI = exercise.value === 'vni';
        const isRTA = exercise.value === 'rta';

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
                {isVNI ? (
                  <div>
                    <Label htmlFor={`${exercise.value}_parametros`}>
                      Parâmetros Ventilatórios
                    </Label>
                    <Input
                      id={`${exercise.value}_parametros`}
                      {...register(
                        `terapia_expansao.${exercise.value}.parametros`
                      )}
                      className="w-full"
                    />
                  </div>
                ) : isRTA ? (
                  <div>
                    <Label htmlFor={`${exercise.value}_manuseios`}>
                      Manuseios
                    </Label>
                    <Input
                      id={`${exercise.value}_manuseios`}
                      {...register(
                        `terapia_expansao.${exercise.value}.manuseios`
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
                          `terapia_expansao.${exercise.value}.carga`
                        )}
                        onChange={e => {
                          const masked = maskCarga(e.target.value);
                          setValue(
                            `terapia_expansao.${exercise.value}.carga`,
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
                          `terapia_expansao.${exercise.value}.series_repeticoes`
                        )}
                        onChange={e => {
                          const masked = maskSeriesRepeticoes(e.target.value);
                          setValue(
                            `terapia_expansao.${exercise.value}.series_repeticoes`,
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
