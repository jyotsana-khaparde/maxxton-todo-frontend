import React, {Component} from 'react';
import Tabs from '@material-ui/core/Tabs';
import { withStyles } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import ListPage from '../listPage/list';
import SearchBar from '../searchComponent/searchComponent';
import Header from '../header/header';
import GroupByComponent from '../groupByComponent/groupByComponent';
import styles from './home.style';

class TabsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTab: 0,
            searchedText: '',
            selectedgroupByValue: '',
            isnewTaskAdded: false
        }
    }

    handleIsnewTaskAdded = (value) => {
        console.log('handleIsnewTaskAdded ---> ', value)
        this.setState({ isnewTaskAdded: value})
    }

    handleGroupByChange = (value) => {
        console.log('handleGroupByChange ---> ', value)
        this.setState({ selectedgroupByValue:  value})
    }
    handleTabChange = (event, value) => {
        console.log('handleGroupByChange ---> ', value)
        this.setState({ selectedTab: value })
    }
    handleSearchBarValue = (value) => {
        console.log('handleSearchBarValue ---> ', value)
        this.setState({ searchedText: value })
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.homeContainer}>
                <Header
                    handleIsnewTaskAdded={this.handleIsnewTaskAdded}
                />
                <div className={classes.searchContainer}>
                    <GroupByComponent
                        handleGroupByChange={this.handleGroupByChange}
                    />
                    <SearchBar
                        handleSearchBarValue={this.handleSearchBarValue}
                    />
                </div>
                <Tabs
                    value={this.state.selectedTab}
                    onChange={this.handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                >
                    <Tab label="All tasks" />
                    <Tab label="Completed" />
                    <Tab label="Pending" />
                </Tabs>
                <ListPage
                    tabNumber={this.state.selectedTab}
                    searchText={this.state.searchedText}
                    groupByKey={this.state.selectedgroupByValue}
                    isnewTaskAdded={this.state.isnewTaskAdded}
                    handleIsnewTaskAdded={this.handleIsnewTaskAdded}
                />
            </div>
        )
    }
}

export default withStyles(styles)(TabsList);
