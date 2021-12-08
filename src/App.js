import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import NewHackIdea from "./components/NewIdea/NewHackIdea";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/add" exact component={NewHackIdea} />
          <Route path="*">
            <div>No Match</div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
