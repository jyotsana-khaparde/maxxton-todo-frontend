import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getTaskList, editTask, deleteTask } from '../actions/todo-actions';
import TaskModal from '../components/add-task-form';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { Button } from '@material-ui/core';
import moment from 'moment';
import DeleteModal from './deleteModal';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import { sortByMapping, groupByMapping } from '../constants/utils';

class ListPage extends Component {
    constructor(props) {
        super(props)
        console.log('props.taskList;;;;;;;', props );
        this.state = {
            openTaskReadOnlyModal: false,
            openEditTaskModal: false,
            openDeleteModal: false,
            taskDataObject: {},
            updateCurrentState: false,
            isAscending: true,
            sortBy: '',
        }
    }

    handleTrClick = (e, dataLists, key) => {
        console.log('dataLists:-----', dataLists);
        e.stopPropagation()
        if (key === 'updateCurrentState') {
            console.log('Current State update karo->', dataLists);
            dataLists['CurrentState'] === 'Pending' ? dataLists['CurrentState'] = 'Done' : dataLists['CurrentState'] = 'Pending'; 
            console.log('updated current state->', dataLists);
            this.props.editTask(dataLists)
        } else {
            this.setState({
                [key]: true,
                taskDataObject: dataLists
            });
        }
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

    handleOrder = (key) => {
        console.log('this.props.tabNumber-----', key)
        this.setState({
            isAscending: !this.state.isAscending,
            sortBy: key
        })
    }

    componentDidMount() {
        this.props.getTaskList()
    }

    render() {
        console.log('taskList:- ',this.props.tabNumber, this.props.taskList);
        console.log('isAscending-------', this.state.isAscending, this.state.sortBy)
        let seperateTabData = []
        let groupByObject = {}
        if (this.props.tabNumber === 0) {
            seperateTabData = [...this.props.taskList]
        }
        if (this.props.tabNumber === 1) {
            let completedFilterData = [...this.props.taskList]
            seperateTabData = completedFilterData.filter(completedFilterData => completedFilterData.CurrentState === 'Done')
        }
        if (this.props.tabNumber === 2) {
            let completedFilterData = [...this.props.taskList]
            seperateTabData = completedFilterData.filter(completedFilterData => completedFilterData.CurrentState === 'Pending') 
        }
        if (this.state.sortBy) {
            console.log('---------sort har de-------');
            seperateTabData = sortByMapping(this.state.sortBy, this.state.isAscending, seperateTabData)
        }

        if (this.props.searchText) {
            let filteredList = [...seperateTabData].filter((list) => {
                return list.Title.toLowerCase().indexOf(this.props.searchText.toLowerCase()) !== -1;
            })
            seperateTabData = filteredList
        }

        if(this.props.groupByKey) {
            console.log('this.props.groupByKey-----', this.props.groupByKey);
            groupByObject = groupByMapping(seperateTabData, this.props.groupByKey);
            console.log('groupByObject-----', groupByObject)
        }


        const listShow = (dataLists) => (
            <tr key={dataLists.id} onClick={(e) => this.handleTrClick(e, dataLists, 'openTaskReadOnlyModal')}>
                <td style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8, textDecoration: dataLists.CurrentState === 'Done' ? 'line-through' : 'none'}}>
                    {dataLists.Title}
                </td>
                <td style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8, textDecoration: dataLists.CurrentState === 'Done' ? 'line-through' : 'none'}}>
                    {dataLists.Priority}
                </td>
                <td style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8, textDecoration: dataLists.CurrentState === 'Done' ? 'line-through' : 'none'}}>
                    {moment(dataLists.CreatedAt).format("YYYY-MM-DD")}
                </td>
                <td style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8, textDecoration: dataLists.CurrentState === 'Done' ? 'line-through' : 'none'}}>
                    {!dataLists.DueDate && !dataLists.DueTime ? null : moment(dataLists.DueDate).format("YYYY-MM-DD") +"  "+ dataLists.DueTime}
                </td>
                <td style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8, display: 'flex'}}>
                    <EditOutlinedIcon
                        style={{ padding: 5, borderRadius: 5, background: 'rgb(38, 131, 222)', color: 'white', margin: 3 }}
                        onClick={(e) => this.handleTrClick(e, dataLists, 'openEditTaskModal')}
                    />
                    <Button
                        variant="contained" 
                        style={{ borderRadius: 5, background: dataLists.CurrentState === 'Done' ? '#54a4a9' : 'rgb(69 173 93)', color: 'white', padding: 5, margin: 3}}
                        onClick={(e) => this.handleTrClick(e, dataLists, 'updateCurrentState')}
                    >
                        {dataLists.CurrentState === 'Pending' ? 'Done' : 'Re-Open'}
                    </Button>
                    <DeleteOutlineOutlinedIcon
                        onClick={(e) => this.handleTrClick(e, dataLists, 'openDeleteModal')}
                        style={{ padding: 5, borderRadius: 5, background: '#cc1717', color: 'white', margin: 3 }}
                    />
                </td>
            </tr>
        )

        return (
            <>
                <table style={{fontFamily: 'arial, sans-serif', borderCollapse: 'collapse', width: '100%', marginTop: 10}}>
                    <thead>
                        <tr>
                            <th style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <span>Summary</span> 
                                    <UnfoldMoreIcon
                                        onClick={() => this.handleOrder('Title')}
                                        style={{ padding: 2, borderRadius: 5, background: 'rgb(38, 131, 222)', color: 'white', margin: 3 }}
                                    />
                                </div>
                            </th>
                            <th style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <span>Priority</span>
                                    <UnfoldMoreIcon
                                        onClick={() => this.handleOrder('Priority')}
                                        style={{ padding: 2, borderRadius: 5, background: 'rgb(38, 131, 222)', color: 'white', margin: 3 }}
                                    />
                                </div>
                            </th>
                            <th style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <span>Created On</span>
                                    <UnfoldMoreIcon
                                        onClick={() => this.handleOrder('CreatedAt')}
                                        style={{ padding: 2, borderRadius: 5, background: 'rgb(38, 131, 222)', color: 'white', margin: 3 }}
                                    />
                                </div>
                            </th>
                            <th style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <span>Due Date</span>
                                    <UnfoldMoreIcon
                                        onClick={() => this.handleOrder('DueDate')}
                                        style={{ padding: 2, borderRadius: 5, background: 'rgb(38, 131, 222)', color: 'white', margin: 3 }}
                                    />
                                </div>
                            </th>
                            <th style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>
                                <span>Actions</span>
                            </th>
                        </tr>
                    </thead>
                    {
                        this.props.groupByKey ?
                        Object.keys(groupByObject).map((key, i) => (
                            <tbody key={i}>
                                 <tr style={{ textAlign: 'center' }}>
                                    <div style={{ position: 'relative', left: 530, padding: 5 }}>
                                        <span style={{fontWeight: 'bold', borderBottom: '1px solid grey'}}>{key}</span>
                                    </div>
                                </tr>
                                {(groupByObject[key] || []).map(dataLists => listShow(dataLists))}
                            </tbody>
                        )) :
                        <tbody>
                            {(seperateTabData || []).map(dataLists => listShow(dataLists))}
                        </tbody>
                    }
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
