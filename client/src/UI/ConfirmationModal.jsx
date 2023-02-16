import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import Modal from './Modal';

const StyledButtonWrap = styled.div`
    justify-content: center;
    display: flex;
    gap: ${({ theme }) => theme.spacing.xs};
`;

const ConfirmationModal = ({ isOpen, closeHandler, text, buttonLabel, clickHandler }) => {
    return (
        <Modal
            isOpen={isOpen}
            closeHandler={closeHandler}
            title={text}
        >
            <StyledButtonWrap>
                <Button
                    variant="contain"
                    color="lightRed"
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
            </StyledButtonWrap>
        </Modal>
    );
};

export default ConfirmationModal;
