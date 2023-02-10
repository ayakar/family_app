import React from 'react';
import Button from './Button';
import Modal from './Modal';

const ConfirmationModal = ({ isOpen, closeHandler, text, buttonLabel, clickHandler }) => {
    return (
        <Modal
            isOpen={isOpen}
            closeHandler={closeHandler}
        >
            <div>{text}</div>
            <Button
                variant="contain"
                color="lightGreen"
                onClick={() => clickHandler(true)}
            >
                {buttonLabel}
            </Button>
            <Button
                variant="outlined"
                color="green"
                onClick={() => clickHandler(false)}
            >
                Cancel
            </Button>
        </Modal>
    );
};

export default ConfirmationModal;
