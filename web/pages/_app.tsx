import type {AppProps} from 'next/app'
import {MantineProvider} from "@mantine/core";
import React from "react";
import {ModalsProvider} from "@mantine/modals";

function Examblitz({Component, pageProps}: AppProps) {
    return <>
        <MantineProvider theme={{colorScheme: 'dark'}} withGlobalStyles withNormalizeCSS>
            <ModalsProvider>
                <Component {...pageProps} />
            </ModalsProvider>
        </MantineProvider>
    </>
}

export default Examblitz
