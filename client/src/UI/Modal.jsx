import React, { useEffect } from 'react';
import { X } from 'react-bootstrap-icons';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import IconButton from './IconButton';

const StyledModalContent = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 600px;
    min-height: 400px;
    border-radius: ${({ theme }) => theme.borderRadius.m};
    background-color: ${({ theme }) => `${theme.colors.white}`};
    padding: ${({ theme }) => theme.spacing.m};
`;
const StyledClosingLayer = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${({ theme }) => `${theme.colors.darkGray}cc`};
`;

const Modal = ({ isOpen, closeHandler, children }) => {
    useEffect(() => {
        if (!isOpen) {
            document.body.style.overflow = 'unset';
        } else {
            document.body.style.overflow = 'hidden';
        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }
    return createPortal(
        <>
            <StyledClosingLayer onClick={closeHandler} />
            <StyledModalContent>
                <IconButton onClick={closeHandler}>
                    <X size={30} />
                </IconButton>
                <div>{children}</div>
            </StyledModalContent>
        </>,
        document.getElementById('portal')
    );
};

export default Modal;
