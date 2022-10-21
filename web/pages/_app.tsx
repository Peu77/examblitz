import {Provider} from "react-redux";
import {store} from "../src/store"
import {AppProps} from "next/app";
import { MantineProvider } from "@mantine/core";

function Examblitz({Component, pageProps}: AppProps) {

    return (
        <Provider store={store}>
            <MantineProvider theme={{colorScheme: 'dark'}} withGlobalStyles withNormalizeCSS>
                <Component {...pageProps} />
            </MantineProvider>
        </Provider>
    );
}

export default Examblitz;