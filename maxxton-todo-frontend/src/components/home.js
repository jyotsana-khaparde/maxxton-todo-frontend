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
            <>
                <Header/>
                <Tabs/>
            </>
        )
    }
}

export default Home
