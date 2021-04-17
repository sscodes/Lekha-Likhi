import React from 'react';
import { Form } from 'react-bootstrap';


const Input = (props) => {
    return ( 
        <React.Fragment>
            <Form.Group>
                <Form.Label>{props.label}</Form.Label>
                <Form.Control as={props.as} rows={props.rows} type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.onChange}/>
                <Form.Text className="text-muted">
                    {props.inputMessage}
                </Form.Text>
            </Form.Group>
        </React.Fragment>
     );
}
 
export default Input;