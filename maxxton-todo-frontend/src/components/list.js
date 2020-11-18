import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getTaskList, editTask, deleteTask } from '../actions/todo-actions';
import TaskModal from '../components/add-task-form';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { Button } from '@material-ui/core';
import moment from 'moment';
import DeleteModal from './deleteModal';

class ListPage extends Component {
    constructor(props) {
        super(props)
        console.log(' props.taskList  ;;;;;;;', props.taskList );
        this.state = {
            openTaskReadOnlyModal: false,
            openEditTaskModal: false,
            openDeleteModal: false,
            taskDataObject: {}
        }
    }

    handleTrClick = (e, dataLists, key) => {
        console.log('dataLists:-----', dataLists);
        e.stopPropagation()
        this.setState({
            [key]: true,
            taskDataObject: dataLists
        })
    }

    handleSubmit = (payload) => {
        console.log('handleSubmit payload for edit modal-->', payload);
        if (this.state.openEditTaskModal) {
            this.props.editTask(payload)
            this.setState({ openEditTaskModal: false })
        }
        if (this.state.openDeleteModal) {
            console.log('delete karo', this.state.taskDataObject);
            this.props.deleteTask(this.state.taskDataObject.id)
            this.setState({ openDeleteModal: false })
        }
    }

    componentDidMount() {
        this.props.getTaskList()
    }

    render() {
        console.log('taskList:- ', this.props.taskList);
        return (
            <>
                <table style={{fontFamily: 'arial, sans-serif', borderCollapse: 'collapse', width: '100%', marginTop: 10}}>
                    <thead>
                        <tr>
                            <th style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>Summary</th>
                            <th style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>Priority</th>
                            <th style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>Created On</th>
                            <th style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>Due Date</th>
                            <th style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(this.props.taskList && this.props.taskList.reverse() || []).map(dataLists => (
                            <tr key={dataLists.id} onClick={(e) => this.handleTrClick(e, dataLists, 'openTaskReadOnlyModal')}>
                                <td style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>{dataLists.Title}</td>
                                <td style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>{dataLists.Priority}</td>
                                <td style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>{moment(dataLists.CreatedAt).format("YYYY-DD-MM")}</td>
                                <td style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>{moment(dataLists.DueDate).format("YYYY-DD-MM")}</td>
                                <td style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8, display: 'flex'}}>
                                    <EditOutlinedIcon style={{ padding: 5, borderRadius: 5, background: 'rgb(38, 131, 222)', color: 'white', margin: 3 }}
                                    onClick={(e) => this.handleTrClick(e, dataLists, 'openEditTaskModal')}/>
                                    <Button variant="contained" style={{ borderRadius: 5, background: 'rgb(69 173 93)', color: 'white', padding: 5, margin: 3}}>
                                        Done
                                    </Button>
                                    <DeleteOutlineOutlinedIcon onClick={(e) => this.handleTrClick(e, dataLists, 'openDeleteModal')} style={{ padding: 5, borderRadius: 5, background: '#cc1717', color: 'white', margin: 3 }}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {this.state.openTaskReadOnlyModal && <TaskModal
                    open={this.state.openTaskReadOnlyModal}
                    handleClose={() => this.setState({ openTaskReadOnlyModal: false })}
                    heading={'View Task'}
                    taskDataObject={this.state.taskDataObject}
                />}
                {this.state.openEditTaskModal && <TaskModal
                    open={this.state.openEditTaskModal}
                    handleClose={() => this.setState({ openEditTaskModal: false })}
                    heading={'Edit Task'}
                    taskDataObject={this.state.taskDataObject}
                    handleModalSubmit={this.handleSubmit}
                />}
                {this.state.openDeleteModal && <DeleteModal
                    open={this.state.openDeleteModal}
                    handleClose={() => this.setState({ openDeleteModal: false })}
                    handleModalSubmit={this.handleSubmit}
                />}
            </>
        )
    }
}

const mapStateToProps = state => {
    console.log('state.todoReducer-----', state.taskList);
    return {
        taskList: state.taskList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getTaskList: () => dispatch(getTaskList()),
        editTask: (payload) => dispatch(editTask(payload)),
        deleteTask: (payload) => dispatch(deleteTask(payload))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
