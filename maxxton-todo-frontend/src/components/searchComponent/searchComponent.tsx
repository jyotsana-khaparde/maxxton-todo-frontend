import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import styles from './search.style';

interface ISearchProps {
    classes: {
        label: string,
        searchInput: string,
    };
    handleSearchBarValue: (value: string) => void;
}

interface ISearchEvent {
    [propsName: string]: any
}

const SearchBar: React.FC<ISearchProps> = (props: ISearchProps) => {
    const { classes } = props;
    const [searchedValue, setSearchedValue] = useState<string>('')

    const handleSearchValue = (e: ISearchEvent) => {
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
