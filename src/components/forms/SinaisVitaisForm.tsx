import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface SinaisVitaisFormProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export const SinaisVitaisForm = ({
  register,
  errors,
}: SinaisVitaisFormProps) => {
  return (
    <div className="space-y-6">
      {/* Sinais Vitais Iniciais */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Sinais Vitais Inicial</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['FC', 'SpO2', 'PA', 'Borg_D', 'Borg_F', 'EVA_Desc'].map(
            fieldName => (
              <div key={`ssvv_inicial.${fieldName}`}>
                <Label htmlFor={`ssvv_inicial.${fieldName}`}>{fieldName}</Label>
                <Input
                  id={`ssvv_inicial.${fieldName}`}
                  type={
                    fieldName === 'SpO2' || fieldName === 'PA'
                      ? 'text'
                      : 'number'
                  }
                  {...register(`ssvv_inicial.${fieldName}`, {
                    required: `${fieldName} é obrigatório`,
                  })}
                />
                {errors.ssvv_inicial?.[fieldName] && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.ssvv_inicial[fieldName]?.message as string}
                  </p>
                )}
              </div>
            )
          )}
        </div>
      </div>

      {/* Sinais Vitais Finais */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Sinais Vitais Final</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['FC', 'SpO2', 'PA', 'Borg_D', 'Borg_F', 'EVA_Desc'].map(
            fieldName => (
              <div key={`ssvv_final.${fieldName}`}>
                <Label htmlFor={`ssvv_final.${fieldName}`}>{fieldName}</Label>
                <Input
                  id={`ssvv_final.${fieldName}`}
                  type={
                    fieldName === 'SpO2' || fieldName === 'PA'
                      ? 'text'
                      : 'number'
                  }
                  {...register(`ssvv_final.${fieldName}`, {
                    required: `${fieldName} é obrigatório`,
                  })}
                />
                {errors.ssvv_final?.[fieldName] && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.ssvv_final[fieldName]?.message as string}
                  </p>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
