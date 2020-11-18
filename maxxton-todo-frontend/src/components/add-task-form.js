import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import moment from 'moment';
const uuid = require('uuid');

class TaskModal extends Component {
    constructor(props) {
        super(props)
        console.log('TaskModal props--->', props);
        this.state = {
            title: props.taskDataObject && props.taskDataObject.Title || '',
            description: props.taskDataObject && props.taskDataObject.Description || '',
            dueDate: props.taskDataObject && props.taskDataObject.DueDate || '',
            priority: props.taskDataObject && props.taskDataObject.Priority || ''
        }
    }

    handleChange = (event) => {
        console.log('handleChange ---',event.target.name, event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (e) => {
        let payload;
        console.log('this.props.heading----', this.props.heading, typeof this.props.heading);
        if (this.props.heading === 'Edit Task') {
            payload = {
                id: this.props.taskDataObject.id,
                CurrentState: this.props.taskDataObject.CurrentState,
                Title: this.state.title,
                Description: this.state.description,
                CreatedAt: this.props.taskDataObject.CreatedAt,
                DueDate: this.state.dueDate,
                Priority: this.state.priority
            }
            console.log('payload inside Edit Task handleSubmit modal ->', payload);
        }
        if (this.props.heading === 'Add Task') {
            payload = {
                id: uuid.v4(),
                CurrentState: 'Pending',
                Title: this.state.title,
                Description: this.state.description,
                CreatedAt: moment(new Date()).format("MMMM DD, YYYY"),
                DueDate: this.state.dueDate,
                Priority: this.state.priority
            }
            console.log('payload inside Add Task handleSubmit modal ->', payload);
        }
        this.props.handleModalSubmit(payload)
        e.preventDefault()
    }

    render() {
        const body = (
            <div style={{
                position: 'absolute',
                width: 600,
                backgroundColor: 'white',
                margin: '160px 0px 0px 400px',
                padding: 10
            }}>
              <h3>{this.props.heading}</h3>  
            <form onSubmit={this.handleSubmit}>
                <label>Title</label><br/>
                <input readOnly={this.props.heading === 'View Task'} name='title' value={this.state.title} onChange={this.handleChange} placeholder='Title' style={{padding: 5, margin: '6px 0px 6px 0px', width: 588}} /><br/>
                <label>Description</label><br/>
                <textarea readOnly={this.props.heading === 'View Task'} name='description' value={this.state.description} onChange={this.handleChange} placeholder='Description' style={{padding: 5, margin: '6px 0px 6px 0px', width: 588, height: 100}} /><br/>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <label>Due Date</label><br/>
                        <TextField
                            style={{padding: 5, margin: '6px 0px 6px 0px'}}
                            name='dueDate'
                            id="datetime-local"
                            type="datetime-local"
                            value={this.state.dueDate}
                            onChange={this.handleChange}
                            InputProps={{
                                readOnly: this.props.heading === 'View Task', // if it is view modal then only readOnly will be true
                            }}
                        />
                    </div>
                    <div>
                        <label>Priority</label><br/>
                        <select disabled={this.props.heading === 'View Task'} name='priority' style={{padding: 5, margin: '15px 0px 0px 0px', width: 294}} value={this.state.priority} onChange={this.handleChange}>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="None">None</option>
                        </select>
                    </div>
                </div>
                <div style={{textAlign: 'end'}}>
                    <Button type="submit" variant="contained" style={{padding: 5, margin: 4, color: 'white', background: 'grey'}} onClick={this.props.handleClose}>
                        Cancel
                    </Button>
                    {this.props.heading !== 'View Task' && <Button type="submit" variant="contained" style={{background: 'rgb(69 173 93)', color: 'white', padding: 5, margin: 4}}>
                        Save
                    </Button>}
                </div>
            </form>
            </div>
        )
        return (
            <Modal
                open={this.props.open}
                onClose={this.props.handleClose}
            >
                {body}
            </Modal>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
};

export default connect(null, mapDispatchToProps)(TaskModal);
