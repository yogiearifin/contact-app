import { render, screen, waitFor } from '@testing-library/react';
import { CreateContact } from './index';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { BrowserRouter } from 'react-router-dom';

const MockCreateContact = () => {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <CreateContact />
      </BrowserRouter>
    </Provider>
  );
};

it('should render create contact page', () => {
  render(<MockCreateContact />);
  const createContactPage = screen.getByTestId('create-contact');
  expect(createContactPage).toBeVisible();
});

it('should render create contact form', () => {
  render(<MockCreateContact />);
  const form = screen.getByTestId('create-contact-form');
  expect(form).toBeVisible();
});


