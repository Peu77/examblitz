import Sidebar from "../sidebar"
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

const DashboardLayout = ({children}: DashboardLayoutProps) => {
    const {classes, cx} = useStyles();

    return (
        <div className={cx(classes.container)}>
            <Sidebar/>
            <main>{children}</main>
        </div>
    )
}

export default DashboardLayout