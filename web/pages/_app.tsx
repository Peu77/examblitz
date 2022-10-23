import type {AppProps} from 'next/app'
import {MantineProvider} from "@mantine/core";
import Layout from "../components/layouts/layout";
import {useRouter} from "next/router";
import React from "react";

function Examblitz({Component, pageProps}: AppProps) {
    const router = useRouter();
    const DashboardLayout = router.pathname.startsWith("/dashboard") ? Layout : React.Fragment;

    return <>
        <MantineProvider theme={{colorScheme: 'dark'}} withGlobalStyles withNormalizeCSS>
            <DashboardLayout>
                <Component {...pageProps} />
            </DashboardLayout>
        </MantineProvider>
    </>
}

export default Examblitz
