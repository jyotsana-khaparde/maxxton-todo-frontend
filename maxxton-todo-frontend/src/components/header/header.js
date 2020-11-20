import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import TaskModal from '../taskModalComponent/taskModal';
import { addTask } from '../../redux/actionCreator';
import styles from './header.style';

const Header = (props) => {
    const { classes } = props;
    const [openAddTaskModal, setOpenAddTaskModal] = useState(false)
    const dispatch = useDispatch()

    const handleAddTask = () => {
        console.log('added-------')
        setOpenAddTaskModal(true)
    }

    const handleSubmit = (payload) => {
        console.log('handleSubmit payload---', payload)
        dispatch(addTask(payload))
        setOpenAddTaskModal(false)
        props.handleIsnewTaskAdded(true)
    }

    return (
        <>
        <div className={classes.container}>
            <h2>ToDo App</h2>
            <div className={classes.addIcon}
                onClick={handleAddTask}>
                <AddIcon style={{ color: 'white' }}/>
            </div>
        </div>
        {
            openAddTaskModal && 
            <TaskModal
                open={openAddTaskModal}
                handleClose={() => setOpenAddTaskModal(false)}
                heading={'Add Task'}
                handleModalSubmit={handleSubmit}
            />
        }
        </>
    )
}

export default withStyles(styles)(Header);
