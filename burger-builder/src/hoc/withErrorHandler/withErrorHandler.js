import React, {Fragment, useEffect, useState} from "react";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
    return (props) => {

        const [error, setError] = useState(null);

        let requestInterceptor = null;
        let responseInterceptor = null;

        useEffect(() => {
                requestInterceptor = axios.interceptors.request.use(req => {
                    setError(null);
                    return req;
                }, error => error);
                responseInterceptor = axios.interceptors.response.use(response => response, errorResponse => {
                    setError(errorResponse);
                    return errorResponse;
                });
                return () => {
                    axios.interceptors.request.eject(requestInterceptor);
                    axios.interceptors.response.eject(responseInterceptor);
                    console.log("Umouting interceptors");
                }
            },
            [error]
        );

        const clearError = () => {
            setError(null)
        };


        return <Fragment>
            <Modal show={error != null} modalClosed={() => setError(null)}>

                {/*modalClosed={clearError}*/}
                {error ? error.message : null}
            </Modal>
            <WrappedComponent {...props}/>
        </Fragment>
    }
};

export default withErrorHandler;
