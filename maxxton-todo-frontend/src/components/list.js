import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getTaskList } from '../actions/todo-actions';
import TaskModal from '../components/add-task-form';

class ListPage extends Component {
    constructor(props) {
        super(props)
        console.log(' props.taskList  ;;;;;;;', props.taskList );
        this.state = {
            openTaskReadOnlyModal: false,
            readOnlyData: {}
        }
    }

    handleTrClick = (dataLists) => {
        console.log('dataLists:-----', dataLists);
        this.setState({
            openTaskReadOnlyModal: true,
            readOnlyData: dataLists
        })
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
                        {this.props.taskList.reverse().map(dataLists => (
                                <tr onClick={() => this.handleTrClick(dataLists)}>
                                    <td style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>{dataLists.Title}</td>
                                    <td style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>{dataLists.Priority}</td>
                                    <td style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>{dataLists.CreatedAt}</td>
                                    <td style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>{dataLists.DueDate}</td>
                                    <td style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>{'done'}</td>
                                </tr>
                        ))}
                    </tbody>
                </table>
                {this.state.openTaskReadOnlyModal && <TaskModal
                    open={this.state.openTaskReadOnlyModal}
                    handleClose={() => this.setState({ openTaskReadOnlyModal: false })}
                    heading='View Task'
                    taskDataObject={this.state.readOnlyData}
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
        getTaskList: () => dispatch(getTaskList())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
