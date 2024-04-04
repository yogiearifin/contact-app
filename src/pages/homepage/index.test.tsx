import { render, screen, waitFor } from '@testing-library/react';
import { Homepage } from './index';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { BrowserRouter } from 'react-router-dom';

const MockHomepage = () => {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Homepage />
      </BrowserRouter>
    </Provider>
  );
};

it('should render homepage', () => {
  render(<MockHomepage />);
  const home = screen.getByTestId('homepage');
  expect(home).toBeVisible();
});


