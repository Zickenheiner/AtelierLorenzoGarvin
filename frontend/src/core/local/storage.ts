import secureLocalStorage from 'react-secure-storage';

const isBrowser = !import.meta.env.SSR && typeof window !== 'undefined';

const getAccessToken = () => {
  if (!isBrowser) return null;
  return secureLocalStorage.getItem('accessToken');
};

const getRefreshToken = () => {
  if (!isBrowser) return null;
  return secureLocalStorage.getItem('refreshToken');
};

const setAccessToken = (token: string) => {
  if (!isBrowser) return;
  secureLocalStorage.setItem('accessToken', token);
};

const setRefreshToken = (token: string) => {
  if (!isBrowser) return;
  secureLocalStorage.setItem('refreshToken', token);
};

const removeAccessToken = () => {
  if (!isBrowser) return;
  secureLocalStorage.removeItem('accessToken');
};

const removeRefreshToken = () => {
  if (!isBrowser) return;
  secureLocalStorage.removeItem('refreshToken');
};

const clearTokens = () => {
  removeAccessToken();
  removeRefreshToken();
};

export {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  clearTokens,
};
