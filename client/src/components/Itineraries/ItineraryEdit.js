import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "reactstrap";
import { getCrimesByLocation, getCrimesByItinerary } from "../../modules/crimeManager";
import Crime from "../Crimes/Crime";
import { deleteItineraryCrime, getItinerary } from "../../modules/itineraryManager";
import { addCrime } from "../../modules/itineraryManager";

export const ItineraryEditForm = () => {
  const [crimes, setCrimes] = useState([]);
  const [itinerary, setItinerary] = useState(null);
  const { id } = useParams();
  const [itineraryCrimes, setItineraryCrimes] = useState([])
  const navigate = useNavigate();
  const [updatedInfo, setUpdatedInfo] = useState(false);

  useEffect(() => {
    getItinerary(id).then(setItinerary);
  }, []);

  const location = itinerary?.locationId

  useEffect(() => {
    if (location) {
      getCrimesByLocation(location).then(setCrimes);
      getCrimesByItinerary(id).then(setItineraryCrimes);
    }
  }, [itinerary]);

  useEffect(() => {
    if (updatedInfo) {
          getCrimesByItinerary(id)
            .then(data => {
              setItineraryCrimes(data);
              setUpdatedInfo(false);
            })
    }
  }, [updatedInfo]);


  const handleSave = (event, crimeId) => {
    event.preventDefault();
    const dataToSave = {
      crimeId: crimeId,
      itineraryId: id
    }
    addCrime(dataToSave)
      setUpdatedInfo(true)
  }

  const handleDelete = (event, crimeId) => {
    event.preventDefault();
    deleteItineraryCrime(id, crimeId)
      .then(() => setUpdatedInfo(true))
  }

  return (
    <div className="container">
      <Form>
        {crimes.map((c) => (
          <div key={c.id}>
            <Crime crime={c} />
            {itineraryCrimes.find((ic) => ic.id === c.id) ? (
              <Button className="btn btn-primary" onClick={(event) => handleDelete(event, c.id)}>
                Unsave
              </Button>
            ) : (
              <Button className="btn btn-primary" onClick={(event) => handleSave(event, c.id)}>
                Save
              </Button>
            )}
          </div>
        ))}
        <br />
        <Button className="btn btn-danger" href={`/myItineraries`}>
          Cancel
        </Button>
      </Form>
    </div>
  );
};
