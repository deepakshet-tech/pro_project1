export const ROUTE_PATHS = {
  home: "/",
  products: "/products",
  detail: "/product-details",
  rx: "/upload-prescription",
  packages: "/packages",
  blog: "/blog",
  contact: "/contact",
};

export function pageFromPath(pathname) {
  if (pathname.startsWith(ROUTE_PATHS.products)) return "products";
  if (pathname.startsWith(ROUTE_PATHS.detail)) return "detail";
  if (pathname.startsWith(ROUTE_PATHS.rx)) return "rx";
  if (pathname.startsWith(ROUTE_PATHS.packages)) return "packages";
  if (pathname.startsWith(ROUTE_PATHS.blog)) return "blog";
  if (pathname.startsWith(ROUTE_PATHS.contact)) return "contact";
  return "home";
}
