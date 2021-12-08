import React from "react";
import Login from "./Login";
import { render, screen, fireEvent } from '@testing-library/react';

const mockHistoryPush = jest.fn();

jest.mock('react-router', () => ({
  ...jest.requireActual("react-router"),
  useHistory: () => ({
    push: mockHistoryPush
  }),
  useLocation: () => ({
      pathname: '/dashboard',
      state: {
        hackList: null,
        loggedInUserId: '11'
      }
  })
}));

describe('Login', () => {
  it('should renders login component', () => {
    const {container} = render(<Login />);
    const loginText = screen.getByText(/Enter Employee Id/i);
    const input = screen.getByLabelText("userid-input");
    expect(input).toBeInTheDocument();
    fireEvent.change(input, {target: {value: '11'}})
    expect(input.value).toBe('11');
    expect(loginText).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  })

  it('should redirect to dashboard on login button click', () => {
    const {getAllByText} = render(<Login />);
    const input = screen.getByLabelText("userid-input");
    fireEvent.change(input, {target: {value: '11'}})
    fireEvent.click(getAllByText(`Login`)[0]);
    expect(mockHistoryPush).toHaveBeenCalledWith({
      pathname: '/dashboard',
      state: {
        hackList: [],
        loggedInUserId: '11'
      }
    })
  })
})

