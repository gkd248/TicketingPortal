import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import UseTicket from "./UseTicket";
import BuyTicket from "./BuyTicket";
import CreateEvent from "./CreateEvent";
import CancelEvent from "./CancelEvent";
import Home from "./Home";
import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/UseTicket" component={UseTicket} />
                    <Route path="/BuyTicket" component={BuyTicket} />
                    <Route path="/CreateEvent" component={CreateEvent} />
                    <Route path="/CancelEvent" component={CancelEvent} />
                </Switch>
            </Router>
        )
    }
}
