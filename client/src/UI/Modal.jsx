import React, { useEffect } from 'react';
import { X } from 'react-bootstrap-icons';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import IconButton from './IconButton';

const StyledModal = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => `${theme.colors.darkGray}cc`};
`;

const StyledModalContent = styled.div`
    background-color: ${({ theme }) => `${theme.colors.white}`};
    border-radius: ${({ theme }) => theme.borderRadius.m};
    min-width: 600px;
    min-height: 400px;
    padding: ${({ theme }) => theme.spacing.m};
`;
// const StyledClosingLayer = styled.div`
//     position: fixed;
//     top: 0;
//     bottom: 0;
//     left: 0;
//     right: 0;
// `;

const Modal = ({ isOpen, closeHandler, children }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }
    return createPortal(
        <StyledModal>
            <StyledModalContent>
                <IconButton onClick={closeHandler}>
                    <X size={30} />
                </IconButton>
                <div>{children}</div>
            </StyledModalContent>
        </StyledModal>,
        document.getElementById('portal')
    );
};

export default Modal;
