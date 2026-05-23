import { ApiError } from '@/core/errors/api.error';
import { getAccessToken } from '@/core/local/storage';

interface UploadResponse {
  url: string;
}

export async function uploadImage(
  endpoint: string,
  file: File,
): Promise<UploadResponse> {
  const token = getAccessToken();
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });

  if (!response.ok) {
    const json = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;
    throw new ApiError(json?.message ?? 'Upload échoué', response.status);
  }

  return response.json() as Promise<UploadResponse>;
}
