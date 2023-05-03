import * as React from "react";
import PageTitle from "./PageTitle";
import Navigation from "./Navigation";
import Container from 'react-bootstrap/Container';


type Props = {
    title: any;
    children?: any;
}

const Page: React.FC<Props> = ({ title, children }: Props) => {
    return (
        <>
            <PageTitle title={title} />
            <Navigation />
            <Container className="mt-3">
                <h1>{ title }</h1>

                { children }
            </Container>
        </>
    )
}

export default Page;
