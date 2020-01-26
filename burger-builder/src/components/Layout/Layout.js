import React, {Fragment} from "react";
import "./Layout.css"

const Layout = (props) => (
    <Fragment>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className="Content">{props.children}
        </main>
    </Fragment>
);

export default Layout;