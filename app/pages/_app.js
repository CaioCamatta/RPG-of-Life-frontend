import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/global.css";
// CSS can only be directly imported here. In components you have to use
//    styles.classname

// Top-level component which is common accross all pages
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
