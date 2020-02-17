import React from "react";
import styles from "./navigationItem.module.css";
import PropTypes, {bool} from 'prop-types';
import {NavLink} from "react-router-dom";

const NavigationItem = (props) => (
    <li className={styles.NavigationItem}>
        <NavLink
            activeClassName={styles.active}
            exact
            to={props.link}>
            {props.children}</NavLink>
    </li>
);

NavigationItem.propTypes = {
    active: bool,
    link: PropTypes.string,
    children: PropTypes.string
};

export default NavigationItem;