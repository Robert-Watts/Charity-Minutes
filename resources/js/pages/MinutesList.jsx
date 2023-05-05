import * as React from "react"
import { useState } from 'react';
import Page from "../components/Page"
import axios from "axios";
import { useParams } from 'react-router-dom'
import Loading from "../components/Loading";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Col, Row } from "react-bootstrap";
import CreateMeeting from "../components/forms/CreateMeeting";

const MinutesList = () => {
    
    const [showCreateMeeting, setShowCreateMeeting] = useState(false);
    const handleCreateMeetingClose = () => setShowCreateMeeting(false);
    const handleCreateMeetingShow = () => setShowCreateMeeting(true);
  

    const [charity, setCharity] = React.useState(null);
    const { charity_id } = useParams()

    React.useEffect(() => {
        axios.get(`charity/${charity_id}`).then((response) => {
            setCharity(response.data.data);
        });
      }, []);

      const page_title = (
        <>
        <Row className="align-items-end">
            <Col md="8">
                <h1>Minutes</h1>
            </Col>
            {charity &&
            <Col md="4">
                <Button variant="primary" onClick={handleCreateMeetingShow} className="mb-1 float-end">
                    Create Meeting
                </Button>
            </Col>
            }
        </Row>
        </>
      )

    return (
        <>
            <Page title={"Minutes"} heading={page_title}>
                {!charity ? <Loading /> :
                <>
                    <Row>
                        <Col>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Meeting Date</th>
                                        <th>Attendees</th>
                                        <th>View</th>
                                    </tr>
                                </thead>

                                <tbody>

                                {charity.meetings.map((meeting, i) => {
                                    var attendees = JSON.parse(meeting.attendance);
                                    attendees = attendees.map(function(trustee_id){
                                        const trustee_position = Object.keys(charity.trustees).find(key => charity.trustees[key]['trustee_id'] === trustee_id);
                                        return charity.trustees[trustee_position]['member_name']
                                    });
                                    return (
                                        <tr key={meeting.id}>
                                            <td>{meeting.id}</td>
                                            <td>{meeting.date_of_meeting}</td>
                                            <td>{attendees.join(", ")}</td>
                                            <td><Link to={`/${charity.id}/${meeting.id}`}>Open</Link></td>
                                        </tr>
                                    )
                                })}

                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </>
                }

            </Page>
            <CreateMeeting is_open={showCreateMeeting} close={handleCreateMeetingClose} />
        </>
    )
}

export default MinutesList