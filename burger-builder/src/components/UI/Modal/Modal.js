import React, {Fragment, useEffect} from "react";
import styles from  "./modal.module.css"
import Backdrop from "../Backdrop/Backdrop";
import PropTypes, {bool, func, object, string} from 'prop-types';

const Modal = React.memo((props) => {

    useEffect(() => {
        console.log("Modal rendering")
    });
    return <Fragment>
        <Backdrop show={props.show} clicked={props.modalClosed}/>
        <div className={styles.Modal} style={{
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.show ? '1' : '0'
        }}>
            {/*{props.children}*/}
        </div>
    </Fragment>
});

Modal.propTypes = {
    show: bool,
    modalClosed: func,
    children: object
};

export default Modal;