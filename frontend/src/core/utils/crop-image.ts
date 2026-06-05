export interface PixelCrop {
  x: number;
  y: number;
  width: number;
  height: number;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Impossible de charger l'image"));
    image.src = src;
  });
}

export async function cropToBlob(
  src: string,
  pixelCrop: PixelCrop,
): Promise<Blob> {
  const image = await loadImage(src);
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(pixelCrop.width);
  canvas.height = Math.round(pixelCrop.height);

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas non supporté par le navigateur');

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) =>
        blob
          ? resolve(blob)
          : reject(new Error('Échec de génération du recadrage')),
      'image/webp',
      0.9,
    );
  });
}

export function getImageDimensions(
  src: string,
): Promise<{ width: number; height: number }> {
  return loadImage(src).then((image) => ({
    width: image.naturalWidth,
    height: image.naturalHeight,
  }));
}

export function centeredCrop(
  naturalWidth: number,
  naturalHeight: number,
  aspect: number,
): PixelCrop {
  const imageAspect = naturalWidth / naturalHeight;
  let width: number;
  let height: number;
  if (imageAspect > aspect) {
    height = naturalHeight;
    width = height * aspect;
  } else {
    width = naturalWidth;
    height = width / aspect;
  }
  return {
    x: (naturalWidth - width) / 2,
    y: (naturalHeight - height) / 2,
    width,
    height,
  };
}
