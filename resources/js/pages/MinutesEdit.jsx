import * as React from "react"
import { useState, useRef, useEffect } from 'react';
import Page from "../components/Page"
import axios from "axios";
import { useParams } from 'react-router-dom'
import Loading from "../components/Loading";
import Editor from "../components/editor/Editor";
import Attendance from "../components/attendance/Attendance";
import Accordion from 'react-bootstrap/Accordion';
import { Col, Row } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';

const SAVE_AFTER_MS = 500;

const MinutesEdit = () => {
    const { charity_id, meeting_id } = useParams()
    const [minutes, setMinutes] = useState(null);
    const [attendance, setAttendance] = useState(null);
    const [date, setDate] = useState(null);
    const [trustees, setTrustees] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const autoSaveTimer = useRef();
    const putRequestRef = useRef();

    useEffect(() => {
        putRequestRef.current = {
            charity_id: charity_id,
            minutes: JSON.stringify(minutes),
            attendance: JSON.stringify(attendance),
        };
        autoSave()
      }, [minutes, attendance]);

    const autoSave = () => {
        // https://medium.com/@pellucidhimanshu/implement-auto-save-with-javascript-react-835e88262c60
        if (autoSaveTimer.current) {
            clearTimeout(autoSaveTimer.current);
        }
        
        autoSaveTimer.current = setTimeout(() => {
            setIsSaving(true);
            clearTimeout(autoSaveTimer.current);
            axios.put(`meeting/${meeting_id}/`, putRequestRef.current)
            .then((response) => {
              setIsSaving(false)
            });
        }, SAVE_AFTER_MS)
    }

    React.useEffect(() => {
        axios.get(`meeting/${meeting_id}`).then((response) => {
            setMinutes(JSON.parse(response.data.data.minutes));
            setAttendance(JSON.parse(response.data.data.attendance));
            setTrustees(response.data.data.charity.trustees);
            setDate(response.data.data.date_of_meeting)
        });
      }, []);

    const heading = (
        <Row className="align-items-end">
            <Col md="8">
                <h1>Edit Meeting {date && `- ${date}`}</h1>
            </Col>
            <Col md="4" className="text-end text-muted">
                {isSaving && minutes && attendance &&
                    <>
                        <Spinner animation="border" role="status" size="sm">
                            <span className="visually-hidden">Saving...</span>
                        </Spinner>
                        <small className="ml-3">Saving...</small>
                    </>
                }
                
            </Col>
        </Row>
    )
    return (
        <>
            <Page title={"Edit Meeting"} heading={heading}>
                {!minutes && !attendance ? <Loading /> :
                <>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Attendance</Accordion.Header>
                            <Accordion.Body>
                                <Attendance attendance={attendance} setAttendace={setAttendance} trustees={trustees} />
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Minutes</Accordion.Header>
                            <Accordion.Body>
                                <Editor minutes={minutes} setMinutes={setMinutes} />
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                </>
                }

            </Page>
        </>
    )
}

export default MinutesEdit