export type Product = {
  id: number;
  isFavorite: boolean;
  priceCurrency: string;
  productName: string;
  retailerName: string;
  stockInfo: string;
  totalPrice: number;
};

export type GetProductsResponse = {
  data: Product[];
  isEmpty: boolean;
  isFirst: boolean;
  isLast: boolean;
  page: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
};

export const asProductArray = (content: unknown) => content as Product[];
