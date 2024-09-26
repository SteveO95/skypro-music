const Routes: {
  BASE: string;
  FAVORITES: string;
  CUSTOMCATALOG: (catalogId: number) => string;
  SIGNIN: string;
  SIGNUP: string;
} = {
  BASE: "/tracks",
  FAVORITES: "/tracks/favorite",
  CUSTOMCATALOG: (catalogId: number) => `/tracks/catalog/${catalogId}`,
  SIGNIN: "/signin",
  SIGNUP: "/signup",
};

export default Routes;
