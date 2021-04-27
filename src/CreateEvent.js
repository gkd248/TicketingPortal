import React, { Component } from 'react';
import { Card, ListGroup, Form, Button } from 'react-bootstrap';
import Web3 from 'web3'
import {EVENT_CONTRACT_ABI, EVENT_CONTRACT_ADDRESS} from "./SmartContractABI.js"

class CreateEvent extends Component {

	  constructor(props) {
	  	super(props);
	  	this.state = {event_name: '', event_url: '', event_price: 0, event_capacity: 0, account: null, web3: null, contract:null}
	  	this.name = this.name.bind(this);
	  	this.url = this.url.bind(this);
	  	this.price = this.price.bind(this);
	  	this.capacity = this.capacity.bind(this);
	  	this.createEvent = this.createEvent.bind(this);
	  }

      async loadBlockchainData() {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
        const accounts = await web3.eth.getAccounts()
        const account = accounts[0];
        const contract = await new web3.eth.Contract(EVENT_CONTRACT_ABI, EVENT_CONTRACT_ADDRESS, {from: account, gas: 1500000, gasPrice: '20000000000'})
        this.setState({ account: account , web3: web3, contract: contract})
      }

      componentDidMount() {
        this.loadBlockchainData()
      }

      createEvent(event) {
        this.enableMetamask();
        let name = this.state.event_name;
        let url = this.state.event_url;
        let price = this.state.event_price;
        let capacity = this.state.event_capacity;
        console.log("create event")
        try {
          this.state.contract.methods.createTicketEvent(name, url, price, capacity).send({'from': this.state.account})
          .on('transactionHash', function(hash){
            console.log("TransactionHash " + hash);
          }.bind(this))
            .on('receipt', function(receipt){
              console.log("Receipt " + JSON.stringify(receipt));
              console.log("Event Idx " + receipt.events.CreateEvent.returnValues.eventIdx);
              alert("Event Successfully Submitted.\nEvent Index is: " + receipt.events.CreateEvent.returnValues.eventIdx);
            })
            .on('confirmation', function(confirmationNumber, receipt){
              console.log("Confirmation Number " + confirmationNumber);
            })
            .on('error', console.error);
          } catch (error) {
          console.log("Error" + error)
        }
        event.preventDefault();
      }

      enableMetamask = ()  => {
      window.ethereum.enable();
      }

      name(event) {
      	this.setState({event_name: event.target.value});
      }
      url(event) {
      	this.setState({event_url: event.target.value});
      }
      price(event) {
      	this.setState({event_price: event.target.value});
      }
      capacity(event) {
      	this.setState({event_capacity: event.target.value});
      }

    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
                <div><h2>Please Enter Event Details</h2>
                <Form onSubmit={this.createEvent}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" value={this.state.event_name} onChange={this.name} placeholder="John Smith" />
                  </Form.Group>

                  <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>URL</Form.Label>
                  <Form.Control type="text" value={this.state.event_url} onChange={this.url} placeholder="www.google.com" />
                  </Form.Group>

                  <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="text" value={this.state.event_price} onChange={this.price} placeholder="5" />
                  </Form.Group>

                  <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Number of Tickets</Form.Label>
                  <Form.Control type="text" value={this.state.event_capacity} onChange={this.capacity} placeholder="100" />
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
