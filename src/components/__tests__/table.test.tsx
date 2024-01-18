import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { DataGrid } from '@mui/x-data-grid';
import Table from '../Table';

const mockColumns = [
  { field: 'id', headerName: 'ID' },
  { field: 'name', headerName: 'Name' },
  { field: 'price', headerName: 'Price' },
];

const mockItems = [
  { id: 1, name: 'Product 1', price: 20 },
  { id: 2, name: 'Product 2', price: 30 },
];

const mockTotalPages = 3;
const mockCurrentPage = 1;
const mockPageSize = 10;

const mockOnNextTable = jest.fn();

const renderTable = () => {
  render(
    <Table
      items={mockItems}
      columns={mockColumns}
      totalPages={mockTotalPages}
      currentPage={mockCurrentPage}
      pageSize={mockPageSize}
      onNextTable={mockOnNextTable}
    />,
  );
};

describe('Table', () => {
  it('renders the table component', () => {
    renderTable();

    expect(screen.getByTestId('table-cell')).toBeInTheDocument();
    expect(screen.getByRole('grid')).toBeInTheDocument();
    expect(screen.getByRole('row', { name: /id.*name.*price/i })).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  it('renders the DataGrid component', () => {
    renderTable();

    expect(screen.getByRole('grid')).toBeInTheDocument();
    expect(screen.getByRole('row', { name: /id.*name.*price/i })).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  // Add more tests as needed...
});
