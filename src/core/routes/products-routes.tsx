import React from 'react';
import { RouteObject } from 'react-router-dom';
import ProductPage from '../../pages/products/products-page';

const getProductPage = () => {
  const acceptQueryParameters = !process.env.REACT_APP_ACCCEPT_QUERY_PARAMETERS;

  if (acceptQueryParameters)   {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const page = urlParams.get('page') || 0;
    const pageSize = urlParams.get('pageSize') || 10;

    return <ProductPage initialCurrentPage={Number(page)} initialPageSize={Number(pageSize)} acceptQueryParameters={acceptQueryParameters} />;
  }

  return <ProductPage initialCurrentPage={0} initialPageSize={10} />;
};
const routeObject: RouteObject[] = [
  {
    path: '/',
    element: getProductPage(),
  },
  {
    path: '/products',
    element: getProductPage(),
  },
];
export default routeObject;
