const endpoints = {
  auth: {
    login: '/auth/login',
    refresh: '/auth/refresh',
    logout: '/auth/logout',
    me: '/auth/me',
  },
  projects: {
    list: '/projects',
    bySlug: (slug: string) => `/projects/slug/${slug}`,
    byId: (id: string) => `/projects/${id}`,
  },
  uploads: '/uploads',
};

export default endpoints;
