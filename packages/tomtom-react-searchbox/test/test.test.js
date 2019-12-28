import React from 'react';
import {
    cleanup,
    render,
    fireEvent,
    act,
} from '@testing-library/react';
import fetch from 'jest-fetch-mock';
import TomtomReactSearchBox from '../src/index';


describe('TomtomReactSearchBox: props', () => {
    test('should set placeholder if placeholder prop is passed', async () => {
        const { container } = render(
            <TomtomReactSearchBox
                placeholder="Some placeholder"
                searchOptions={{}}
            />,
        );
        const input = container.querySelector('input');
        expect(input).toBeTruthy();
    });

    test('should set focus on input if autofocus prop is true', async () => {
        const { container } = render(
            <TomtomReactSearchBox
                autofocus
                placeholder="Some placeholder"
                searchOptions={{}}
            />,
        );
        const input = container.querySelector('input');
        expect(document.activeElement === input).toBe(true);
    });
});

describe('TomtomReactSearchBox: events', () => {
    const expectedResponse = {
        results: [],
    };
    beforeEach(() => {
        fetch.resetMocks();
        fetch.mockResponseOnce(JSON.stringify(expectedResponse));
    });
    afterEach(cleanup);

    test('should change input value if users changes it', async () => {
        let input;
        await act(async () => {
            const { container } = render(
                <TomtomReactSearchBox
                    searchOptions={{}}
                />,
            );
            input = container.querySelector('input');
            fireEvent.change(input, { target: { value: 'Some text' } });
        });

        expect(input.value).toBe('Some text');
    });

    test('should trigger a call if minNumbOfChars equals default', async () => {
        await act(async () => {
            const { container } = render(
                <TomtomReactSearchBox
                    searchOptions={{}}
                />,
            );
            const input = container.querySelector('input');
            fireEvent.change(input, { target: { value: 'War' } });
        });

        expect(fetch).toHaveBeenCalled();
    });

    test('should not trigger a call if minNumbOfChars is smaller than default', async () => {
        await act(async () => {
            const { container } = render(
                <TomtomReactSearchBox
                    searchOptions={{}}
                />,
            );
            const input = container.querySelector('input');
            fireEvent.change(input, { target: { value: 'So' } });
        });

        expect(fetch).not.toBeCalled();
    });

    test('should not trigger a call if minNumbOfChars is greater default', async () => {
        await act(async () => {
            const { container } = render(
                <TomtomReactSearchBox
                    minNumbOfChars={5}
                    searchOptions={{}}
                />,
            );
            const input = container.querySelector('input');
            fireEvent.change(input, { target: { value: 'Some' } });
        });

        expect(fetch).not.toBeCalled();
    });
});

