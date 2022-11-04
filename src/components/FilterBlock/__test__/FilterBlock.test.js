import { screen } from '@testing-library/react';
import renderWithStore from '../../../renderWithStore/renderWithStore';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import FilterBlock from '../FilterBlock';

describe('Component: FilterBlock', () => {
  test('renders heading correct', () => {
    renderWithStore(<FilterBlock />);
    const inputElement = screen.getByPlaceholderText(/Search product.../i);
    expect(inputElement).toBeInTheDocument();
  });
});
