import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';

import Login from './login';
import { Provider } from 'react-redux';

describe('Login component', async assert => {
  const email = 'abc@ajackus.com';
  const password = '@Temp1234'
  const $ = render(<Provider><Login email={email} password={password}/></Provider>);
  const contains = match($('Welcome').html());
  assert({
    given: 'a email and password',
    should: 'Render a welcome to the correct email.',
    actual: contains(email),
    expected: `Welcome`
  });
});