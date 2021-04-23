import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import history from './history';
import "./Home.css";
import ticket from './ticket.png';

export default class Home extends Component {
  render() {
    return (

      <div className="Home">
        <header className="Home-header">

        <h1>Ticketing Service</h1>

        <table>
          <tr>
            <td><button className="buttonGreen" onClick={() => history.push('/CreateEvent')} type="submit">Create Event</button></td>
            <td><button className="buttonBlue" onClick={() => history.push('/BuyTicket')} type="submit">Buy Ticket</button></td>
            <td><button className="buttonRed" onClick={() => history.push('/UseTicket')} type="submit">Use Ticket</button></td>
          </tr>
          <tr>
            <td><button className="buttonBlack" onClick={() => history.push('/CancelEvent')} type="submit">Cancel Event</button></td>
            <td><button className="buttonGray" type="submit">Transfer Ticket</button></td>
            <td><a href="https://www.cryptokitties.co/"><button className="buttonGreen" type="submit">CryptoKitty</button></a></td>
          </tr>
        </table>

        <br></br><br></br>

        <img src={ticket} className="Home-logo" alt="logo" />

        </header>
      </div>
    );
  }
}
