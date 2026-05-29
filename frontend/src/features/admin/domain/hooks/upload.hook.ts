import { uploadImage } from '@/core/config/upload';
import endpoints from '@/core/constants/endpoints';
import { useMutation } from '@tanstack/react-query';

export const useUploadImage = () => {
  return useMutation<{ url: string }, Error, File>({
    mutationFn: (file) => uploadImage(endpoints.uploads, file),
  });
};
