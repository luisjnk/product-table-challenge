// ProductPage.test.js
import '@testing-library/jest-dom/extend-expect'; // Import this line at the top of your test file

import React from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import ProductPageWithContextProvider from '../products-page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProductContextProvider } from '../products-context';
import ProductHTTP from '../../../core/services/product/product-http-service';
import fetchMock from 'fetch-mock';
jest.mock('node-fetch', () => require('fetch-mock-jest').sandbox());

const queryClient = new QueryClient();

const mockProducts = [
  {
    id: 80,
    isFavorite: true,
    productName: 'Carbonell 04 botella 1L',
    retailerName: 'Amazon ES',
    totalPrice: null,
    stockInfo: 'OutOfStock',
    priceCurrency: 'EUR',
  },
];

const mockApiResponse = {
  data: mockProducts,
  totalPages: 1,
  totalElements: 1,
  isLast: false,
  isFirst: false,
  pageSize: 10,
  page: 1,
  isEmpty: false,
};

const mockApiResponseEmpty = {
  data: [],
  totalPages: 0,
  totalElements: 0,
};

describe('ProductPage', () => {
  beforeEach(() => {
    fetchMock.resetBehavior();
  });

  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
    fetchMock.resetHistory();
    jest.clearAllMocks();

    cleanup(); // Clear the screen after each test
  });

  test('Should render Loading component', () => {
    fetchMock.mock('https://orders-api.qa.shalion.com/v1/offers?page=1&pageSize=10', mockApiResponseEmpty);
    render(
      <QueryClientProvider client={queryClient}>
        <ProductPageWithContextProvider initialCurrentPage={1} initialPageSize={10} />
      </QueryClientProvider>,
    );

    act(async () => {
      await waitFor(() => screen.getByText('Loading...'));

      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  test('Should render the table with Carbonell 04 botella 1L record', () => {
    fetchMock.mock('https://orders-api.qa.shalion.com/v1/offers?page=0&pageSize=10', mockApiResponse);
    render(
      <QueryClientProvider client={queryClient}>
        <ProductPageWithContextProvider initialCurrentPage={0} initialPageSize={10} />
      </QueryClientProvider>,
    );

    act(async () => {
      await waitFor(() => screen.getByTestId('table-cell'));

      expect(screen.getByTestId('table-cell')).toHaveTextContent('Carbonell 04 botella 1L');
    });
  });

  test('Should render the error component', () => {
    fetchMock.mock('https://orders-api.qa.shalion.com/v1/offers?page=2&pageSize=10', 500);

    render(
      <QueryClientProvider client={queryClient}>
        <ProductPageWithContextProvider initialCurrentPage={0} initialPageSize={10} />
      </QueryClientProvider>,
    );

    act(async () => {
      await waitFor(() => screen.getByTestId('table-cell'));

      expect(screen.getByTestId('error-component')).toBeInTheDocument();
    });
  });
});

const renderProductPage = (initialCurrentPage = 1, initialPageSize = 10) => {
  const queryClient = new QueryClient();
  queryClient.setQueryData(['todos'], { apiResponse: mockApiResponse });

  render(
    <QueryClientProvider client={queryClient}>
      <ProductContextProvider initialCurrentPage={initialCurrentPage} initialPageSize={initialPageSize}>
        <ProductPageWithContextProvider initialCurrentPage={initialCurrentPage} initialPageSize={initialPageSize} />
      </ProductContextProvider>
    </QueryClientProvider>,
  );
};
