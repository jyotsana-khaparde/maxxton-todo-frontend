import React, {Component} from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Header from '../header/header';
import GroupByComponent from '../groupByComponent/groupByComponent';
import ListPage from '../listPage/list';
import SearchBar from '../searchComponent/searchComponent';
import '../styles/home.scss';
  
interface ITabsListState {
    selectedTab: number;
    searchedText: string;
    selectedgroupByValue: string;
    isnewTaskAdded: boolean;
};

interface IPropsName {
    [propsName: string]: any
}

class TabsList extends Component<IPropsName, ITabsListState> {
    constructor(props: IPropsName) {
        super(props)
        this.state = {
            selectedTab: 0,
            searchedText: '',
            selectedgroupByValue: '',
            isnewTaskAdded: false
        }
    }

    handleIsnewTaskAdded = (value: boolean) => {
        this.setState({ isnewTaskAdded: value })
    }

    handleGroupByChange = (value: string) => {
        this.setState({ selectedgroupByValue:  value})
    }
    handleTabChange = (event: object, value: number) => {
        this.setState({ selectedTab: value })
    }
    handleSearchBarValue = (value: string) => {
        this.setState({ searchedText: value })
    }

    render() {
        return (
            <div className='homeContainer'>
                <Header
                    handleIsnewTaskAdded={this.handleIsnewTaskAdded}
                />
                <div className='searchContainer'>
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

export default TabsList;
