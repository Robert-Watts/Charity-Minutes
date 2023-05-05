import * as React from "react"
import Page from "../components/Page"
import axios from "axios";
import { Link, useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Loading from "../components/Loading";
import ReactMarkdown from 'react-markdown'
import { Button, Card, Row, Col } from "react-bootstrap";
import ResolutionResult from "../components/ResolutionResult";


const MinutesView = () => {
    const [meeting, setMeeting] = React.useState(null);
    const { meeting_id, charity_id } = useParams()

    React.useEffect(() => {
        axios.get(`meeting/${meeting_id}`).then((response) => {
            setMeeting(response.data.data);
        });
      }, []);

      const page_name = `Meeting${meeting ? ` - ${meeting.date_of_meeting}` : ""}`

      const page_title = (
        <>
        <Row className="align-items-end">
            <Col md="8">
                <h1>{page_name}</h1>
            </Col>
            {meeting &&
            <Col md="4">
                <Button as={Link} to={`/${charity_id}/${meeting_id}/edit`} className="float-end">Edit</Button>
            </Col>
            }
        </Row>
        </>
      )

      return (
        <Page title={page_name} heading={page_title} >
                {!meeting ? <Loading /> :
                    <>
                        <section>
                            <p>
                                <b>Atendees: </b>
                                <i>
                                    {
                                        JSON.parse(meeting.attendance).map(function(trustee_id){
                                            const trustee_position = Object.keys(meeting.charity.trustees).find(key => meeting.charity.trustees[key]['trustee_id'] === trustee_id);
                                            return meeting.charity.trustees[trustee_position]['member_name']
                                        }).join(", ")
                                        
                                    }
                                </i>
                            </p>
                        </section>
                        <section>
                            {
                                JSON.parse(meeting.minutes).map((item, index) => {
                                    let element = <p>This item is not of a known type.</p>;
                
                                    if (item['type'] == "vote"){
                                        element = (
                                            <Card className={"mb-3"}>
                                                <Card.Body>
                                                    <p className="mb-0">
                                                        <b>Resolution:</b>
                                                        <br />
                                                    </p>
                                                    <ReactMarkdown>{item['resolution']}</ReactMarkdown>

                                                    <p>
                                                        <b>Votes For: </b>{item['votes_for']}<br />
                                                        <b>Votes Against: </b>{item['votes_against']}<br />
                                                    </p>
                                                    <ResolutionResult votes_against={item['votes_against']} votes_for={item['votes_for']} />
                                                </Card.Body>
                                            </Card>
                                        );
                                    } 
                                    else if (item['type'] == "text") {
                                        element = <ReactMarkdown>{item['value']}</ReactMarkdown>
                                    }
                                    
                                    return (
                                        <div key={index}>
                                            {element}
                                        </div>
                                    );
                                    
                                })                               
                            }
                        </section>
                    </>
                }

        </Page>
    )
}

export default MinutesView