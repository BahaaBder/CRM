import "./App.css";
import { React, Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { observer, inject } from "mobx-react";
import Clients from "./components/ClientsComponents/Clients";
import Actions from "./components/ActionsComponents/Actions";
import Analytics from "./components/DashboardComponents/Analytics";
import NavBar from "./components/NavBar";
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
        </div>
        <Route path="/clients" exact render={() => <Clients />} />
        <Route path="/actions" exact render={() => <Actions />} />
        <Route path="/analytics" exact render={() => <Analytics />} />
      </Router>
    );
  }
}

export default inject("GlobalStore")(observer(App));
