import { render, fireEvent, screen } from '@testing-library/react';
import DataGridPagination from '.';

describe('DataGridPagination', () => {
  it('should update currentPage state and call onChange function correctly', () => {
    const onChange = jest.fn();
    render(
      <DataGridPagination
        count={10}
        page={1}
        onChange={onChange}
      />
    );

    const nextPageButton = screen.getByLabelText('Go to next page');
    fireEvent.click(nextPageButton);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(2);
  });
});
