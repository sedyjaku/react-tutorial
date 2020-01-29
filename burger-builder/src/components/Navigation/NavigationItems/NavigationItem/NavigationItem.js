import React from "react";
import styles from "./navigationItem.module.css";
import PropTypes, {bool} from 'prop-types';

const NavigationItem = (props) => (
    <li className={styles.NavigationItem}>
        <a
            href={props.link}
            className={props.active ? styles.active : null}>
            {props.children}</a>
    </li>
);

NavigationItem.propTypes = {
    active: bool,
    link: PropTypes.string,
    children: PropTypes.string
};

export default NavigationItem;