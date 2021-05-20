import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';

import SignUp from './signup';
import { Provider } from 'react-redux';

describe('Signup component', async assert => {
  const email = 'abc@ajackus.com';
  const password = '@Temp1234'
  const name = "Abc"
  const $ = render(<Provider><SignUp email={email} password={password} name={name}/></Provider>);
  const contains = match($('Welcome').html());
  assert({
    given: 'a email, name, password',
    should: 'Render a welcome to the correct email.',
    actual: contains(email),
    expected: `Welcome`
  });
});