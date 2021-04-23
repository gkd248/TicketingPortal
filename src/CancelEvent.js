import React, { Component } from 'react';
import { Card, ListGroup, Form, Button } from 'react-bootstrap';

class CancelEvent extends Component {
    render() {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
              <div><h2>Please Enter Event Info</h2>
              <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Event Index</Form.Label>
                <Form.Control type="text" placeholder="0" />
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

export default CancelEvent;
