import React, { useState } from 'react';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Pagination, PaginationItem, SxProps } from '@mui/material';

const styles: SxProps = {
  backgroundColor: 'transparent',
  color: '#05662B',
  fontFamily: 'Inter !important',
  border: '1px solid #05662B',
  borderRadius: '0',

  

  '&.Mui-selected': {
    backgroundColor: '#05662B',
    color: '#fff',
  },
};

interface DataGridPaginationProps {
  count: number;
  page: number;
  onChange: (page: number) => void;
}

function DataGridPagination({
  count,
  page,
  onChange,
}: DataGridPaginationProps) {
  const [currentPage, setCurrentPage] = useState(page);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    onChange(value);
  };

  return (
    <Pagination
      color="primary"
      count={count}
      page={currentPage}
      data-testid="pagination-test"
      onChange={handleChange}
      renderItem={item => (
        <PaginationItem
          sx={styles}
          components={{ previous: ArrowBack, next: ArrowForward }}
          {...item}
        />
      )}
    />
  );
}

export default DataGridPagination;
