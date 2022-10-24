import type {AppProps} from 'next/app'
import {MantineProvider} from "@mantine/core";
import React from "react";
import {ModalsProvider} from "@mantine/modals";
import {RouterTransition} from "./RouteTransition";
import {NotificationsProvider} from '@mantine/notifications';

function Examblitz({Component, pageProps}: AppProps) {
    return <>
        <MantineProvider theme={{colorScheme: 'dark'}} withGlobalStyles withNormalizeCSS>
            <RouterTransition/>
            <NotificationsProvider>
                <ModalsProvider>
                    <Component {...pageProps} />
                </ModalsProvider>
            </NotificationsProvider>
        </MantineProvider>
    </>
}

export default Examblitz
