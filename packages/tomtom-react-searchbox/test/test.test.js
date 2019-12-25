import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import TomtomReactSearchBox from '../src/index';

// automatically unmount and cleanup DOM after the test is finished.
beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponseOnce(JSON.stringify({ results: [] }));
});
afterEach(cleanup);

describe('TomtomReactSearchBox', () => {
    test('sets input placeholder', async () => {
        const { findByPlaceholderText } = render(
            <TomtomReactSearchBox
                placeholder='Some placeholder'
                searchOptions={{}}
            />,
        );

        const input = await findByPlaceholderText('Some placeholder');
        expect(input).toBeInstanceOf(HTMLInputElement);
    });

    test('sets input value', async () => {
        let input;
        await act(async () => {
            const { findByPlaceholderText } = render(
                <TomtomReactSearchBox
                    placeholder='Some placeholder'
                    searchOptions={{}}
                />,
            );

            input = await findByPlaceholderText('Some placeholder');

            fireEvent.change(input, { target: { value: 'Some text' } });
        });

        expect(input.value).toBe('Some text');
    });
});
