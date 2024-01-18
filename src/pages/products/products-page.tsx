import React from 'react';
import { useContext, useEffect } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductHTTP from '../../core/services/product/product-http-service';
import { asProductArray, Product } from '../../core/services/product/product';
import { GridColDef } from '@mui/x-data-grid';
import Table from '../../components/Table';
import ProductContext, { ProductContextProvider } from './products-context';
import ErrorComponent from '../../components/ErrorComponent';
import LoadingComponent from '../../components/LoadingComponent';
import { useNavigate } from 'react-router-dom';

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductContextProvider');
  }
  return context;
};

const queryClient = new QueryClient();

function ProductsTable({ products, totalPages, acceptQueryParameters }: { products: Product[]; totalPages: number; acceptQueryParameters?: boolean }) {
  const { handleCurrentPage, currentPage, currentPageSize } = useProductContext();
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'productName', headerName: 'Product Name', width: 400 },
    { field: 'retailerName', headerName: 'Retailer Name' },
    { field: 'totalPrice', headerName: 'Price' },
    { field: 'priceCurrency', headerName: 'Currency' },
    { field: 'stockInfo', headerName: 'Sotck Info' },
  ];

  const changeUrlByQueryParameters = ({ nextPage }: { nextPage: number }) => {
    const query = `?pageSize=${currentPageSize}&page=${nextPage + 1}`;
    navigate({
      pathname: '/',
      search: query,
    });
  };

  const onNextTable = ({ nextPage }: { nextPage: number }) => {
    acceptQueryParameters && changeUrlByQueryParameters({ nextPage: nextPage });

    handleCurrentPage({ newPage: nextPage });
  };
  return <Table onNextTable={onNextTable} items={products} columns={columns} totalPages={totalPages} currentPage={currentPage} pageSize={currentPageSize} />;
}

function ProductTableWrapper({ acceptQueryParameters }: { acceptQueryParameters?: boolean }) {
  const { currentPage, currentPageSize } = useProductContext();
  const { getProducts } = ProductHTTP();
  const query = useQuery({ queryKey: ['productsQuery'], queryFn: async () => await getProducts({ page: currentPage, pageSize: currentPageSize }) });

  useEffect(() => {
    query.refetch();
  }, [currentPage, currentPageSize, query]);

  const handleRetry = () => {
    query.refetch();
  };

  if (query.isSuccess && !query.isLoading) {
    const apiResponse = query.data?.apiResponse;
    const products = apiResponse && asProductArray(apiResponse.data);
    const totalPages = apiResponse && apiResponse.totalPages;

    return (
      <QueryClientProvider client={queryClient}>
        {query.isSuccess && <ProductsTable acceptQueryParameters={acceptQueryParameters} totalPages={totalPages} products={products} />}
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      {query.isLoading && <LoadingComponent />}
      {query.isError && <ErrorComponent message='An error occurred while searching' onRetry={handleRetry} />}
    </QueryClientProvider>
  );
}

function ProductPage({ acceptQueryParameters }: { acceptQueryParameters?: boolean }) {
  const { currentPage } = useProductContext();
  return <div className='App'>{currentPage >= 0 && <ProductTableWrapper acceptQueryParameters={acceptQueryParameters} />}</div>;
}

export default function ProductPageWithContextProvider({
  initialCurrentPage,
  initialPageSize,
  acceptQueryParameters,
}: {
  acceptQueryParameters?: boolean;
  initialCurrentPage: number;
  initialPageSize: number;
}) {
  return (
    <ProductContextProvider initialCurrentPage={initialCurrentPage} initialPageSize={initialPageSize}>
      <ProductPage acceptQueryParameters={acceptQueryParameters} />
    </ProductContextProvider>
  );
}
