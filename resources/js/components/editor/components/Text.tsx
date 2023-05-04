import * as React from "react";
import useAutosizeTextArea from "../../../utilities/useAutosizeTextArea";
import Form from 'react-bootstrap/Form';


type Props = {
    item: Array<object>,
    onChange: (array) => void
}

const Text: React.FC<Props> = ({ item, onChange }: Props) => {

    const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

    useAutosizeTextArea(textAreaRef.current, item['value']);
  
    const handleTextChange = (event) => {
        const output = {"type":"text", "value":event.target.value};
        onChange(output);
    }

    return (
        <Form.Group controlId="text">
            <Form.Control as="textarea" value={item['value']} onChange={handleTextChange} ref={textAreaRef} />
        </Form.Group>
    )

}

export default Text;