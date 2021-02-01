import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getTaskList, editTask, deleteTask } from '../../redux/actionCreator';
import TaskModal from '../taskModalComponent/taskModal';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { Button } from '@material-ui/core';
import moment from 'moment';
import DeleteModal from '../deleteModalComponent/deleteModal';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import { sortByMapping, groupByMapping } from '../../constant/utils';
import '../styles/list.scss';

interface IListPageProps {
    deleteTask: (value: object) => void;
    editTask: (value: object) => void;
    getTaskList: () => void;
    groupByKey: string;
    handleIsnewTaskAdded: (value: boolean) => void;
    isnewTaskAdded: boolean;
    searchText: string;
    tabNumber: number;
    taskList: any[];
};

interface IdataList {
    id: string,
    CurrentState: 'Pending' | 'Done',
    Title: string,
    Description: string,
    CreatedAt: string,
    DueDate: string,
    DueTime: string,
    Priority: string,
}
  
interface IListPageState {
    openTaskReadOnlyModal: boolean,
    openEditTaskModal: boolean,
    openDeleteModal: boolean,
    taskDataObject: any,
    updateCurrentState: boolean,
    isAscending: boolean,
    sortBy: string,
};

interface IEvent {
    [key: string]: any
}

interface MyGroupType {
    [key: string]: IdataList;
}

