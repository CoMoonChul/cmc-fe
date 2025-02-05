import type { AppProps, AppContext } from 'next/app';
import React, { useEffect } from 'react';
import Head from 'next/head';
import { LDP } from '../common/types';
import BrowserHelper from '../common/helper/browser.helper';

interface CustomPageProps {
  LDP: LDP;
}

export default function App({ Component, pageProps }: AppProps<CustomPageProps>) {
  useEffect(() => {
  }, []);

  // // 서버에 설정을 브라우저에서 사용 가능하도록 세팅
  // if (pageProps.LDP) {
  //   globalThis.LDP = pageProps.LDP;
  // }

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </Head>
      {/*
      <CmcToast />
      <CmcPopup /> */}
      <Component {...pageProps} />
    </>
  );
}

App.getInitialProps = async (context: AppContext) => {
  return {
    LDP: getInitialPropsFromServer(context),
  };
}


async function getInitialPropsFromServer(context: AppContext) {
  const { env } = process;
  const isServer = BrowserHelper.isServer();

  if (isServer) {
    globalThis.LDP = env.DEPLOY_ENV as LDP;
  }

  return globalThis.LDP;
}