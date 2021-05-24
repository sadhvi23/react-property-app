import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import reducer from '../reducers'

import Login from './login';

test('renders the form correctly', () => {
  const store = createStore(reducer)
  const user = { email: 'abc@ajackus.com', password: '@Temp1234' } 
  const { getByText, _} = render(<Provider store={store}><Login user={user} /></Provider>);
  const emailLabel = getByText(/Email/i);
  const passwordLabel = getByText(/Password/i);
  expect(emailLabel).toBeInTheDocument();
  expect(passwordLabel).toBeInTheDocument();
});

test('submit button should be disabled when Email is empty', () => {
  const store = createStore(reducer)
  const user = { email: 'abc@ajackus.com', password: '@Temp1234'} 
  const { getByLabelText, getByRole} = render(<Provider store={store}><Login user={user} /></Provider>);
  const input = getByLabelText(/Email/i);
  fireEvent.change(input, { 'target': { 'value': '' } });
  const submitBtn = getByRole('button', { name: 'Sign in' });
  expect(submitBtn).toHaveAttribute('type', 'submit');
});
