import { Button } from '@/core/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/core/components/ui/dialog';
import {
  centeredCrop,
  cropToBlob,
  getImageDimensions,
} from '@/core/utils/crop-image';
import { cn } from '@/core/utils/cn';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import Cropper, { type Area } from 'react-easy-crop';

export interface CropTabConfig {
  key: string;
  label: string;
  aspect: number;
}

interface Props {
  open: boolean;
  source: string;
  tabs: CropTabConfig[];
  onCancel: () => void;
  onConfirm: (results: Record<string, Blob>) => Promise<void> | void;
}

export default function ImageCropperModal({
  open,
  source,
  tabs,
  onCancel,
  onConfirm,
}: Props) {
  const [activeKey, setActiveKey] = useState(tabs[0].key);
  const [crop, setCrop] = useState<Record<string, { x: number; y: number }>>(
    {},
  );
  const [zoom, setZoom] = useState<Record<string, number>>({});
  const [areas, setAreas] = useState<Record<string, Area>>({});
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeTab = tabs.find((t) => t.key === activeKey) ?? tabs[0];

  useEffect(() => {
    let cancelled = false;
    getImageDimensions(source)
      .then((dims) => {
        if (cancelled) return;
        const initial: Record<string, Area> = {};
        for (const tab of tabs) {
          initial[tab.key] = centeredCrop(dims.width, dims.height, tab.aspect);
        }
        setAreas(initial);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [source]);

  const handleConfirm = async () => {
    setError(null);
    setConfirming(true);
    try {
      const results: Record<string, Blob> = {};
      for (const tab of tabs) {
        const area = areas[tab.key];
        if (!area) continue;
        results[tab.key] = await cropToBlob(source, area);
      }
      await onConfirm(results);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Échec du recadrage');
    } finally {
      setConfirming(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o && !confirming) onCancel();
      }}
    >
      <DialogContent className="max-w-[640px]">
        <DialogHeader>
          <DialogTitle>Recadrer l&rsquo;image</DialogTitle>
        </DialogHeader>

        {tabs.length > 1 ? (
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveKey(tab.key)}
                className={cn(
                  'border px-3 py-1.5 text-[11px] tracking-[0.15em] uppercase transition-colors',
                  tab.key === activeKey
                    ? 'border-[var(--lga-ink)] bg-[var(--lga-ink)] text-white'
                    : 'border-[#c6c6c6] text-[var(--lga-muted)] hover:text-[var(--lga-ink)]',
                )}
                style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        ) : null}

        <div className="relative h-[360px] w-full bg-black">
          <Cropper
            image={source}
            crop={crop[activeKey] ?? { x: 0, y: 0 }}
            zoom={zoom[activeKey] ?? 1}
            aspect={activeTab.aspect}
            onCropChange={(value) =>
              setCrop((prev) => ({ ...prev, [activeKey]: value }))
            }
            onZoomChange={(value) =>
              setZoom((prev) => ({ ...prev, [activeKey]: value }))
            }
            onCropComplete={(_, areaPixels) =>
              setAreas((prev) => ({ ...prev, [activeKey]: areaPixels }))
            }
          />
        </div>

        {error ? <p className="text-[12px] text-red-500">{error}</p> : null}

        <DialogFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={confirming}
          >
            Annuler
          </Button>
          <Button type="button" onClick={handleConfirm} disabled={confirming}>
            {confirming ? (
              <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
            ) : null}
            Valider le recadrage
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
