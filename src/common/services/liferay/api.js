import { Liferay } from "./liferay";

const { REACT_APP_LIFERAY_HOST = window.location.origin } = process.env;

const baseFetch = async (url, options = {}) => {
  const response = await fetch(REACT_APP_LIFERAY_HOST + "/" + url, {
    headers: {
      "Content-Type": "application/json",
      "x-csrf-token": Liferay.authToken,
    },
    ...options,
  });

  if (options.method !== "DELETE") {
    return response.json();
  }
};

export default baseFetch;
