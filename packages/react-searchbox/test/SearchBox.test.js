import React from 'react';
import {
    cleanup,
    render,
    fireEvent,
    act,
} from '@testing-library/react';
import SearchBox from '../src/index';

const serviceMock = jest.fn();

const commonProps = {
    getFormattedResult: () => 'formattedResult',
    service: serviceMock,
    components: {
        Result: ({ onResultClick }) => <div onClick={onResultClick} data-testid="result-item" />,
    },
};


describe('SearchBox: props', () => {
    test('should set placeholder if placeholder prop is passed', async () => {
        const { container } = render(
            <SearchBox
                placeholder="Some placeholder"
                searchOptions={{}}
                {...commonProps}
            />,
        );
        const input = container.querySelector('input');
        expect(input).toBeTruthy();
    });

    test('should set focus on input if autofocus prop is true', async () => {
        const { container } = render(
            <SearchBox
                autofocus
                placeholder="Some placeholder"
                searchOptions={{}}
                {...commonProps}
            />,
        );
        const input = container.querySelector('input');
        expect(document.activeElement === input).toBe(true);
    });
});

describe('SearchBox: events', () => {
    const expectedResponse = [];
    beforeEach(() => {
        serviceMock.mockReset();
        serviceMock.mockReturnValueOnce(Promise.resolve(expectedResponse));
    });
    afterEach(cleanup);

    test('should change input value if users changes it', async () => {
        let input;
        await act(async () => {
            const { container } = render(
                <SearchBox
                    searchOptions={{}}
                    {...commonProps}
                />,
            );
            input = container.querySelector('input');
            fireEvent.change(input, { target: { value: 'Some text' } });
        });

        expect(input.value).toBe('Some text');
    });

    test('should trigger a call if value equals minNumbOfChars', async () => {
        await act(async () => {
            const { container } = render(
                <SearchBox
                    searchOptions={{}}
                    {...commonProps}
                />,
            );
            const input = container.querySelector('input');
            fireEvent.change(input, { target: { value: 'War' } });
        });

        expect(serviceMock).toHaveBeenCalled();
    });

    test('should not trigger a call if value is smaller than minNumbOfChars', async () => {
        await act(async () => {
            const { container } = render(
                <SearchBox
                    searchOptions={{}}
                    {...commonProps}
                />,
            );
            const input = container.querySelector('input');
            fireEvent.change(input, { target: { value: 'So' } });
        });

        expect(serviceMock).not.toBeCalled();
    });

    test('should trigger a call value is greater than minNumbOfChars', async () => {
        await act(async () => {
            const { container } = render(
                <SearchBox
                    searchOptions={{}}
                    {...commonProps}
                />,
            );
            const input = container.querySelector('input');
            fireEvent.change(input, { target: { value: 'Some' } });
        });

        expect(serviceMock).toBeCalled();
    });
});

