import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { FormGroup, Input, Card, CardBody, Form, CardTitle, Button, Label } from "reactstrap"
import { getCrime, updateCrime } from "../../modules/crimeManager";

export const CrimeEditForm = () => {
    const [crime, setCrime] = useState();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getCrime(id).then(setCrime)
    }, [])

    if (!crime) {
        return null;
    }

    const handleInputChange = (event) => {
        const value = event.target.value;
        const key = event.target.id;
        const crimeCopy = { ...crime };

        crimeCopy[key] = value;
        setCrime(crimeCopy);
    };

    const handleSave = (event) => {
        event.preventDefault();

        updateCrime(crime).then(() => {
            navigate(`/crime/${id}`);
        });
    };

    return (
        <div className="container">
            <Card>
                <CardTitle>Edit Crime</CardTitle>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <Input id="id" type="hidden" name="id" value={crime.id} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="subject">Subject</Label>
                            <Input type="text" name="subject" id="subject" placeholder="crime subject"
                                value={crime.subject}
                                onChange={handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="url">Crime</Label>
                            <Input type="text" name="content" id="content" placeholder="crime content"
                                value={crime.content}
                                onChange={handleInputChange} />
                        </FormGroup>
                        <Button className="btn btn-primary" onClick={handleSave} >
                            Submit
                        </Button>
                        <Button className="btn btn-danger" href="/crime/{id}">
                            Cancel
                        </Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}