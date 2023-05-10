import { getToken } from "./authManager";

const apiUrl = "/api/Itinerary";

export const getUserItineraries = (id) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}?Id=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get itineraries.",
        );
      }
    });
  });
};

export const getItinerary = (id) => {
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
          "An unknown error occurred while trying to get this itinerary.",
        );
      }
    });
  });
};

export const createItinerary = (itinerary) => {
  return getToken().then((token) => {
    return fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itinerary),
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else if (resp.status === 401) {
        throw new Error("Unauthorized");
      } else {
        throw new Error(
          "An unknown error occurred while trying to save a new itinerary.",
        );
      }
    });
  });
};

export const addCrime = (itineraryCrime) => {
    return getToken().then((token) => {
      return fetch(`${apiUrl}/${itineraryCrime.itineraryId}/addCrimes`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itineraryCrime),
      }).then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else if (resp.status === 401) {
          throw new Error("Unauthorized");
        } else {
          throw new Error(
            "An unknown error occurred while trying to save a new itinerary.",
          );
        }
      });
    });
  };

  export const deleteItinerary = (id) => {
    return getToken().then((token) => 
    fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        },
    }))
}

export const deleteItineraryCrime = (itineraryId, crimeId) => {
    return getToken().then((token) => 
    fetch(`${apiUrl}/removeCrimes?itineraryId=${itineraryId}&crimeId=${crimeId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        },
    }))
}