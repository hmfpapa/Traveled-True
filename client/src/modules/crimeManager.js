import { getToken } from "./authManager";

const apiUrl = "/api/crime";

export const getAllCrimes = () => {
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
          "An unknown error occurred while trying to get crimes.",
        );
      }
    });
  });
};

export const getCrime = (id) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get quotes.",
        );
      }
    });
  });
};

// export const addCrime = (crime) => {
//   return getToken().then((token) => {
//     return fetch(apiUrl, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(crime),
//     }).then((resp) => {
//       if (resp.ok) {
//         return resp.json();
//       } else if (resp.status === 401) {
//         throw new Error("Unauthorized");
//       } else {
//         throw new Error(
//           "An unknown error occurred while trying to save a new crime.",
//         );
//       }
//     });
//   });
// };
