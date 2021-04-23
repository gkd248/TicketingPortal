import logo from './logo.svg';
import ticket from './ticket.png';
import './App.css';
import { Link } from 'react-router-dom';
import history from './history';
import Routes from './Routes';

function App() {
  return (
    <div className="App">
      <header className="App-header">

      <h1>Ticketing Service</h1>

      <table>
        <tr>
          <td><button className="buttonGreen" onClick={() => history.push('/CreateEvent')} type="submit">Create Event</button></td>
          <td><button className="buttonBlue" onClick={() => history.push('/BuyTicket')} type="submit">Buy Ticket</button></td>
          <td><button className="buttonRed" onClick={() => history.push('/About')} type="submit">Use Ticket</button></td>
        </tr>
        <tr>
          <td><button className="buttonBlack" type="submit">Cancel Event</button></td>
          <td><button className="buttonGray" type="submit">Transfer Ticket</button></td>
          <td><button className="buttonGreen" type="submit">Something</button></td>
        </tr>
      </table>

      <br></br><br></br>



      <img src={ticket} className="App-logo" alt="logo" />

      </header>
    </div>
  );
}



export default App;
