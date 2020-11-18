import React from 'react';
import { Button } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';

function DeleteModal(props) {

    const handleSubmit = (e) => {
        props.handleModalSubmit()
        e.preventDefault()
    }

    const body = (
        <div style={{
            position: 'absolute',
            width: 400,
            backgroundColor: 'white',
            margin: '200px 0px 0px 425px',
            padding: 10,
            textAlign: 'center'
        }}>
            <h3>{"Do you want to delete this task?"}</h3>
            <Button style={{padding: 5, margin: 4, color: 'white', background: 'grey'}} onClick={props.handleClose}>
                No
            </Button>
            <Button style={{padding: 5, margin: 4, color: 'white', background: 'rgb(69 173 93)'}} onClick={handleSubmit}>
                Yes
            </Button>
        </div>
    )
    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
        >
            {body}
        </Modal>
    )
}

export default DeleteModal;
