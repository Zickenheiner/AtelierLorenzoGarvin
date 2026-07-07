const routes = {
  home: '/',
  atelier: '/atelier',
  prestations: '/prestations',
  contact: '/contact',
  realisationsList: '/realisations',
  realisations: (slug: string) => `/realisations/${slug}`,
  adminLogin: '/admin/login',
  admin: '/admin',
  adminProjetNew: '/admin/projets/nouveau',
  adminProjetEdit: (id: string) => `/admin/projets/${id}/modifier`,
};

export default routes;
