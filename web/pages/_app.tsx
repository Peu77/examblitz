import type {AppProps} from 'next/app'
import {MantineProvider} from "@mantine/core";

function Examblitz({Component, pageProps}: AppProps) {
    return <>
        <MantineProvider theme={{colorScheme: 'dark'}} withGlobalStyles withNormalizeCSS>
                <Component {...pageProps} />
        </MantineProvider>
    </>
}

export default Examblitz
