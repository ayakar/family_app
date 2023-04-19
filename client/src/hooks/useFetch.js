import { useCallback, useState } from 'react';
// import { useLocation } from 'react-router-dom';

const useFetch = () => {
    // const location = useLocation();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const fetchData = useCallback(
        async (url, options = {}, callback = null) => {
            setIsLoading(true);
            setIsSuccess(false);
            setErrorMessage(null);

            try {
                const token = localStorage.getItem('token');
                const authHeaders = { Authorization: token, 'Content-Type': 'application/json' };
                const optionsWithHeader = { ...options, headers: { ...options.headers, ...authHeaders } };
                const res = await fetch(url, optionsWithHeader);
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(res.status);
                }
                console.log('data', data);

                setData(data);

                if (callback) {
                    callback(data);
                }

                setIsSuccess(true);
            } catch (error) {
                if (error.message === '403') {
                    //TODO: redirect to signIn page return (window.location = `/signIn/?next=${location.pathname}`);
                }
                setErrorMessage('Something went wrong. Please try again.');
                setIsSuccess(false);
            }

            setIsLoading(false);
        },
        []
        // [location.pathname]
    );

    return { data, errorMessage, isLoading, isSuccess, fetchData };
};

export default useFetch;
