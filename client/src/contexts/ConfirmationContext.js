import { createContext, useContext, useState, useRef } from 'react';
import ConfirmationModal from '../UI/ConfirmationModal';

const ConfirmationContext = createContext();

export const useConfirmation = () => {
    return useContext(ConfirmationContext);
};
export const ConfirmationProvider = ({ children }) => {
    const clickedButton = useRef(null);
    const [state, setState] = useState({ isOpen: false }); // This state is to pass to <Modal/>

    const confirmation = (data) => {
        return new Promise((resolve) => {
            // open Modal by changing isOpen state
            // insert received data (text, button label)
            setState({ ...data, isOpen: true });
            // return resolve(user's choice) and close modal
            clickedButton.current = (choice) => {
                resolve(choice); // return true or false when it's resolved
                setState({ isOpen: false }); // Closing the modal
            };
        });
    };
    const value = { confirmation };
    return (
        <ConfirmationContext.Provider value={value}>
            {children}
            <ConfirmationModal
                isOpen={state.isOpen}
                closeHandler={() => setState({ isOpen: false })}
                text={state.text}
                clickHandler={clickedButton.current}
                buttonLabel={state.buttonLabel}
            />
        </ConfirmationContext.Provider>
    );
};
