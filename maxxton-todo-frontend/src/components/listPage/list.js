import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { getTaskList, editTask, deleteTask } from '../../redux/actionCreator';
import TaskModal from '../taskModalComponent/taskModal';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { Button } from '@material-ui/core';
import moment from 'moment';
import DeleteModal from '../deleteModalComponent/deleteModal';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import { sortByMapping, groupByMapping } from '../../constant/utils';
import styles from './list.style';

class ListPage extends Component {
    constructor(props) {
        super(props)
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
        e.stopPropagation()
        if (key === 'updateCurrentState') {
            dataLists['CurrentState'] === 'Pending' ? dataLists['CurrentState'] = 'Done' : dataLists['CurrentState'] = 'Pending'; 
            this.props.editTask(dataLists)
        } else {
            this.setState({
                [key]: true,
                taskDataObject: dataLists
            });
        }
    }

    handleSubmit = (payload) => {
        if (this.state.openEditTaskModal) {
            this.props.editTask(payload)
            this.setState({ openEditTaskModal: false })
        }
        if (this.state.openDeleteModal) {
            this.props.deleteTask(this.state.taskDataObject.id)
            this.setState({ openDeleteModal: false })
        }
    }

    handleOrder = (key) => {
        this.setState({
            isAscending: !this.state.isAscending,
            sortBy: key,
        })
        this.props.handleIsnewTaskAdded(false)
    }

    componentDidMount() {
        this.props.getTaskList()
    }

    render() {
        const { classes } = this.props;
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
        if (this.state.sortBy && !this.props.isnewTaskAdded) {
            seperateTabData = sortByMapping(this.state.sortBy, this.state.isAscending, seperateTabData)
        }

        if (this.props.searchText) {
            let filteredList = [...seperateTabData].filter((list) => {
                return list.Title.toLowerCase().indexOf(this.props.searchText.toLowerCase()) !== -1;
            })
            seperateTabData = filteredList
        }

        if(this.props.groupByKey) {
            groupByObject = groupByMapping(seperateTabData, this.props.groupByKey);
        }


        const listShow = (dataLists) => (
            <tr
                key={dataLists.id}
                onClick={(e) => this.handleTrClick(e, dataLists, 'openTaskReadOnlyModal')}
            >
                <td style={{border: '1px solid #dddddd', textAlign: 'left', maxWidth: 500, wordBreak: 'break-all', padding: 8, textDecoration: dataLists.CurrentState === 'Done' ? 'line-through' : 'none'}}>
                    {dataLists.Title}
                </td>
                <td style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8, textDecoration: dataLists.CurrentState === 'Done' ? 'line-through' : 'none'}}>
                    {dataLists.Priority}
                </td>
                <td style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8, textDecoration: dataLists.CurrentState === 'Done' ? 'line-through' : 'none'}}>
                    {moment(dataLists.CreatedAt).format("YYYY-MM-DD")}
                </td>
                <td style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8, textDecoration: dataLists.CurrentState === 'Done' ? 'line-through' : 'none'}}>
                    {((!dataLists.DueDate && !dataLists.DueTime) || (!dataLists.DueDate && dataLists.DueTime)) ? null : moment(dataLists.DueDate).format("YYYY-MM-DD") +"  "+ dataLists.DueTime}
                </td>
                <td className={classes.tableHeading}>
                    <div className={classes.actionButtonDiv}>
                        <EditOutlinedIcon
                            className={classes.editButton}
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
                            className={classes.deleteButton}
                        />
                    </div>
                </td>
            </tr>
        )

        return (
            <>
                <table className={classes.table}>
                    <thead>
                        <tr>
                            <th className={classes.tableHeading}>
                                <div className={classes.sortIconDiv}>
                                    <span>Summary</span> 
                                    <UnfoldMoreIcon
                                        onClick={() => this.handleOrder('Title')}
                                        className={classes.sortIcon}
                                    />
                                </div>
                            </th>
                            <th className={classes.tableHeading}>
                                <div className={classes.sortIconDiv}>
                                    <span>Priority</span>
                                    <UnfoldMoreIcon
                                        onClick={() => this.handleOrder('Priority')}
                                        className={classes.sortIcon}
                                    />
                                </div>
                            </th>
                            <th className={classes.tableHeading}>
                                <div className={classes.sortIconDiv}>
                                    <span>Created On</span>
                                    <UnfoldMoreIcon
                                        onClick={() => this.handleOrder('CreatedAt')}
                                        className={classes.sortIcon}
                                    />
                                </div>
                            </th>
                            <th className={classes.tableHeading}>
                                <div className={classes.sortIconDiv}>
                                    <span>Due Date</span>
                                    <UnfoldMoreIcon
                                        onClick={() => this.handleOrder('DueDate')}
                                        className={classes.sortIcon}
                                    />
                                </div>
                            </th>
                            <th className={classes.tableHeading}>
                                <span>Actions</span>
                            </th>
                        </tr>
                    </thead>
                    {
                        this.props.groupByKey ?
                        Object.keys(groupByObject).map((key, i) => (
                            <tbody key={i}>
                                 <tr className={classes.singleTR}>
                                    <div className={classes.rowHeadingDiv}>
                                        <span className={classes.rowHeading}>{key}</span>
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ListPage));
