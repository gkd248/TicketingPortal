import React, { Component } from 'react';
import { Card, ListGroup, Form, Button } from 'react-bootstrap';
import Web3 from 'web3'
import {EVENT_CONTRACT_ABI, EVENT_CONTRACT_ADDRESS} from "./SmartContractABI.js"

class CancelEvent extends Component {

  constructor(props) {
	super(props);
	this.state = {event_index: 0, account: null, web3: null, contract:null}
	this.index = this.index.bind(this);
	this.destroyEvent = this.destroyEvent.bind(this);
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
  index(event) {
    this.setState({event_index: event.target.value});
  }
   enableMetamask = ()  => {
    window.ethereum.enable();
  }
  destroyEvent(event) {
        this.enableMetamask();
        let index = this.state.event_index;
        console.log("Destroy Ticket")
        try {
          this.state.contract.methods.destroyTicketEvent(index).send({'from': this.state.account})
          .on('transactionHash', function(hash){
            console.log("TransactionHash " + hash);
          }.bind(this))
            .on('receipt', function(receipt){
              console.log("Receipt " + JSON.stringify(receipt));
              alert("Event " + index + " Destroyed");
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

    render() {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
              <div><h2>Please Enter Event Info</h2>
              <Form onSubmit={this.destroyEvent}>
                <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Event Index</Form.Label>
                <Form.Control type="text" value={this.state.event_index} onChange={this.index} placeholder="0" />
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
