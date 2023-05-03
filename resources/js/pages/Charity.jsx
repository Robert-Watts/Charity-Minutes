import * as React from "react"
import Page from "../components/Page"
import axios from "axios";
import { useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Loading from "../components/Loading";

const Charity = () => {
    const [charity, setCharity] = React.useState(null);
    const { charity_id } = useParams()

    React.useEffect(() => {
        axios.get(`charity/${charity_id}`).then((response) => {
            setCharity(response.data.data);
        });
      }, []);

    return (
        <Page title={"Charity"}>
                {!charity ? <Loading /> :
                    <section>

                        <h2>Charity Infomation</h2>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Charity ID</Form.Label>
                                <Form.Control placeholder="Charity Name" disabled value={charity.id}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Charity Name</Form.Label>
                                <Form.Control placeholder="Charity Name" disabled value={charity.name}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Charity Objectives</Form.Label>
                                <Form.Control placeholder="Charity Objectives" disabled type="textarea" value={charity.objectives} />
                            </Form.Group>   
                        </Form>   
                    </section>
                }

        </Page>
    )
}

export default Charity