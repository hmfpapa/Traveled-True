import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { getItinerary, deleteItinerary } from "../../modules/itineraryManager";
import Itinerary from "./Itinerary";

export const DeleteItinerary = () => {
  const [itinerary, setItinerary] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getItinerary(id).then(setItinerary);
  }, []);

  if (!itinerary) {
    return null;
  }

  const handleDelete = (event) => {
    event.preventDefault();

    deleteItinerary(id).then(() => {
        navigate("/myItineraries");
      });
  };

  return (
    <div className="container">
      
        <h3>Are you sure you want to delete this itinerary?</h3>
          <Button className="btn btn-primary" onClick={handleDelete}>
            DELETE
          </Button>
          <Button className="btn btn-danger" href="/myItineraries">
            CANCEL
          </Button>
        <Itinerary key={itinerary.id} itinerary={itinerary} />
        
    </div>
  );
};
