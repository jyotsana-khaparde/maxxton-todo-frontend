import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import styles from './taskModal.style';
const uuid = require('uuid');

class TaskModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: (props.taskDataObject && props.taskDataObject.Title) || '',
            description: (props.taskDataObject && props.taskDataObject.Description) || '',
            dueDate: (props.taskDataObject && props.taskDataObject.DueDate) || null,
            priority: (props.taskDataObject && props.taskDataObject.Priority) || '',
            dueTime: (props.taskDataObject && props.taskDataObject.DueTime) || '',
            isTitleError: true,
            isDescriptionError: false
        }
    }

    validator = (key, value) => {
        if ((key === 'title' && value && value.length > 140) || (key === 'title' && value && value.length < 10)) {
            this.setState({ isTitleError: true })
        } else {
            this.setState({ isTitleError: false })
        }

        if ((key === 'description' && value && value.length > 500) || (key === 'description' && value && value.length < 10)) {
            this.setState({ isDescriptionError: true })
        } else {
            this.setState({ isDescriptionError: false })
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        },
        () => {
          this.validator(event.target.name, event.target.value);
        })
    }

    handleSubmit = (e) => {
        let payload;
        if (this.props.heading === 'Edit Task') {
            payload = {
                id: this.props.taskDataObject.id,
                CurrentState: this.props.taskDataObject.CurrentState,
                Title: this.state.title,
                Description: this.state.description,
                CreatedAt: this.props.taskDataObject.CreatedAt,
                DueDate: this.state.dueDate,
                DueTime: this.state.dueTime,
                Priority: this.state.priority
            }
        }
        if (this.props.heading === 'Add Task') {
            payload = {
                id: uuid.v4(),
                CurrentState: 'Pending',
                Title: this.state.title,
                Description: this.state.description,
                CreatedAt: new Date(),
                DueDate: this.state.dueDate,
                DueTime: this.state.dueTime,
                Priority: this.state.priority
            }
        }
        this.props.handleModalSubmit(payload)
        e.preventDefault()
    }

    render() {
        const { classes } = this.props
        const body = (
            <div className={classes.modalContainer}>
              <h3>{this.props.heading}</h3>  
            <form onSubmit={this.handleSubmit}>
                <label>Title</label><br/>
                <input
                    readOnly={this.props.heading === 'View Task'}
                    name='title' 
                    value={this.state.title} 
                    onChange={this.handleChange} 
                    placeholder='Title' 
                    className={classes.title} 
                /><br/>
                <label>Description</label><br/>
                <textarea
                    readOnly={this.props.heading === 'View Task'} 
                    name='description' 
                    value={this.state.description} 
                    onChange={this.handleChange} 
                    placeholder='Description' 
                    className={classes.description} 
                /><br/>
                <div className={classes.textFieldDiv}>
                    <div className={classes.innerInput}>
                        <div>
                            <label>Due Date</label><br/>
                            <TextField
                                className={classes.dueDate}
                                name='dueDate'
                                type="date"
                                value={this.state.dueDate}
                                onChange={this.handleChange}
                                InputProps={{
                                    readOnly: this.props.heading === 'View Task', // if it is view modal then only readOnly will be true
                                }}
                            />
                        </div>
                        <div>
                            <label>Time</label><br/>
                            <TextField
                                className={classes.dueTime}
                                name='dueTime'
                                type="time"
                                value={this.state.dueTime}
                                onChange={this.handleChange}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <label>Priority</label><br/>
                        <select
                            disabled={this.props.heading === 'View Task'} 
                            name='priority' 
                            className={classes.select}
                            value={this.state.priority} 
                            onChange={this.handleChange}
                        >
                            <option style={{ display:'none' }}/>
                            <option value="None">None</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                </div>
                <div className={classes.buttonContainer}>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        className={classes.cancelButton} 
                        onClick={this.props.handleClose}
                    >
                        Cancel
                    </Button>
                    {
                        this.props.heading !== 'View Task' &&
                        <Button 
                            type="submit"
                            variant="contained" 
                            style={{background: (this.state.isTitleError || this.state.isDescriptionError) ? 'grey' : 'rgb(69 173 93)', color: 'white', padding: 5, margin: 4}}
                            disabled={this.state.isTitleError || this.state.isDescriptionError} 
                        >
                            Save
                        </Button>
                    }
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

export default withStyles(styles)(TaskModal);
