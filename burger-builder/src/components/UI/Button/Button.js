import React from "react";

import styles from "./button.module.css";
import PropTypes, {func, string} from 'prop-types';

const Button = (props) => (
    <button
        className={[styles.Button, props.buttonType].join(' ')}
        onClick={props.clicked}>
        {props.children}
    </button>
);

Button.propTypes = {
    buttonType: string,
    clicked: func,
    children: string
};

export default Button;