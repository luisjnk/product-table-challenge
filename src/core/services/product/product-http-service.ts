import FetchHTTP, { GetResponse } from '../http/fetch-http-service';
import { GetProductsResponse } from './product';

const getProducts = async ({ page, pageSize }: { page: number; pageSize: number }): Promise<GetResponse<GetProductsResponse>> => {
  const url = getProductsPageUrl(page, pageSize);

  try {
    const { get } = FetchHTTP();
    return await get({ url });
  } catch (error) {
    handleHttpError(error);
    throw new Error('Failed to fetch products');
  }
};

const handleHttpError = (error: any) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    console.error('Server responded with an error:', error.response.data);
    throw new Error('Server error');
  } else if (error.request) {
    // The request was made but no response was received
    console.error('No response received:', error.message);
    throw new Error('No response received from the server');
  }
};

const getProductsPageUrl = (page: number, pageSize: number) => `https://orders-api.qa.shalion.com/v1/offers?page=${page}&pageSize=${pageSize}`;

const ProductHTTP = () => {
  return {
    getProducts,
  };
};

export default ProductHTTP;
