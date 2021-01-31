import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import TaskModal from '../taskModalComponent/taskModal';
import { addTask } from '../../redux/actionCreator';
import '../styles/header.scss';

interface IHeaderProps {
    handleIsnewTaskAdded: (value: boolean) => void;
}

const Header: React.FC<IHeaderProps> = (props: IHeaderProps) => {
    const [openAddTaskModal, setOpenAddTaskModal] = useState(false)
    const dispatch = useDispatch()

    const handleAddTask = () => {
        setOpenAddTaskModal(true)
    }

    const handleSubmit = (payload: {
        CurrentState: string,
        Description: string,
        DueDate: string,
        DueTime: string,
        Priority: string,
        Title: string,
        id: string
    }) => {
        dispatch(addTask(payload))
        setOpenAddTaskModal(false)
        props.handleIsnewTaskAdded(true)
    }

    return (
        <>
        <div className='container'>
            <h2>ToDo App</h2>
            <div className='addIcon'
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

export default Header;
