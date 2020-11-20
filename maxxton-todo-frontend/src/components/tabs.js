import React, {Component} from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ListPage from './list';
import SearchBar from '../components/searchBar';

class TabsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 0,
            searchText: '',
            groupBy: ''
        }
    }

    handleGroupByChange = (event) => {
        console.log('handleChange 1234 ---> ',event.target.name,  event.target.value);
        this.setState({ [event.target.name]:  event.target.value})
    }
    handleChange = (event, value) => {
        console.log('value ---> ', value);
        this.setState({ value })
    }
    handleSearchBarValue = (value) => {
        this.setState({ searchText: value })
    }

    render() {
        return (
            <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '23%' }}>
                    <label>Group By</label><br/>
                    <select
                        disabled={this.props.heading === 'View Task'}
                        name='groupBy' 
                        style={{padding: 5, margin: '15px 0px 0px 0px', width: '100%'}} 
                        value={this.state.groupBy} 
                        onChange={this.handleGroupByChange}
                    >
                        <option value="">None</option>
                        <option value="CreatedAt">Created On</option>
                        <option value="DueDate">Pending On</option>
                        <option value="Priority">Priority</option>
                    </select>
                </div>
                <SearchBar
                    handleSearchBarValue={this.handleSearchBarValue}
                />
            </div>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                >
                    <Tab label="All tasks" />
                    <Tab label="Completed" />
                    <Tab label="Pending" />
                </Tabs>
                <ListPage
                    tabNumber={this.state.value}
                    searchText={this.state.searchText}
                    groupByKey={this.state.groupBy}
                />
            </>
        )
    }
}

export default TabsList
