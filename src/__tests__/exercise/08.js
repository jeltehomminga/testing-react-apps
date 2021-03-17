// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'
import {act} from 'react-dom/test-utils'
import {act as rtlAct, renderHook} from '@testing-library/react-hooks'

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
// const {count, increment, decrement} = useCounter()

function CounterComponent() {
  const {count, increment, decrement} = useCounter({initialCount: 2, step: 3})

  return (
    <div>
      <div>Current count: {count}</div>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  )
}

test('exposes the count and increment/decrement functions', () => {
  const {container} = render(<CounterComponent />)

  const decrement = screen.getByRole('button', {name: 'Decrement'})
  const increment = screen.getByRole('button', {name: 'Increment'})
  const message = container.firstChild.querySelector('div')

  expect(message).toHaveTextContent('Current count: 2')
  userEvent.click(increment)
  expect(message).toHaveTextContent('Current count: 5')
  userEvent.click(decrement)
  expect(message).toHaveTextContent('Current count: 2')
})

function setup(...args) {
  const result = {}
  function TestComponent() {
    result.current = useCounter(...args)
    return null
  }
  render(<TestComponent />)
  return result
}

test('exposes the count and increment/decrement functions with setup and returnVal', () => {
  const result = setup({initialCount: 2, step: 3})
  expect(result.current.count).toBe(2)
  act(() => result.current.increment())
  expect(result.current.count).toBe(5)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(2)
})

test('exposes the count and decrement functions with @testing-library/react-hooks', () => {
  const {result, rerender} = renderHook(useCounter, {
    initialProps: {initialCount: 2, step: 3},
  })
  expect(result.current.count).toBe(2)
  rtlAct(() => result.current.increment())
  expect(result.current.count).toBe(5)
  rtlAct(() => result.current.decrement())
  expect(result.current.count).toBe(2)
  rerender({step: 2})
  rtlAct(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

/* eslint no-unused-vars:0 */
