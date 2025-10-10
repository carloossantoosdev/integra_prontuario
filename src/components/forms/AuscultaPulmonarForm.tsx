import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Controller } from 'react-hook-form';

interface AuscultaPulmonarFormProps {
  control: any;
}

const localizacoes = [
  { label: 'AHT', value: 'AHT' },
  { label: 'Base', value: 'base' },
  { label: 'Direita', value: 'direita' },
  { label: 'Esquerda', value: 'esquerda' },
  { label: 'Ápice', value: 'Apice' },
];

const mvOptions = [
  { label: 'Abolido', value: 'abolido' },
  { label: 'Presente', value: 'presente' },
  { label: 'Reduzido', value: 'reduzido' },
];

const ruidosOptions = [
  { label: 'Espástica', value: 'espastica' },
  { label: 'Estertores', value: 'estertores' },
  { label: 'Estridor', value: 'estridor' },
  { label: 'Roncos', value: 'roncos' },
  { label: 'Sibilos Expiratórios', value: 'sibilos expiratorios' },
  { label: 'Sibilos Inspiratórios', value: 'sibilos inspiratorios' },
];

export function AuscultaPulmonarForm({ control }: AuscultaPulmonarFormProps) {
  return (
    <div className="space-y-4">
      {/* Localização */}
      <div>
        <Label className="text-base font-semibold mb-3 block">
          Localização
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {localizacoes.map(({ label, value }) => (
            <div
              key={value}
              className="flex items-center space-x-2"
            >
              <Controller
                name={`ausculta_pulmonar.localizacao.${value}`}
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <Checkbox
                    id={`localizacao_${value}`}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label
                htmlFor={`localizacao_${value}`}
                className="font-normal cursor-pointer"
              >
                {label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* MV (Murmúrio Vesicular) */}
      <div>
        <Label className="text-base font-semibold mb-3 block">
          Murmúrio Vesicular (MV)
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {mvOptions.map(({ label, value }) => (
            <div
              key={value}
              className="flex items-center space-x-2"
            >
              <Controller
                name={`ausculta_pulmonar.mv.${value}`}
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <Checkbox
                    id={`mv_${value}`}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label
                htmlFor={`mv_${value}`}
                className="font-normal cursor-pointer"
              >
                {label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Ruídos */}
      <div>
        <Label className="text-base font-semibold mb-3 block">Ruídos</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {ruidosOptions.map(({ label, value }) => (
            <div
              key={value}
              className="flex items-center space-x-2"
            >
              <Controller
                name={`ausculta_pulmonar.ruidos.${value}`}
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <Checkbox
                    id={`ruidos_${value}`}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label
                htmlFor={`ruidos_${value}`}
                className="font-normal cursor-pointer"
              >
                {label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
