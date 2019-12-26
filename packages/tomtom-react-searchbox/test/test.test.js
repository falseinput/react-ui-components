import React from 'react';
import { cleanup, render, fireEvent, act } from '@testing-library/react';
import fetch from 'jest-fetch-mock';
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
                placeholder="Some placeholder"
                searchOptions={{}}
            />,
        );

        const input = await findByPlaceholderText('Some placeholder');
        expect(input).toBeTruthy();
    });

    test('sets input value', async () => {
        let input;
        await act(async () => {
            const { findByPlaceholderText } = render(
                <TomtomReactSearchBox
                    placeholder="Some placeholder"
                    searchOptions={{}}
                />,
            );

            input = await findByPlaceholderText('Some placeholder');
            fireEvent.change(input, { target: { value: 'Some text' } });
        });

        expect(input.value).toBe('Some text');
    });

    test('trigger call depending on minNumbOfChars: less than default', async () => {
        let input;
        await act(async () => {
            const { findByPlaceholderText } = render(
                <TomtomReactSearchBox
                    placeholder="Some placeholder"
                    searchOptions={{}}
                />,
            );
            input = await findByPlaceholderText('Some placeholder');
            fireEvent.change(input, { target: { value: 'So' } });
        });

        expect(fetch).not.toBeCalled();
    });

    test('trigger call depending on minNumbOfChars: equal default', async () => {
        let input;
        await act(async () => {
            const { findByPlaceholderText } = render(
                <TomtomReactSearchBox
                    placeholder="Some placeholder"
                    searchOptions={{}}
                />,
            );
            input = await findByPlaceholderText('Some placeholder');
            fireEvent.change(input, { target: { value: 'Som' } });
        });

        expect(fetch).toBeCalled();
    });

    test('trigger call depending on minNumbOfChars: less than provided', async () => {
        let input;
        await act(async () => {
            const { findByPlaceholderText } = render(
                <TomtomReactSearchBox
                    minNumbOfChars={5}
                    placeholder="Some placeholder"
                    searchOptions={{}}
                />,
            );
            input = await findByPlaceholderText('Some placeholder');
            fireEvent.change(input, { target: { value: 'Some' } });
        });

        expect(fetch).not.toBeCalled();
    });
});
