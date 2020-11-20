import React from 'react';
import { Button } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core';
import styles from './deleteModal.styles';

function DeleteModal(props) {
    const { classes } = props;

    const handleSubmit = (e) => {
        props.handleModalSubmit()
        e.preventDefault()
    }

    const body = (
        <div className={classes.modalContainer}>
            <h3>{"Do you want to delete this task?"}</h3>
            <Button className={classes.noButton} onClick={props.handleClose}>
                No
            </Button>
            <Button className={classes.yesButton} onClick={handleSubmit}>
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

export default withStyles(styles)(DeleteModal);