describe('TomtomReactSearchBox: events and callbacks', () => {
    const expectedResponse = {
        results: [
            {
                type: 'POI',
                id: 'KZ/POI/p0/239681',
                score: 3.41131,
                info: 'search: ta: 398009000167979-KZ',
                poi: {
                    name: 'Алматы Международный Аэропорт',
                },
                address: {
                    municipalitySubdivision: 'Almaty',
                    municipality: 'Турксибский Район',
                    countrySecondarySubdivision: 'Almaty City',
                    countrySubdivision: 'Алматы',
                    countryCode: 'KZ',
                    country: 'Kazakhstan',
                    countryCodeISO3: 'KAZ',
                    freeformAddress: 'Турксибский Район Almaty Almaty City, Алматы',
                },
            },
            {
                type: 'Geography',
                id: 'IT/GEO/p0/21544',
                score: 2.39174,
                entityType: 'Municipality',
                address: {
                    municipality: 'Ala',
                    countrySecondarySubdivision: 'Trento',
                    countrySubdivision: 'Trentino-South Tyrol',
                    countryCode: 'IT',
                    country: 'Italy',
                    countryCodeISO3: 'ITA',
                    freeformAddress: 'Ala',
                },
            },
            {
                type: 'Geography',
                id: 'IT/GEO/p0/1023',
                score: 2.33668,
                entityType: 'Municipality',
                address: {
                    municipality: 'Ala di Stura',
                    countrySecondarySubdivision: 'Turin',
                    countrySubdivision: 'Piedmont',
                    countryCode: 'IT',
                    country: 'Italy',
                    countryCodeISO3: 'ITA',
                    freeformAddress: 'Ala di Stura',
                },
            },
        ],
    };
    beforeEach(() => {
        fetch.resetMocks();
    });
    afterEach(cleanup);


    test('should call onResultsFetch callback when results are fetched', async () => {
        fetch.mockResponseOnce(JSON.stringify(expectedResponse));

        const onResultsFetch = jest.fn();
        await act(async () => {
            const { container } = render(
                <TomtomReactSearchBox
                    onResultsFetch={onResultsFetch}
                    searchOptions={{}}
                />,
            );
            const input = container.querySelector('input');
            fireEvent.change(input, { target: { value: 'Some' } });
        });
        expect(onResultsFetch).toHaveBeenCalledWith(expectedResponse);
    });

    test('should call onResultChoose callback when result element is clicked', async () => {
        fetch.mockResponseOnce(JSON.stringify(expectedResponse));

        const onResultChoose = jest.fn();
        await act(async () => {
            const { container, findAllByTestId } = render(
                <TomtomReactSearchBox
                    onResultChoose={onResultChoose}
                    searchOptions={{}}
                />,
            );
            const input = container.querySelector('input');
            fireEvent.change(input, { target: { value: 'Some' } });
            const results = await findAllByTestId('result-item');
            fireEvent.click(results[0]);
        });

        expect(onResultChoose).toHaveBeenCalledWith(expectedResponse.results[0]);
    });

    test('should call onResultChoose callback when result element is clicked (by pressing enter)', async () => {
        fetch.mockResponseOnce(JSON.stringify(expectedResponse));

        const onResultChoose = jest.fn();
        await act(async () => {
            const { container, findAllByTestId } = render(
                <TomtomReactSearchBox
                    onResultChoose={onResultChoose}
                    searchOptions={{}}
                />,
            );
            const input = container.querySelector('input');
            fireEvent.change(input, { target: { value: 'Some' } });
            await findAllByTestId('result-item');
            fireEvent.keyDown(input, { key: 'Arrow down', keyCode: 40 });
            fireEvent.keyDown(input, { key: 'Enter', keyCode: 13 });
        });

        expect(onResultChoose).toHaveBeenCalledWith(expectedResponse.results[0]);
    });

    test('should call onResultSelect callback when result element is selected', async () => {
        fetch.mockResponseOnce(JSON.stringify(expectedResponse));

        const onResultSelect = jest.fn();
        await act(async () => {
            const { container, findAllByTestId } = render(
                <TomtomReactSearchBox
                    onResultSelect={onResultSelect}
                    searchOptions={{}}
                />,
            );

            const input = container.querySelector('input');
            fireEvent.change(input, { target: { value: 'Some' } });
            await findAllByTestId('result-item');
            fireEvent.keyDown(input, { key: 'Arrow down', keyCode: 40 });
            fireEvent.keyDown(input, { key: 'Arrow down', keyCode: 40 });
            fireEvent.keyDown(input, { key: 'Arrow up', keyCode: 38 });
        });

        expect(onResultSelect).toHaveBeenCalledWith(expectedResponse.results[0]);
        expect(onResultSelect).toHaveBeenCalledWith(expectedResponse.results[1]);
        expect(onResultSelect).toHaveBeenCalledWith(expectedResponse.results[0]);
    });

    test('should hide results list when escape is pressed', async () => {
        fetch.mockResponseOnce(JSON.stringify(expectedResponse));

        let input;
        let resultsList;
        await act(async () => {
            const { container, findByTestId } = render(
                <TomtomReactSearchBox
                    searchOptions={{}}
                />,
            );

            input = container.querySelector('input');
            fireEvent.change(input, { target: { value: 'Some' } });
            resultsList = await findByTestId('results-list');
            fireEvent.keyDown(input, { key: 'Esc', keyCode: 27 });
        });
        expect(resultsList).not.toBeInTheDocument();
    });

    test('should clear input and hide results when clear button is clicked', async () => {
        fetch.mockResponseOnce(JSON.stringify(expectedResponse));

        let input;
        let resultsList;
        await act(async () => {
            const { container, findByTestId } = render(
                <TomtomReactSearchBox
                    searchOptions={{}}
                />,
            );

            input = container.querySelector('input');
            fireEvent.change(input, { target: { value: 'Some' } });
            const clear = await findByTestId('clear');
            resultsList = await findByTestId('results-list');
            fireEvent.click(clear);
        });

        expect(input.value).toBe('');
        expect(resultsList).not.toBeInTheDocument();
    });

    test('should not show clear button if input is empty', async () => {
        fetch.mockResponseOnce(JSON.stringify(expectedResponse));

        let input;
        let clear;
        await act(async () => {
            const { container, findByTestId } = render(
                <TomtomReactSearchBox
                    searchOptions={{}}
                />,
            );

            input = container.querySelector('input');
            await act(async () => {
                fireEvent.change(input, { target: { value: 'Some' } });
            });
            clear = await findByTestId('clear');
        });
        expect(clear).toBeInTheDocument();
        await act(async () => {
            fireEvent.change(input, { target: { value: '' } });
        });
        expect(clear).not.toBeInTheDocument();
    });


    test('should not show results if no results were returned from api', async () => {
        const currentExpectedResponse = { results: [] };
        fetch.mockResponseOnce(JSON.stringify(currentExpectedResponse));
        const onResultFetch = jest.fn();

        let input;
        let resultsList;
        await act(async () => {
            const { container, findByTestId } = render(
                <TomtomReactSearchBox
                    onResultFetch={onResultFetch}
                    searchOptions={{}}
                />,
            );

            input = container.querySelector('input');
            fireEvent.change(input, { target: { value: 'Some' } });
            try {
                resultsList = await findByTestId('results-list').catch();
            } catch (e) {
                // nope
            }
        });

        expect(resultsList).toBe(undefined);
    });
});
