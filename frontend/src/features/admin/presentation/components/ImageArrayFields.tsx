import { Button } from '@/core/components/ui/button';
import { Field } from '@/core/components/ui/field';
import { Input } from '@/core/components/ui/input';
import { Trash2 } from 'lucide-react';
import {
  type Control,
  type FieldValues,
  type Path,
  type UseFormRegister,
} from 'react-hook-form';
import type { CropFieldTab } from './crop-tabs';
import ImageCropField from './ImageCropField';

type ImageArrayErrors =
  | {
      [idx: number]:
        | { img?: { message?: string }; alt?: { message?: string } }
        | undefined;
    }
  | undefined;

interface ImageArrayFieldsProps<T extends FieldValues> {
  fields: { id: string }[];
  onRemove: (idx: number) => void;
  name: string;
  control: Control<T>;
  register: UseFormRegister<T>;
  errors: ImageArrayErrors;
  tabs: CropFieldTab[];
  placeholderAlt?: string;
  emptyLabel?: string;
}

export default function ImageArrayFields<T extends FieldValues>({
  fields,
  onRemove,
  name,
  control,
  register,
  errors,
  tabs,
  placeholderAlt,
  emptyLabel = 'Aucune entrée.',
}: ImageArrayFieldsProps<T>) {
  if (fields.length === 0) {
    return (
      <p className="text-[12px] text-[var(--lga-muted)] italic">{emptyLabel}</p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {fields.map((field, idx) => (
        <div
          key={field.id}
          className="grid grid-cols-1 gap-3 sm:grid-cols-[280px_1fr_auto] sm:items-end"
        >
          <ImageCropField
            control={control}
            name={`${name}.${idx}`}
            tabs={tabs}
            invalid={!!errors?.[idx]?.img}
            error={errors?.[idx]?.img?.message}
          />
          <Field
            label="Texte alternatif"
            htmlFor={`${name}.${idx}.alt`}
            error={errors?.[idx]?.alt?.message}
          >
            <Input
              id={`${name}.${idx}.alt`}
              placeholder={placeholderAlt}
              {...register(`${name}.${idx}.alt` as Path<T>)}
              aria-invalid={errors?.[idx]?.alt ? 'true' : 'false'}
            />
          </Field>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onRemove(idx)}
            aria-label="Supprimer"
            className="hover:border-red-400 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" strokeWidth={1.5} />
          </Button>
        </div>
      ))}
    </div>
  );
}
