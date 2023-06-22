import React, { useEffect, useState } from "react";
import { getUserItineraries } from "../../modules/itineraryManager";
import Itinerary from "./Itinerary";
import { Link } from "react-router-dom";


export default function ItineraryList({userProfile}) {

  const [itineraries, setItineraries] = useState([]);

  const userId = userProfile?.id

  useEffect(() => {
    getUserItineraries(userId).then(setItineraries);
  }, [userProfile]);


  return (
    <section>
      <h1>My Saved Destinations
      </h1>
      <Link to={`/createItinerary`}>Start a New Journey</Link>
      {itineraries?.map((i) => (
        <><Itinerary key={i.id} itinerary={i} />
         <Link to={`/deleteItinerary/${i.id}`}>Delete {i.location.name} Journey</Link><br/>
         <Link to={`edit/${i.id}`}>Edit {i.location.name} Journey</Link><br/>
         </>
      ))}
     
    </section>
  );
}

