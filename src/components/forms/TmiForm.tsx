import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { maskCarga, maskSeriesRepeticoes } from '@/lib/masks';

interface TmiFormProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
}

export const TmiForm = ({ register, setValue, watch }: TmiFormProps) => {
  const selected = watch('tmi') || {};
  const isChecked = Boolean(selected.intensidade);

  const handleCheckboxChange = (checked: boolean) => {
    const updatedTmi = { ...selected };
    if (checked) {
      updatedTmi.intensidade = {
        tipo: '',
        carga: '',
        series_repeticoes: '',
        repeticoes_tempo: '',
      };
    } else {
      delete updatedTmi.intensidade;
    }
    setValue('tmi', updatedTmi);
  };

  return (
    <div className="space-y-6">
      {/* Tipo de TMI */}
      <div>
        <Label className="text-base font-semibold mb-3 block">Tipo</Label>
        <RadioGroup defaultValue="">
          <div className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="fortalecimento"
                id="tmi_fortalecimento"
                {...register('tmi.intensidade.tipo')}
              />
              <Label
                htmlFor="tmi_fortalecimento"
                className="font-normal cursor-pointer"
              >
                Fortalecimento
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="resistencia"
                id="tmi_resistencia"
                {...register('tmi.intensidade.tipo')}
              />
              <Label
                htmlFor="tmi_resistencia"
                className="font-normal cursor-pointer"
              >
                Resistência
              </Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Checkbox para Intensidade */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="tmi_intensidade"
            checked={isChecked}
            onCheckedChange={checked =>
              handleCheckboxChange(checked as boolean)
            }
          />
          <Label
            htmlFor="tmi_intensidade"
            className="font-medium cursor-pointer"
          >
            Intensidade
          </Label>
        </div>

        {isChecked && (
          <div className="ml-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="tmi_carga">Carga</Label>
              <Input
                id="tmi_carga"
                placeholder="Ex: 30 cmH2O ou nível 3"
                {...register('tmi.intensidade.carga')}
                onChange={e => {
                  const masked = maskCarga(e.target.value);
                  setValue('tmi.intensidade.carga', masked);
                }}
              />
            </div>
            <div>
              <Label htmlFor="tmi_series">Séries</Label>
              <Input
                id="tmi_series"
                placeholder="Ex: 3/10"
                {...register('tmi.intensidade.series_repeticoes')}
                onChange={e => {
                  const masked = maskSeriesRepeticoes(e.target.value);
                  setValue('tmi.intensidade.series_repeticoes', masked);
                }}
              />
            </div>
            <div>
              <Label htmlFor="tmi_repeticoes">Repetições/Tempo</Label>
              <Input
                id="tmi_repeticoes"
                {...register('tmi.intensidade.repeticoes_tempo')}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
