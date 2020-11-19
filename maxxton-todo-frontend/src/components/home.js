import React, {Component} from 'react';
import Header from '../components/header';
import Tabs from '../components/tabs';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <div style={{ margin: '4%' }}>
                <Header/>
                <Tabs/>
            </div>
        )
    }
}

export default Home
