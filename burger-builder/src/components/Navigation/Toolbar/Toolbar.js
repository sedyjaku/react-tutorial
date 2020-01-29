import React from "react";
import styles from "./toolbar.module.css"
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../DrawerToggle/DrawerToggle";
import PropTypes, {func} from 'prop-types';

const Toolbar = (props) => (
    <header className = {styles.Toolbar}>
        <DrawerToggle clicked = {props.showMenu}/>
        <div className={styles.Logo}>
            <Logo/>
        </div>
        <nav className={styles.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
);

Toolbar.propTypes = {
    showMenu: func
};

export default Toolbar;