import React from "react";

import styles from "./button.module.css";
import PropTypes, {func, string} from 'prop-types';

const Button = (props) => {
    let buttonTypeStyle = null;
    switch (props.buttonType){
        case "Danger":
            buttonTypeStyle = styles.Danger;
            break;
        case "Success":
            buttonTypeStyle = styles.Success;
            break;
        default:
            break;
    }

    return <button
        className={[styles.Button, buttonTypeStyle].join(' ')}
        onClick={props.clicked}>
        {props.children}
    </button>
};

Button.propTypes = {
    buttonType: string,
    clicked: func,
    children: string
};

export default Button;