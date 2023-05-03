import * as React from "react";
import Spinner from 'react-bootstrap/Spinner';


type Props = {
}

const Loading: React.FC<Props> = ({  }: Props) => {
    return (
        <Spinner />
    )
}

export default Loading;