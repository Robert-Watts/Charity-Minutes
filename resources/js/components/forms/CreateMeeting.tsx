import * as React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';


type Props = {
    close: () => void,
    is_open: boolean,
}

const CreateMeeting: React.FC<Props> = ({ close, is_open }: Props) => {
    const { charity_id } = useParams()

    const [createMeetingLoading, setCreateMeetingLoading] = React.useState(null);
    const navigate = useNavigate();

    const [date, setDate] = React.useState("");

    function createMeeting() {
      setCreateMeetingLoading(true)
      axios
        .post("/meeting", {
          "date_of_meeting": date, 
          "attendance": "[]", 
          "minutes": '[{"type": "text", "value": ""}]',
          "charity_id": charity_id
        })
        .then((response) => {
            console.log(response);
            navigate(`/${charity_id}/${response.data.data.id}/edit`)
        });
    }
    
    return (

        <Modal show={is_open} onHide={close}>
        <Modal.Header closeButton>
            <Modal.Title>Create Meeting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="createMeeting.date">
            <Form.Label>Date of Meeting</Form.Label>
            <Form.Control
                type="date"
                placeholder="1976-04-01"
                autoFocus
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            </Form.Group>
        </Form>

        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={close}>
                Close
            </Button>
            <Button variant="primary" onClick={createMeeting}>
                {createMeetingLoading && <Spinner size="sm" />}
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
    )
}

export default CreateMeeting;