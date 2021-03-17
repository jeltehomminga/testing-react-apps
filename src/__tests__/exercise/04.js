// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
// import faker from 'faker'
import {build, fake} from '@jackfranklin/test-data-bot'

test('submitting the form calls onSubmit with username and password', () => {
  // 🐨 create a variable called "submittedData" and a handleSubmit function that
  // accepts the data and assigns submittedData to the data that was submitted
  // 💰 if you need a hand, here's what the handleSubmit function should do:

  const mockHandleSubmit = jest.fn()
  render(<Login onSubmit={mockHandleSubmit} />)
  //
  // 🐨 get the username and password fields via  `getByLabelText`
  // const buildLoginForm = (overrides) => ({
  //   username: faker.internet.userName(),
  //   password: faker.internet.password(),
  //   ...overrides
  // })

  const loginFormBuilder = build('Login', {
    fields: {
      username: fake(f => f.internet.userName()),
      password: fake(f => f.internet.password()),
    },
  })

  // const {username, password} = buildLoginForm({username: 'abc'})
  const {username, password} = loginFormBuilder()
  // 🐨 use userEvent.type to change the username and password fields to
  //    whatever you want
  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.type(screen.getByLabelText(/password/i), password)

  //
  // 🐨 click on the button with the text "Submit"
  userEvent.click(
    screen.getByRole('button', {
      name: /submit/i,
    }),
  )

  expect(mockHandleSubmit).toHaveBeenCalledWith({
    username,
    password,
  })

  // 💰 use `toEqual` from Jest: 📜 https://jestjs.io/docs/en/expect#toequalvalue
})

/*
eslint
  no-unused-vars: "off",
*/
