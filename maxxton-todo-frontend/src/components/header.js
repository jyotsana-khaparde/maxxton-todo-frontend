import React, {Component} from 'react';
import AddIcon from '@material-ui/icons/Add';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-around',
            alignItems: 'center' }}>
                <h2>ToDo App</h2>
                <div style={{ backgroundColor: '#2683de',
                                border: '1px solid black',
                                width: 50,
                                height: 50,
                                borderRadius: 35,
                                border: 'none',
                                boxShadow: '1px 1px 4px 1px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center' }}>
                    <AddIcon style={{ color: 'white' }}/>
                </div>
            </div>
        )
    }
}

export default Header
