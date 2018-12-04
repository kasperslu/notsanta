import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Snowflakes from './Snowflakes';
import config from '../../clientConfig';

class App extends React.PureComponent {
  render() {
    return (
      <div className="app">
        <Head>
          <title>You&apos;re not santa.</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          {config.gtm &&
            <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${config.gtm}');` }} />
          }
        </Head>

        <Snowflakes />

        <div className="header">
          <Link href="/"><a className="logo">Dear Not Santa...</a></Link>
        </div>

        <div className="mainSection">
          {this.props.children}
        </div>

        <div className="footer">
          <span>Built by <Link href="https://crowncode.it"><a>Rafał Świętek</a></Link> and designed by <Link href="https://dribbble.com/skasper"><a>Kasper Ślusarczyk</a></Link></span>
        </div>

        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css?family=Roboto:400,700');
          @import url('https://fonts.googleapis.com/css?family=Grand+Hotel');

          body {
            margin: 0;
            padding: 0;
            font-family: 'Roboto', sans-serif;
            -webkit-font-smoothing: antialiased;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            color: #FFF;
            background: #A63636;
            font-size: 14px;
          }

          h1, h2 {
            font-weight: 700;
            font-size: 14px;
            margin: 0 0 32px;
          }

          a {
            outline: none;
            text-decoration: none;
          }

          p {
            line-height: 32px;
            margin: 32px 0;
          }

          .header {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 100px 0 50px;
          }

          .logo {
            font-family: 'Grand Hotel', cursive;
            font-size: 42px;
            color: #FFF;
          }

          .app {
            position: relative;
            width: 100%;
            height: 100%;
          }

          .mainSection {
            position: relative;
            background-color: #33A98F;
            background-image:
              url(${require('../assets/animals.svg')}),
              url(${require('../assets/animals-ground.svg')}),
              radial-gradient(#A63636 0%, #A63636 68%, transparent 68%, transparent 100%);
            background-repeat: no-repeat, no-repeat, no-repeat;
            background-position: center calc(100% - 20px), bottom, center 30px;
            background-size: auto, auto, 40px 40px;
            max-width: 500px;
            margin: 0 auto 40px;
            padding: 110px 80px 280px;
            box-sizing: border-box;

            &::before, &::after {
              content: '';
              position: absolute;
              top: -100px;
              left: -100px;
              display: block;
              width: 0;
              height: 0;
              transform: rotate(45deg);
              border-width: 86px;
              border-style: solid;
              border-color: #A63636;
            }

            &::after {
              top: -100px;
              right: -100px;
              left: auto;
            }
          }

          .footer {
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            height: 40px;
            font-size: 10px;
            text-transform: uppercase;
            color: #FFB62E;

            a {
              color: #FFB62E;
              text-decoration: underline;
              letter-spacing: 1px;
            }
          }
        `}</style>
      </div>
    );
  }
};

export default App;
