import React, { Component } from 'react';
import { Card, ListGroup, Form, Button } from 'react-bootstrap';
import Web3 from 'web3'
import {EVENT_CONTRACT_ABI, EVENT_CONTRACT_ADDRESS} from "./SmartContractABI.js"

class BuyTicket extends Component {

  constructor(props) {
	super(props);
	this.state = {event_index: 0, paidAmount: 0, account: null, web3: null, contract:null}
	this.index = this.index.bind(this);
  	this.paidAmount = this.paidAmount.bind(this);
	this.purchaseTicket = this.purchaseTicket.bind(this);
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
  enableMetamask = ()  => {
    window.ethereum.enable();
  }
  purchaseTicket(event) {
        this.enableMetamask();
        let index = this.state.event_index;
        let paidAmount = this.state.paidAmount;
        console.log("Buy Ticket")
        try {
          this.state.contract.methods.purchaseTicket(index).send({'from': this.state.account, 'value': paidAmount})
          .on('transactionHash', function(hash){
            console.log("TransactionHash " + hash);
          }.bind(this))
            .on('receipt', function(receipt){
              console.log("Receipt " + JSON.stringify(receipt));
              alert("Bought Ticket\nTicket Number: " + receipt.events.Purchase.returnValues.ticket_number +"\nThis ticket will be sent to your account.");
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


  paidAmount(event) {
    this.setState({paidAmount: event.target.value});
  }
  index(event) {
    this.setState({event_index: event.target.value});
  }
    render() {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
              <div><h2>Please Enter Index Of Chosen Event</h2>
              <Form onSubmit={this.purchaseTicket}>
                <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Event Index</Form.Label>
                <Form.Control type="text" value={this.state.event_index} onChange={this.index} placeholder="0" />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Amount to Send</Form.Label>
                <Form.Control type="text" value={this.state.paidAmount} onChange={this.paidAmount} placeholder="0" />
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

export default BuyTicket;
