import React, {Component} from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ListPage from './list';

class TabsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 0
        }
    }

    handleChange = (event, value) => {
        console.log('value ---> ', value);
        this.setState({ value })
    }

    render() {
        return (
            <>
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
                <ListPage/>
            </>
        )
    }
}

export default TabsList
