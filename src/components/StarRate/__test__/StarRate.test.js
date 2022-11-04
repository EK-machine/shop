import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import StarRate from '../StarRate';

describe('Component: StarRate', () => {
  test('renders the stars', () => {
    render(<StarRate rating={2} />);
    const gold = screen.getAllByTestId('gold');
    const grey = screen.getAllByTestId('grey');
    const stars = [...gold, ...grey];
    expect(stars).toBeTruthy();
  });

  test('renders 5 stars', () => {
    render(<StarRate rating={3} />);
    const gold = screen.getAllByTestId('gold');
    const grey = screen.getAllByTestId('grey');
    const stars = [...gold, ...grey];
    expect(stars.length).toEqual(5);
  });

  test('renders 1 grey and 4 golden stars', () => {
    const num = 4;
    render(<StarRate rating={num} />);
    const gold = screen.getAllByTestId('gold');
    const grey = screen.getAllByTestId('grey');
    expect(gold.length).toEqual(num);
    expect(grey.length).toEqual(1);
  });

  test('it renders correctly (snapshot)', () => {
    const tree = renderer.create(<StarRate rating={5} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
