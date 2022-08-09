import type { AppProps } from "next/app";
import "../styles/global.css"

const NextApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default NextApp;
