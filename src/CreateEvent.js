import React, { Component } from 'react';
import { Card, ListGroup, Form, Button } from 'react-bootstrap';
import Web3 from 'web3'
import {EVENT_CONTRACT_ABI, EVENT_CONTRACT_ADDRESS} from "./SmartContractABI.js"

class CreateEvent extends Component {

      async loadBlockchainData() {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
        const accounts = await web3.eth.getAccounts()
        const account = accounts[0];
        const contract = await new web3.eth.Contract(EVENT_CONTRACT_ABI, EVENT_CONTRACT_ADDRESS, {from: account, gas: 1500000, gasPrice: '20000000000'})
        //const events = await web3.eth.get
        this.setState({ account: account , web3: web3, contract: contract})
      }

      componentDidMount() {
        this.loadBlockchainData()
      }

      contractCreateEvent(event) {
        this.enableMetamask();
        let token_uri =  {
          "event_name": this.state.event_name,
          "price": this.state.event_price,
          "date": this.state.date,
          "start_time": this.state.start_time,
          "end_time": this.state.end_time,
          "version": 1
        };
        let capacity = this.state.event_capacity;
        token_uri["event_creator"] = this.state.account;
        console.log("createEvent")
        let tokenID = this.getTokenID(token_uri);
        try {
          this.state.contract.methods.mintWithTokenURI(capacity, tokenID, JSON.stringify(token_uri), this.state.event_price).send({'from': this.state.account})
          .on('transactionHash', function(hash){
            console.log("TransactionHash " + hash);
            this.setState({createdEventID: "Created Event TokenID: " + tokenID});
          }.bind(this))
            .on('receipt', function(receipt){
              console.log("Receipt " + JSON.stringify(receipt));
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
