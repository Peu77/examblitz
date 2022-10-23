import Sidebar from "../dashboard/Sidebar"
import {createStyles} from "@mantine/core";
import React from "react";

type DashboardLayoutProps = {
    children: React.ReactNode,
};

const useStyles = createStyles((_) => ({
    container: {
        display: 'flex',
    }
}));

const Layout = ({children}: DashboardLayoutProps) => {
    const {classes, cx} = useStyles();
    return (
        <div className={cx(classes.container)}>
            <Sidebar/>

            <main>{children}</main>
        </div>
    )
}

export default Layout