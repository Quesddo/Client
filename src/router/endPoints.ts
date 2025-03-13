export const endPoints = {
  GET_PRODUCTS: (): RequestInfo => ({ method: "get", url: "/products" }),
  GET_PRODUCT_BY_ID: (id: Product["id"]): RequestInfo => ({
    method: "get",
    url: `/products/${id}`,
  }),
} as const;
