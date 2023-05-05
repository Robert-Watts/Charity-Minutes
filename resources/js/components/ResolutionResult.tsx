import * as React from "react";
import Alert from 'react-bootstrap/Alert';
import ResolutionPassed from "../utilities/ResolutionPassed";


type Props = {
    votes_for: number;
    votes_against: number;
    errors?: boolean;
}

const ResolutionResult: React.FC<Props> = ({ votes_against, votes_for, errors }: Props) => {
    
    if (errors) {
        var variant = "secondary";
        var message = "This vote has errors, please fix them.";
    } else if (ResolutionPassed(votes_for, votes_against)){
        var variant = "success ";
        var message = "✔️ This resolution has passed.";
    } else {
        var variant = "danger ";
        var message = "❌ This resolution has been rejected";
    }

    return (
        <Alert variant={variant}>
            {message}
      </Alert>
    )
}

export default ResolutionResult;