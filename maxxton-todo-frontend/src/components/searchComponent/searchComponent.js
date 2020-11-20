import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import styles from './search.style';

const SearchBar = (props) => {
    const { classes } = props;
    const [searchedValue, setSearchedValue] = useState('')

    const handleSearchValue = (e) => {
        setSearchedValue(e.target.value)
        props.handleSearchBarValue(e.target.value)
    }

    return (
        <div>
            <label className={classes.label}>Search</label><br/>
            <input
                value={searchedValue}
                type='text'
                placeholder='Search Tasks'
                className={classes.searchInput}
                onChange={handleSearchValue}
            />
        </div>
    )
}

export default withStyles(styles)(SearchBar);
