import React from 'react';
import SearchBar from '../SearchBar';

jest.mock('debounce');
jest.mock('MovieManager');

const debounce = (fn) => fn;

test('Render the SearchBar', () => {
    const searchBar = shallow(
        <SearchBar onSearchResultsUpdated={() => null}/>,
    );

    expect(searchBar).toMatchSnapshot();
});

test('SearchBar update results when search yield results', (done) => {
    const mockSearchResultUpdate = jest.fn();

    const searchBar = mount(<SearchBar onSearchResultsUpdated={mockSearchResultUpdate}/>);

    //mockSearchResultUpdate('plop');

    const input = searchBar.find('input');

    input.simulate('focus');
    input.simulate('change', { target: { value: 'text' } });


    setTimeout(() => {
        expect(mockSearchResultUpdate).toBeCalled();
        done();
    },1);
});

test('SearchBar display error message when search fails', done => {
    const searchBar = shallow(<SearchBar onSearchResultsUpdated={(result) => null}/>);

    expect(searchBar).toMatchSnapshot();

    const input = searchBar.find('input');

    input.simulate('focus');
    input.simulate('change', { target: { value: 'error' } });

    setTimeout(() => {
        searchBar.update();
        expect(searchBar).toMatchSnapshot();
        done();
    },1);
});