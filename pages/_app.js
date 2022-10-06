import { useEffect } from "react";
import {
  GrowthBook,
  GrowthBookProvider
} from "@growthbook/growthbook-react";
import Cookies from "js-cookie";

import '../styles/globals.css'

const setUserId = () => {
  const userId =
    Cookies.get("userId") ||
    [...Array(30)].map(() => Math.random().toString(36)[2]).join("");

  Cookies.set("userId", userId, { expires: 7 });
  return userId;
};

const growthbook = new GrowthBook();
const FEATURES_ENDPOINT = "http://localhost:3100/api/features/key_prod_7f8a345052b973dc"

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    setUserId()
  }, [])

  useEffect(() => {
    fetch(FEATURES_ENDPOINT)
      .then((res) => res.json())
      .then((json) => {
        growthbook.setFeatures(json.features);
      })
      .catch(() => {
        console.log("Failed to fetch feature definitions from GrowthBook");
      });

    growthbook.setAttributes({
      id: Cookies.get('userId'),
    })
  }, [])


  return (
    <GrowthBookProvider growthbook={growthbook}>
      <Component {...pageProps} />
    </GrowthBookProvider>
  )
}

export default MyApp
