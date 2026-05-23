const routes = {
  home: '/',
  prestations: '/prestations',
  contact: '/contact',
  projetsList: '/projets',
  projets: (slug: string) => `/projets/${slug}`,
  adminLogin: '/admin/login',
  admin: '/admin',
  adminProjetNew: '/admin/projets/nouveau',
  adminProjetEdit: (id: string) => `/admin/projets/${id}/modifier`,
};

export default routes;
