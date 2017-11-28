import React from 'react';
import SearchBar from '../SearchBar';

jest.mock('debounce');
jest.mock('MovieManager');

const debounce = (fn) => fn;

test('SearchBar renders properly', () => {
    const searchBar = shallow(
        <SearchBar onSearchResultsUpdated={() => null}/>,
    );

    expect(searchBar).toMatchSnapshot();
});

test('SearchBar update results when search yield results', (done) => {
    const mockSearchResultUpdate = jest.fn();

    const searchBar = mount(<SearchBar onSearchResultsUpdated={mockSearchResultUpdate}/>);

    const input = searchBar.find('input');
    input.simulate('change', { target: { value: 'text' } });

    setTimeout(() => {
        try {
            expect(mockSearchResultUpdate).toBeCalled();

            const results = mockSearchResultUpdate.mock.calls[0][0];
            expect(Array.isArray(results)).toBe(true);
            expect(results.length).toBe(1);
            expect(results[0].objectID).toBe('1');
            expect(results[0].title).toBe('title');
            done();
        } catch(error) {
            done.fail(error);
        }
    },1);
});

test('SearchBar display error message when search fails', done => {
    const searchBar = shallow(<SearchBar onSearchResultsUpdated={(result) => null}/>);

    expect(searchBar).toMatchSnapshot();

    const input = searchBar.find('input');
    input.simulate('change', { target: { value: 'error' } });

    setTimeout(() => {
        try {
            searchBar.update();
            expect(searchBar).toMatchSnapshot();
            done();
        } catch(error) {
            done.fail(error);
        }
    },1);
});