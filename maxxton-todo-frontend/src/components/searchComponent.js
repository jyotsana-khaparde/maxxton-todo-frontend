import React, { useState } from 'react';

const SearchBar = (props) => {
    const [searchedValue, setSearchedValue] = useState('')

    const handleSearchValue = (e) => {
        console.log('handleSearchValue-> ', e.target.value);
        setSearchedValue(e.target.value)
        props.handleSearchBarValue(e.target.value)
    }

    return (
        <div>
            <label style={{ margin: '15px 0px 0px 90px' }}>Search</label><br/>
            <input
                value={searchedValue}
                type='text'
                placeholder='Search Tasks'
                style={{ width: '380%', height: 25, margin: '15px 0px 0px 90px' }}
                onChange={handleSearchValue}
            />
        </div>
    )
}

export default SearchBar;
