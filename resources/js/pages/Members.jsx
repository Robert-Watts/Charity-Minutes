import * as React from "react"
import Page from "../components/Page"
import axios from "axios";
import { useParams } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import Loading from "../components/Loading";

const Members = () => {
    const [charity, setCharity] = React.useState(null);
    const { charity_id } = useParams()

    React.useEffect(() => {
        axios.get(`charity/${charity_id}`).then((response) => {
            setCharity(response.data.data);
        });
      }, []);

    return (
        <Page title={"Members"}>
                {!charity ? <Loading /> :
                <>
                    <section>
                        <h3>Trustees</h3>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Trustee ID</th>
                                    <th>Member ID</th>
                                    <th>Name</th>
                                    <th>Role</th>
                                </tr>
                            </thead>

                            <tbody>

                            {charity.trustees.map((trustee, i) => {     
                                return (
                                    <tr key={trustee.trustee_id}>
                                        <td>{trustee.trustee_id}</td>
                                        <td>{trustee.member_id}</td>
                                        <td>{trustee.member_name}</td>
                                        <td>{trustee.role}</td>
                                    </tr>
                                )
                            })}

                            </tbody>
                        </Table>
                    </section>
                    <section>
                        <h3>Members</h3>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Member ID</th>
                                    <th>Name</th>
                                </tr>
                            </thead>

                            <tbody>

                            {charity.members.map((member, i) => {     
                                return (
                                    <tr key={member.id}>
                                        <td>{member.id}</td>
                                        <td>{member.name}</td>
                                    </tr>
                                )
                            })}

                            </tbody>
                        </Table>
                    </section>
                </>
                }

        </Page>
    )
}

export default Members