describe('SearchBox: events and callbacks', () => {
    const expectedResponse = [
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
    ];
    beforeEach(() => {
        serviceMock.mockReset();
    });
    afterEach(cleanup);


    test('should call onResultsFetch callback when results are fetched', async () => {
        serviceMock.mockReturnValueOnce(Promise.resolve(expectedResponse));

        const onResultsFetch = jest.fn();
        await act(async () => {
            const { container } = render(
                <SearchBox
                    onResultsFetch={onResultsFetch}
                    searchOptions={{}}
                    {...commonProps}
                />,
            );
            const input = container.querySelector('input');
            fireEvent.change(input, { target: { value: 'Some' } });
        });
        expect(onResultsFetch).toHaveBeenCalledWith(expectedResponse);
    });

    test('should call onResultChoose callback when result element is clicked', async () => {
        serviceMock.mockReturnValueOnce(Promise.resolve(expectedResponse));

        const onResultChoose = jest.fn();
        await act(async () => {
            const { container, findAllByTestId } = render(
                <SearchBox
                    onResultChoose={onResultChoose}
                    searchOptions={{}}
                    {...commonProps}
                />,
            );
            const input = container.querySelector('input');
            fireEvent.change(input, { target: { value: 'Some' } });
            const results = await findAllByTestId('result-item');
            fireEvent.click(results[0]);
        });

        expect(onResultChoose).toHaveBeenCalledWith(expectedResponse[0]);
    });

    test('should call onResultChoose callback when result element is clicked (by pressing enter)', async () => {
        serviceMock.mockReturnValueOnce(Promise.resolve(expectedResponse));

        const onResultChoose = jest.fn();
        await act(async () => {
            const { container, findAllByTestId } = render(
                <SearchBox
                    onResultChoose={onResultChoose}
                    searchOptions={{}}
                    {...commonProps}
                />,
            );
            const input = container.querySelector('input');
            fireEvent.change(input, { target: { value: 'Some' } });
            await findAllByTestId('result-item');
            fireEvent.keyDown(input, { key: 'Arrow down', keyCode: 40 });
            fireEvent.keyDown(input, { key: 'Enter', keyCode: 13 });
        });

        expect(onResultChoose).toHaveBeenCalledWith(expectedResponse[0]);
    });

    test('should call onResultSelect callback when result element is selected', async () => {
        serviceMock.mockReturnValueOnce(Promise.resolve(expectedResponse));

        const onResultSelect = jest.fn();
        await act(async () => {
            const { container, findAllByTestId } = render(
                <SearchBox
                    onResultSelect={onResultSelect}
                    searchOptions={{}}
                    {...commonProps}
                />,
            );

            const input = container.querySelector('input');
            fireEvent.change(input, { target: { value: 'Some' } });
            await findAllByTestId('result-item');
            fireEvent.keyDown(input, { key: 'Arrow down', keyCode: 40 });
            fireEvent.keyDown(input, { key: 'Arrow down', keyCode: 40 });
            fireEvent.keyDown(input, { key: 'Arrow up', keyCode: 38 });
        });

        expect(onResultSelect).toHaveBeenCalledWith(expectedResponse[1]);
        expect(onResultSelect).toHaveBeenCalledWith(expectedResponse[0]);
    });

    test('should call onResultChoose callback when search is triggered manually', async () => {
        serviceMock.mockReturnValueOnce(Promise.resolve(expectedResponse));
        const manuallyTriggeredCallResponse = [{
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
        }];
        serviceMock.mockReturnValueOnce(Promise.resolve(manuallyTriggeredCallResponse));

        const onResultChoose = jest.fn();
        await act(async () => {
            const { container, findAllByTestId } = render(
                <SearchBox
                    onResultChoose={onResultChoose}
                    searchOptions={{}}
                    {...commonProps}
                />,
            );

            const input = container.querySelector('input');
            fireEvent.change(input, { target: { value: 'Some' } });
            await findAllByTestId('result-item');
            fireEvent.keyDown(input, { key: 'Enter', keyCode: 13 });
        });

        expect(serviceMock).toHaveBeenCalledTimes(2);
        expect(onResultChoose).toHaveBeenCalledWith(manuallyTriggeredCallResponse[0]);
    });


    test('should hide results list when escape is pressed', async () => {
        serviceMock.mockReturnValueOnce(Promise.resolve(expectedResponse));

        let input;
        let resultsList;
        await act(async () => {
            const { container, findByTestId } = render(
                <SearchBox
                    searchOptions={{}}
                    {...commonProps}
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
        serviceMock.mockReturnValueOnce(Promise.resolve(expectedResponse));

        let input;
        let resultsList;
        await act(async () => {
            const { container, findByTestId } = render(
                <SearchBox
                    searchOptions={{}}
                    {...commonProps}
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
        serviceMock.mockReturnValueOnce(Promise.resolve(expectedResponse));

        let input;
        let clear;
        await act(async () => {
            const { container, findByTestId } = render(
                <SearchBox
                    searchOptions={{}}
                    {...commonProps}
                />,
            );

            input = container.querySelector('input');
            fireEvent.change(input, { target: { value: 'Some' } });
            clear = await findByTestId('clear');
        });
        expect(clear).toBeInTheDocument();
        await act(async () => {
            fireEvent.change(input, { target: { value: '' } });
        });
        expect(clear).not.toBeInTheDocument();
    });


    test('should not show results if no results were returned from api', async () => {
        const currentExpectedResponse = [];
        serviceMock.mockReturnValueOnce(Promise.resolve(currentExpectedResponse));

        let input;
        let resultsList;
        await act(async () => {
            const { container, findByTestId } = render(
                <SearchBox
                    searchOptions={{}}
                    {...commonProps}
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

    describe('TomtomReactSearchbox: custom components', () => {
        const expectedResponse = [
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
        ];
        beforeEach(() => {
            serviceMock.mockReset();
        });
        afterEach(cleanup);


        test('should replace Clear component when provided', async () => {
            serviceMock.mockReturnValueOnce(Promise.resolve(expectedResponse));
            let input;
            let clear;
            const CustomClear = jest.fn();
            // eslint-disable-next-line
            CustomClear.mockImplementation(() => <div data-testid="custom-clear" >Clear</div>);

            await act(async () => {
                const { container, findByTestId } = render(
                    <SearchBox
                        {...commonProps}
                        components={{
                            Clear: CustomClear,
                        }}
                        searchOptions={{}}
                    />,
                );

                input = container.querySelector('input');
                fireEvent.change(input, { target: { value: 'Some' } });
                try {
                    clear = await findByTestId('custom-clear').catch();
                } catch (e) {
                    // nope
                }
            });

            expect(clear).toBeInTheDocument();
            expect(clear.textContent).toBe('Clear');
            expect(CustomClear).toBeCalledWith({
                onClear: expect.any(Function),
            }, {});
        });

        test('should replace Result component when provided', async () => {
            serviceMock.mockReturnValueOnce(Promise.resolve(expectedResponse));
            let input;
            const CustomResult = jest.fn();
            // eslint-disable-next-line
            CustomResult.mockImplementation(() => <div data-testid="custom-result" >Clear</div>);

            await act(async () => {
                const { container } = render(
                    <SearchBox
                        {...commonProps}
                        components={{
                            Result: CustomResult,
                        }}
                        searchOptions={{}}
                    />,
                );

                input = container.querySelector('input');
                fireEvent.change(input, { target: { value: 'Some' } });
            });

            expect(CustomResult).toBeCalledWith({
                result: expectedResponse[0],
                isSelected: expect.any(Boolean),
                onResultClick: expect.any(Function),
            }, {});
            expect(CustomResult).toBeCalledWith({
                result: expectedResponse[1],
                isSelected: expect.any(Boolean),
                onResultClick: expect.any(Function),
            }, {});
            expect(CustomResult).toBeCalledWith({
                result: expectedResponse[2],
                isSelected: expect.any(Boolean),
                onResultClick: expect.any(Function),
            }, {});
        });
    });
});
