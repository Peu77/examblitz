import Sidebar from "../dashboard/Sidebar"
import {createStyles} from "@mantine/core";

type DashboardLayoutProps = {
    children: React.ReactNode,
};

const useStyles = createStyles((theme) => ({
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