import * as React from 'react';

interface ProductContextInterface {
  currentPage: number;
  handleCurrentPage({ newPage }: { newPage: number }): void;
  currentPageSize: number;
  handleCurrentPageSize({ newPageSize }: { newPageSize: number }): void;
}

const { createContext, useState } = React;
const ProductContext = createContext({} as ProductContextInterface);

export const ProductContextProvider = ({
  children,
  initialCurrentPage,
  initialPageSize,
}: {
  children: any;
  initialCurrentPage: number;
  initialPageSize: number;
}) => {
  const [currentPage, setCurrentPage] = useState(initialCurrentPage);
  const [currentPageSize, setCurrentPageSize] = useState(initialPageSize);

  const handleCurrentPage = ({ newPage }: { newPage: number }) => {
    setCurrentPage(newPage);
  };

  const handleCurrentPageSize = ({ newPageSize }: { newPageSize: number }) => {
    setCurrentPageSize(newPageSize);
  };

  return (
    <ProductContext.Provider
      value={{
        currentPage,
        currentPageSize,
        handleCurrentPage,
        handleCurrentPageSize,
      }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
