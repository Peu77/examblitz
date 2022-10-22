import type {AppProps} from 'next/app'
import {MantineProvider} from "@mantine/core";
import {Provider} from "react-redux";
import {store} from "../src/store";

function Examblitz({Component, pageProps}: AppProps) {
    return <>
        <MantineProvider theme={{colorScheme: 'dark'}} withGlobalStyles withNormalizeCSS>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </MantineProvider>
    </>
}

export default Examblitz
