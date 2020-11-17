import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

class TaskModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            DueDate: '2017-05-24T10:30',
            Priority: ''
        }
    }

    handleChange = (event) => {
        console.log('handleChange ---',event.target.name, event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = () => {
        console.log('handleSubmit done')
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
                <input name='title' value={this.state.title} onChange={this.handleChange} placeholder='Title' style={{padding: 5, margin: '6px 0px 6px 0px', width: 588}} /><br/>
                <label>Description</label><br/>
                <textarea name='description' value={this.state.description} onChange={this.handleChange} placeholder='Description' style={{padding: 5, margin: '6px 0px 6px 0px', width: 588}} /><br/>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <label>Due Date</label><br/>
                        <TextField
                            style={{padding: 5, margin: '6px 0px 6px 0px'}}
                            name='DueDate'
                            id="datetime-local"
                            type="datetime-local"
                            value={this.state.DueDate}
                            InputLabelProps={{
                            shrink: true,
                            }}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label>Priority</label><br/>
                        <select name='Priority' style={{padding: 5, margin: '15px 0px 0px 0px', width: 294}} value={this.state.Priority} onChange={this.handleChange}>
                            <option value="grapefruit">Low</option>
                            <option value="lime">Medium</option>
                            <option value="coconut">High</option>
                            <option value="mango">None</option>
                        </select>
                    </div>
                </div>
                <div style={{textAlign: 'end'}}>
                    <Button type="submit" variant="contained" style={{padding: 5, margin: 4}}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" style={{background: 'rgb(69 173 93)', color: 'white', padding: 5, margin: 4}}>
                        Save
                    </Button>
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

export default TaskModal;
