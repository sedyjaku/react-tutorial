import React, {Fragment, useEffect, useRef, useState} from "react";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
    return (props) => {

        const [error, setError] = useState(null);

        let requestInterceptor = null;
        let responseInterceptor = null;

        const axiosInst = useRef(axios);

        useEffect(() => {
                console.log("registering interceptors");
                console.log(axiosInst.current.interceptors);
                requestInterceptor = axiosInst.current.interceptors.request.use(req => {
                    console.log("No error Error vole");
                    setError(null);
                    return req;
                }, error => error);
                responseInterceptor = axiosInst.current.interceptors.response.use(response => response, errorResponse => {
                    setError(errorResponse);
                    console.log("Error vole");
                    return errorResponse;
                });
                return () => {
                    axiosInst.current.interceptors.request.eject(requestInterceptor);
                    axiosInst.current.interceptors.response.eject(responseInterceptor);
                    console.log("Umouting interceptors");
                }
            },
            [WrappedComponent, error]
        );

        const clearError = () => {
            setError(null)
        };


        return <Fragment>
            <Modal show={error != null}
               modalClosed={() => setError(null)}>
                {/*modalClosed={clearError}*/}
                {error ? error.message : null}
            </Modal>
            <WrappedComponent {...props}/>
        </Fragment>
    }
};

export default withErrorHandler;
