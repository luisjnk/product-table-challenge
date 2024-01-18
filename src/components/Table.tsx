import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react';

export type TableItems<TData> = {
  data: TData;
};

interface IProps<T> {
  items: T[];
  columns: GridColDef[];
  totalPages: number;
  currentPage: number;
  pageSize: number;
  onNextTable({ nextPage }: { nextPage: number }): void;
}

const Table = <T extends object>(props: IProps<T>) => {
  return (
    <div data-testid='table-cell'>
      <DataGrid
        rows={props.items}
        columns={props.columns}
        paginationMode={'server'}
        pagination={true}
        rowCount={props.totalPages}
        pageSizeOptions={[props.pageSize]}
        paginationModel={{ page: props.currentPage, pageSize: props.pageSize }}
        onPaginationModelChange={(model, details) => {
          const page = model.page;
          props.onNextTable({ nextPage: page } as { nextPage: number });
        }}
      />
    </div>
  );
};

export default Table;
