import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId="841057744768-lo34njlao9drkdnnbr0rhs9oqt9e53ku.apps.googleusercontent.com">
        <Component {...pageProps} />
        <Toaster/>
    </GoogleOAuthProvider>  );
}
