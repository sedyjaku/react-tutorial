import React from "react";

import styles from "./buildControl.module.css"
import PropTypes from 'prop-types';

const BuildControl = (props) => (
    <div className={styles.BuildControl}>
        <div className={styles.Label}>{props.label}</div>
        <button className={styles.Less} onClick={props.removed}>Less</button>
        <button className={styles.More} onClick={props.added}>More</button>
    </div>
);

BuildControl.propTypes = {
    removed: PropTypes.func,
    added: PropTypes.func,
    label: PropTypes.string
};

export default BuildControl;