import Dashboard from "./Dashboard";
import {render} from '@testing-library/react'
import {createMemoryHistory} from 'history'
import React from 'react';
import {Router} from 'react-router-dom';
import '@testing-library/jest-dom';

localStorage.setItem("userId", "11");
const mockHistoryPush = jest.fn();

jest.mock('react-router', () => ({
    ...jest.requireActual("react-router"),
    useHistory: () => ({
        push: mockHistoryPush
    })
}));

describe('Dashboard', () => {
    beforeEach(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: jest.fn(),
                removeListener: jest.fn(),
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        });
    });

    it("should renders dashboard component", () => {
        const history = createMemoryHistory()
        const route = '/dashboard';
        history.push(route)
        const {container, getByText} = render(
            <Router history={history}>
                <Dashboard />
            </Router>
        )
        expect(getByText('HackIdeas')).toBeInTheDocument();
        expect(getByText('TITLE 1')).toBeInTheDocument();
        expect(getByText('Description 1')).toBeInTheDocument();
        expect(getByText('feature')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    })
})
