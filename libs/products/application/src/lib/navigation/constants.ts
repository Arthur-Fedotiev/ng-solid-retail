const ROOT_ROUTE = '/products';

export const ROUTES = {
  display: () => `${ROOT_ROUTE}/display`,
  details: (id: string) => `${ROOT_ROUTE}/${id}`,
} as const;
