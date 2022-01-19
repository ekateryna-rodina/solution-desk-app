import type { AppProps } from "next/app";
import { wrapper } from "../src/app/store";
import "../src/styles/base.css";
import "../src/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
