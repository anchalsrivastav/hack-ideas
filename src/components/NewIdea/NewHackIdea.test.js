import NewHackIdea from "./NewHackIdea";
import {render} from '@testing-library/react'
import {createMemoryHistory} from 'history'
import React from 'react';
import {Router} from 'react-router-dom';
import '@testing-library/jest-dom';

describe('New Hack Idea', () => {
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

    it('renders new hack idea creation page', () => {
        const history = createMemoryHistory()
        const route = '/add';
        history.push(route)
        const {container, getByText} = render(
            <Router history={history}>
                <NewHackIdea />
            </Router>,
        )
        expect(getByText('Add New Hack Item')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    })
})
