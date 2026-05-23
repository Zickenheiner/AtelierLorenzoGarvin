import { toAssetUrl } from '@/core/utils/asset-url';
import { cn } from '@/core/utils/cn';
import { Image as ImageIcon, Loader2, Upload, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { useUploadImage } from '../../domain/hooks/upload.hook';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

interface Props {
  value: string;
  onChange: (url: string) => void;
  invalid?: boolean;
  disabled?: boolean;
}

export default function ImageUploadField({
  value,
  onChange,
  invalid,
  disabled,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const upload = useUploadImage();
  const [localError, setLocalError] = useState<string | null>(null);

  const previewSrc = value ? toAssetUrl(value) : null;

  const handlePick = () => inputRef.current?.click();

  const handleFile = async (file: File) => {
    setLocalError(null);

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setLocalError('Format non supporté. Formats acceptés : jpg, png, webp.');
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setLocalError('Fichier trop volumineux (max 5 MB).');
      return;
    }

    try {
      const { url } = await upload.mutateAsync(file);
      onChange(url);
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'Upload échoué');
    }
  };

  const handleRemove = () => {
    onChange('');
    setLocalError(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const errorMessage = localError;
  const isLoading = upload.isPending;

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(',')}
        className="hidden"
        disabled={disabled || isLoading}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFile(file);
        }}
      />

      {previewSrc ? (
        <div
          className={cn(
            'group relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden border bg-[var(--lga-surface)]',
            invalid || errorMessage ? 'border-red-400' : 'border-[#c6c6c6]',
          )}
        >
          <img
            src={previewSrc}
            alt="Aperçu"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 hidden items-center justify-center gap-2 bg-black/50 group-hover:flex">
            <button
              type="button"
              onClick={handlePick}
              disabled={disabled || isLoading}
              className="inline-flex h-[36px] items-center gap-2 bg-white px-4 text-[10px] tracking-[0.2em] text-[var(--lga-ink)] uppercase transition-opacity hover:opacity-85 disabled:opacity-50"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}
            >
              <Upload className="h-3.5 w-3.5" strokeWidth={1.5} />
              Remplacer
            </button>
            <button
              type="button"
              onClick={handleRemove}
              disabled={disabled || isLoading}
              className="inline-flex h-[36px] items-center gap-2 border border-white px-4 text-[10px] tracking-[0.2em] text-white uppercase transition-opacity hover:opacity-85 disabled:opacity-50"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}
            >
              <X className="h-3.5 w-3.5" strokeWidth={1.5} />
              Retirer
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={handlePick}
          disabled={disabled || isLoading}
          className={cn(
            'flex aspect-[16/10] w-full flex-col items-center justify-center gap-3 border border-dashed bg-[var(--lga-surface)] text-[var(--lga-muted)] transition-colors hover:border-[var(--lga-ink)] hover:text-[var(--lga-ink)] disabled:cursor-not-allowed disabled:opacity-50',
            invalid || errorMessage ? 'border-red-400' : 'border-[#c6c6c6]',
          )}
        >
          {isLoading ? (
            <Loader2 className="h-6 w-6 animate-spin" strokeWidth={1.5} />
          ) : (
            <>
              <ImageIcon className="h-6 w-6" strokeWidth={1.5} />
              <span
                className="text-[11px] tracking-[0.2em] uppercase"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}
              >
                Choisir une image
              </span>
              <span
                className="text-[10px] text-[var(--lga-muted)]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                jpg, png, webp — max 5 MB
              </span>
            </>
          )}
        </button>
      )}

      {errorMessage ? (
        <span className="text-[12px] text-red-500">{errorMessage}</span>
      ) : null}
    </div>
  );
}
