import React from "react";
import styles from "./backdrop.module.css";
import PropTypes, {func} from 'prop-types';

const Backdrop = (props) => (
    props.show ? <div className = {styles.Backdrop} onClick={props.clicked}></div> : null
);

Backdrop.propTypes = {
    clicked: func
};

export default Backdrop