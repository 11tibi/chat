import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Head from "next/head";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Chat</title>
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
