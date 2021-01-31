import React, { useState } from 'react';
import '../styles/search.scss';

interface ISearchProps {
    handleSearchBarValue: (value: string) => void;
}

interface ISearchEvent {
    [propsName: string]: any
}

const SearchBar: React.FC<ISearchProps> = (props: ISearchProps) => {
    const [searchedValue, setSearchedValue] = useState<string>('')

    const handleSearchValue = (e: ISearchEvent) => {
        setSearchedValue(e.target.value)
        props.handleSearchBarValue(e.target.value)
    }

    return (
        <div>
            <label className='label'>Search</label><br/>
            <input
                value={searchedValue}
                type='text'
                placeholder='Search Tasks'
                className='searchInput'
                onChange={handleSearchValue}
            />
        </div>
    )
}

export default SearchBar;
