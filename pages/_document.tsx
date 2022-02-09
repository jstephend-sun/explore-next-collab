import { Html, Head, Main, NextScript } from 'next/document';

import Navbar from '../components/Navbar';

// Can be useful in the future maybe idk

export default function Document() {
  return (
    <Html data-theme="dracula">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
