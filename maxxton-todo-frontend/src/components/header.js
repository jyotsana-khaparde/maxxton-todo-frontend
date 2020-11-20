import React, {Component} from 'react';
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import TaskModal from '../components/add-task-form';
import { addTask } from '../actions/todo-actions';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openAddTaskModal: false
        }
    }

    handleAddTask = () => {
        console.log('added-------')
        this.setState({ openAddTaskModal: true })
    }

    handleSubmit = (payload) => {
        console.log('handleSubmit payload---', payload)
        this.props.addTask(payload)
        this.setState({ openAddTaskModal: false })
        this.props.handleIsnewTaskAdded(true)
    }

    render() {
        const { openAddTaskModal } = this.state;
        return (
            <>
            <div style={{ display: 'flex', justifyContent: 'space-between',
            alignItems: 'center' }}>
                <h2>ToDo App</h2>
                <div style={{ backgroundColor: '#2683de',
                                width: 50,
                                height: 50,
                                borderRadius: 35,
                                border: 'none',
                                boxShadow: '1px 1px 4px 1px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center' }}
                    onClick={this.handleAddTask}>
                    <AddIcon style={{ color: 'white' }}/>
                </div>
            </div>
            {
                openAddTaskModal && 
                <TaskModal
                    open={openAddTaskModal}
                    handleClose={() => this.setState({ openAddTaskModal: false})}
                    heading={'Add Task'}
                    handleModalSubmit={this.handleSubmit}
                />
            }
            </>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addTask: (payload) => dispatch(addTask(payload))
    }
};

export default connect(null, mapDispatchToProps)(Header);
