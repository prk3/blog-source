import Head from 'next/head';

import '../styles/variables.css';
import '../styles/global.css';

import '../styles/post.css';
import '../styles/tag-page.css';
import '../styles/index.css';

import '../styles/post-preview.css';
import '../styles/code.css';
import '../styles/post-header.css';
import '../styles/post-header-img.css';
import '../styles/post-footer.css';
import '../styles/post-ref.css';
import '../styles/tag.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>

        {/* favicon references, thanks https://realfavicongenerator.net */}
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png" />
        <link rel="manifest" href="/assets/site.webmanifest" />
        <link rel="mask-icon" href="/assets/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/assets/favicon.ico" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="msapplication-config" content="/assets/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />

        {/* fonts */}
        <link href="https://fonts.googleapis.com/css?family=Source+Serif+Pro:400,700&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
