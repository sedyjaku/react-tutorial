import React, {Fragment} from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import styles from "./sidedrawer.module.css"
import Backdrop from "../../UI/Backdrop/Backdrop";
import {bool, func} from 'prop-types';

const SideDrawer = (props) => {
    const attachedStyles = [styles.SideDrawer];
    if (props.show) {
        attachedStyles.push(styles.Open)
    } else {
        attachedStyles.push(styles.Close)
    }
    return (
        <Fragment>
            <Backdrop show={props.show} clicked={props.closed}/>
            <div className={attachedStyles.join(' ')}>
                <div className={styles.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Fragment>
    )
};

SideDrawer.propTypes = {
    show: bool,
    closed: func
};

export default SideDrawer;