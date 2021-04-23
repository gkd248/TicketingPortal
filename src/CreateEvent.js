import React, { Component } from 'react';
import { Card, ListGroup, Form, Button } from 'react-bootstrap';

class CreateEvent extends Component {
    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
                <div><h2>Please Enter Event Details</h2>
                <Form>
                  <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" placeholder="John Smith" />
                  </Form.Group>

                  <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>URL</Form.Label>
                  <Form.Control type="text" placeholder="www.google.com" />
                  </Form.Group>

                  <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="text" placeholder="5" />
                  </Form.Group>

                  <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Number of Tickets</Form.Label>
                  <Form.Control type="text" placeholder="100" />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Submit
                  </Button>

                </Form>
                </div>
            </div>
        );
    }
}


export default CreateEvent;