class ListPage extends Component<IListPageProps, IListPageState> {
    constructor(props: IListPageProps) {
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

    handleTrClick = (e: IEvent, dataLists: IdataList, key: any) => {
        e.stopPropagation()
        if (key === 'updateCurrentState') {
            dataLists['CurrentState'] === 'Pending' ? dataLists['CurrentState'] = 'Done' : dataLists['CurrentState'] = 'Pending'; 
            this.props.editTask(dataLists)
        } else {
            // @ts-ignore
            this.setState({
                [key]: true,
                taskDataObject: dataLists
            });
        }
    }

    handleSubmit = (payload: IdataList) => {
        if (this.state.openEditTaskModal) {
            this.props.editTask(payload)
            this.setState({ openEditTaskModal: false })
        }
    }

    handleDeleteSubmit = () => {
        if (this.state.openDeleteModal) {
            this.props.deleteTask(this.state.taskDataObject.id)
            this.setState({ openDeleteModal: false })
        }
    }

    handleOrder = (key: string) => {
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
        let seperateTabData: IdataList[] = [];
        let groupByObject: MyGroupType = {};
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
            //@ts-ignore
            seperateTabData = sortByMapping(this.state.sortBy, this.state.isAscending, seperateTabData)
        }

        if (this.props.searchText) {
            let filteredList = [...seperateTabData].filter((list) => {
                return list.Title.toLowerCase().indexOf(this.props.searchText.toLowerCase()) !== -1;
            })
            seperateTabData = filteredList
        }

        if(this.props.groupByKey) {
            //@ts-ignore
            groupByObject = groupByMapping(seperateTabData, this.props.groupByKey);
        }


        const listShow = (dataLists: IdataList)  => (
            <tr
                key={dataLists.id}
                onClick={(e) => this.handleTrClick(e, dataLists, 'openTaskReadOnlyModal')}
            >
                <td className={ dataLists.CurrentState === 'Done' ? 'doneData' :  'undoneData' }>
                    {dataLists.Title}
                </td>
                <td className={ dataLists.CurrentState === 'Done' ? 'doneHeading' : 'undoneHeading' }>
                    {dataLists.Priority}
                </td>
                <td className={ dataLists.CurrentState === 'Done' ? 'doneHeading' : 'undoneHeading' }>
                    {moment(dataLists.CreatedAt).format("YYYY-MM-DD")}
                </td>
                <td className={ dataLists.CurrentState === 'Done' ? 'doneHeading' : 'undoneHeading' }>
                    {((!dataLists.DueDate && !dataLists.DueTime) || (!dataLists.DueDate && dataLists.DueTime)) ? null : moment(dataLists.DueDate).format("YYYY-MM-DD") +"  "+ dataLists.DueTime}
                </td>
                <td className='tableHeading'>
                    <div className='actionButtonDiv'>
                        <EditOutlinedIcon
                            className='editButton'
                            onClick={(e) => this.handleTrClick(e, dataLists, 'openEditTaskModal')}
                        />
                        <Button
                            variant="contained"
                            className={ dataLists.CurrentState === 'Done' ? 'doneButton' : 'reOpenButton' }
                            onClick={(e) => this.handleTrClick(e, dataLists, 'updateCurrentState')}
                        >
                            {dataLists.CurrentState === 'Pending' ? 'Done' : 'Re-Open'}
                        </Button>
                        <DeleteOutlineOutlinedIcon
                            onClick={(e) => this.handleTrClick(e, dataLists, 'openDeleteModal')}
                            className='deleteButton'
                        />
                    </div>
                </td>
            </tr>
        )

        return (
            <>
                <table className='table'>
                    <thead>
                        <tr>
                            <th className='tableHeading'>
                                <div className='sortIconDiv'>
                                    <span>Summary</span> 
                                    <UnfoldMoreIcon
                                        onClick={() => this.handleOrder('Title')}
                                        className='sortIcon'
                                    />
                                </div>
                            </th>
                            <th className='tableHeading'>
                                <div className='sortIconDiv'>
                                    <span>Priority</span>
                                    <UnfoldMoreIcon
                                        onClick={() => this.handleOrder('Priority')}
                                        className='sortIcon'
                                    />
                                </div>
                            </th>
                            <th className='tableHeading'>
                                <div className='sortIconDiv'>
                                    <span>Created On</span>
                                    <UnfoldMoreIcon
                                        onClick={() => this.handleOrder('CreatedAt')}
                                        className='sortIcon'
                                    />
                                </div>
                            </th>
                            <th className='tableHeading'>
                                <div className='sortIconDiv'>
                                    <span>Due Date</span>
                                    <UnfoldMoreIcon
                                        onClick={() => this.handleOrder('DueDate')}
                                        className='sortIcon'
                                    />
                                </div>
                            </th>
                            <th className='tableHeading'>
                                <span>Actions</span>
                            </th>
                        </tr>
                    </thead>
                    {
                        this.props.groupByKey ?
                        Object.keys(groupByObject).map((key, i) => (
                            <tbody key={i}>
                                 <tr className='singleTR'>
                                    <div className='rowHeadingDiv'>
                                        <span className='rowHeading'>{key}</span>
                                    </div>
                                </tr>
                                {
                                    //@ts-ignore
                                    (groupByObject[key] || []).map(dataLists => listShow(dataLists))
                                }
                            </tbody>
                        )) :
                        <tbody>
                            {(seperateTabData || []).map(dataLists => listShow(dataLists))}
                        </tbody>
                    }
                </table>
                {this.state.openTaskReadOnlyModal && 
                //@ts-ignore
                <TaskModal
                    open={this.state.openTaskReadOnlyModal}
                    handleClose={() => this.setState({ openTaskReadOnlyModal: false })}
                    heading={'View Task'}
                    taskDataObject={this.state.taskDataObject}
                />}
                {this.state.openEditTaskModal && 
                <TaskModal
                    open={this.state.openEditTaskModal}
                    handleClose={() => this.setState({ openEditTaskModal: false })}
                    heading={'Edit Task'}
                    taskDataObject={this.state.taskDataObject}
                    handleModalSubmit={this.handleSubmit}
                />}
                {this.state.openDeleteModal && 
                <DeleteModal
                    open={this.state.openDeleteModal}
                    handleClose={() => this.setState({ openDeleteModal: false })}
                    handleModalSubmit={this.handleDeleteSubmit}
                />}
            </>
        )
    }
}

const mapStateToProps = (state: IListPageProps) => {
    return {
        taskList: state.taskList
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getTaskList: () => dispatch(getTaskList()),
        editTask: (payload: object) => dispatch(editTask(payload)),
        deleteTask: (payload: object) => dispatch(deleteTask(payload))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
