import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

import SignUp from './signup';
import store from '../store'

test('renders the form correctly', () => {
  const user = { email: 'abc@ajackus.com', password: '@Temp1234', name: "Abc Abc" } 
  const { getByText, _} = render(<Provider store={store}><SignUp user={user} /></Provider>);
  const emailLabel = getByText(/Email/i);
  const passwordLabel = getByText(/Password/i);
  const nameLabel = getByText(/Name/i);
  expect(emailLabel).toBeInTheDocument();
  expect(passwordLabel).toBeInTheDocument();
  expect(nameLabel).toBeInTheDocument();
});

test('submit button should be disabled when Email is empty', () => {
  const user = { email: 'abc@ajackus.com', password: '@Temp1234', name: "Abc Abc"} 
  const { getByLabelText, getByRole} = render(<Provider store={store}><SignUp user={user} /></Provider>);
  const input = getByLabelText(/Email/i);
  fireEvent.change(input, { 'target': { 'value': '' } });
  const submitBtn = getByRole('button', { name: 'Register' });
  expect(submitBtn).toHaveAttribute('type', 'submit');
});
