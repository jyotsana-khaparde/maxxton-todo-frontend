import React from 'react';
import { Button } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import '../styles/deleteModal.scss';

interface IDeleteModalProps {
    handleClose: () => void;
    handleModalSubmit: () => void;
    open: boolean;
};

interface ISubmitEvent {
    [propsName: string]: any
}

const DeleteModal: React.FC<IDeleteModalProps> = (props: IDeleteModalProps) => {

    const handleSubmit = (e: ISubmitEvent) => {
        props.handleModalSubmit()
        e.preventDefault()
    }

    const body = (
        <div className='modalContainer'>
            <h3>{"Do you want to delete this task?"}</h3>
            <Button className='noButton' onClick={props.handleClose}>
                No
            </Button>
            <Button className='yesButton' onClick={handleSubmit}>
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
