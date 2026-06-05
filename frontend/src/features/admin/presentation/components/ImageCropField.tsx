import { Button } from '@/core/components/ui/button';
import { FieldError } from '@/core/components/ui/field';
import { cn } from '@/core/utils/cn';
import { toAssetUrl } from '@/core/utils/asset-url';
import { Crop, Image as ImageIcon, Loader2, Upload, X } from 'lucide-react';
import { useRef, useState } from 'react';
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import { useUploadImage } from '../../domain/hooks/upload.hook';
import type { CropFieldTab } from './crop-tabs';
import ImageCropperModal, { type CropTabConfig } from './ImageCropperModal';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: string;
  tabs: CropFieldTab[];
  invalid?: boolean;
  error?: string;
  disabled?: boolean;
}

export default function ImageCropField<T extends FieldValues>({
  control,
  name,
  tabs,
  invalid,
  error,
  disabled,
}: Props<T>) {
  const source = useController({
    control,
    name: `${name}.imgSource` as Path<T>,
  });
  const img = useController({ control, name: `${name}.img` as Path<T> });
  const imgCarousel = useController({
    control,
    name: `${name}.imgCarousel` as Path<T>,
  });
  const imgThumbnail = useController({
    control,
    name: `${name}.imgThumbnail` as Path<T>,
  });

  const fieldControllers = {
    img,
    imgCarousel,
    imgThumbnail,
  } as const;

  const upload = useUploadImage();
  const inputRef = useRef<HTMLInputElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState<string | null>(null);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const isLoading = upload.isPending;
  const isInvalid = invalid || !!uploadError || !!error;

  const previewValue =
    (fieldControllers[tabs[0].field].field.value as string) ||
    (source.field.value as string);
  const previewSrc = previewValue ? toAssetUrl(previewValue) : null;

  const cleanupObjectUrl = () => {
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      setObjectUrl(null);
    }
  };

  const handlePick = () => inputRef.current?.click();

  const handleFile = async (file: File) => {
    setUploadError(null);
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setUploadError('Format non supporté. Formats acceptés : jpg, png, webp.');
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setUploadError('Fichier trop volumineux (max 5 MB).');
      return;
    }
    try {
      const { url } = await upload.mutateAsync(file);
      source.field.onChange(url);
      cleanupObjectUrl();
      const localUrl = URL.createObjectURL(file);
      setObjectUrl(localUrl);
      setModalSource(localUrl);
      setModalOpen(true);
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : 'Upload échoué');
    }
  };

  const handleRecrop = () => {
    const src = source.field.value as string;
    if (!src) return;
    setModalSource(toAssetUrl(src));
    setModalOpen(true);
  };

  const handleConfirm = async (results: Record<string, Blob>) => {
    setUploadError(null);
    try {
      await Promise.all(
        tabs.map(async (tab) => {
          const blob = results[tab.key];
          if (!blob) return;
          const file = new File([blob], `${tab.key}.webp`, {
            type: 'image/webp',
          });
          const { url } = await upload.mutateAsync(file);
          fieldControllers[tab.field].field.onChange(url);
        }),
      );
      setModalOpen(false);
      cleanupObjectUrl();
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : 'Upload échoué');
    }
  };

  const handleCancel = () => {
    setModalOpen(false);
    cleanupObjectUrl();
  };

  const handleRemove = () => {
    source.field.onChange('');
    img.field.onChange('');
    imgCarousel.field.onChange('');
    imgThumbnail.field.onChange('');
    setUploadError(null);
    cleanupObjectUrl();
    if (inputRef.current) inputRef.current.value = '';
  };

  const modalTabs: CropTabConfig[] = tabs.map((t) => ({
    key: t.key,
    label: t.label,
    aspect: t.aspect,
  }));

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
            isInvalid ? 'border-red-400' : 'border-[#c6c6c6]',
          )}
        >
          <img
            src={previewSrc}
            alt="Aperçu"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 hidden items-center justify-center gap-2 bg-black/50 group-hover:flex">
            <Button
              type="button"
              size="xs"
              onClick={handleRecrop}
              disabled={disabled || isLoading || !source.field.value}
              className="bg-white text-[var(--lga-ink)] hover:opacity-85"
            >
              <Crop className="h-3.5 w-3.5" strokeWidth={1.5} />
              Recadrer
            </Button>
            <Button
              type="button"
              size="xs"
              onClick={handlePick}
              disabled={disabled || isLoading}
              className="bg-white text-[var(--lga-ink)] hover:opacity-85"
            >
              <Upload className="h-3.5 w-3.5" strokeWidth={1.5} />
              Remplacer
            </Button>
            <Button
              type="button"
              size="xs"
              variant="secondary"
              onClick={handleRemove}
              disabled={disabled || isLoading}
              className="border-white bg-transparent text-white hover:opacity-85"
            >
              <X className="h-3.5 w-3.5" strokeWidth={1.5} />
              Retirer
            </Button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={handlePick}
          disabled={disabled || isLoading}
          className={cn(
            'flex aspect-[16/10] w-full flex-col items-center justify-center gap-3 border border-dashed bg-[var(--lga-surface)] text-[var(--lga-muted)] transition-colors hover:border-[var(--lga-ink)] hover:text-[var(--lga-ink)] disabled:cursor-not-allowed disabled:opacity-50',
            isInvalid ? 'border-red-400' : 'border-[#c6c6c6]',
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

      {uploadError || error ? (
        <FieldError>{uploadError ?? error}</FieldError>
      ) : null}

      {modalOpen && modalSource ? (
        <ImageCropperModal
          open={modalOpen}
          source={modalSource}
          tabs={modalTabs}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      ) : null}
    </div>
  );
}
