import type { AppProps } from "next/app";

const NextApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default NextApp;
