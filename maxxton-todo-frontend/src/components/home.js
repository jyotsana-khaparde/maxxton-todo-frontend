import React, {Component} from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ListPage from './list';
import SearchBar from './searchBar';
import Header from './header';
import GroupByComponent from './groupByComponent';

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
        return (
            <div style={{ margin: '4%' }}>
                <Header
                    handleIsnewTaskAdded={this.handleIsnewTaskAdded}
                />
                <div style={{ display: 'flex', alignItems: 'center' }}>
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
                />
            </div>
        )
    }
}

export default TabsList
