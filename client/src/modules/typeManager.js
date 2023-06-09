import { getToken } from "./authManager";

const apiUrl = "/api/Type";

export const getAllTypes = () => {
  return getToken().then((token) => {
    return fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get types.",
        );
      }
    });
  });
};