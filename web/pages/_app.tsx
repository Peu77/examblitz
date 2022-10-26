import type {AppProps} from 'next/app'
import {MantineProvider} from "@mantine/core";
import React from "react";
import {ModalsProvider} from "@mantine/modals";
import {RouterTransition} from "./RouteTransition";
import {NotificationsProvider} from '@mantine/notifications';
import {useRouter} from "next/router";
import DashboardLayout from "../components/layouts/dashboard";

function Examblitz({Component, pageProps}: AppProps) {
    const router = useRouter();

    const Layout = router.pathname.startsWith("/dashboard") ? DashboardLayout : React.Fragment;

    return <>
        <MantineProvider theme={{colorScheme: 'dark'}} withGlobalStyles withNormalizeCSS>
            <RouterTransition/>
            <NotificationsProvider>
                <ModalsProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ModalsProvider>
            </NotificationsProvider>
        </MantineProvider>
    </>
}

export default Examblitz
