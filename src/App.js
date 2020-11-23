import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Register from './Components/Register';
import Authenticate from './Components/Authenticate';

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <link to="/">Welcome</link>
          </li>
          <li>
            <link to="/register">Register</link>
          </li>
          <li>
            <link to="/authenticate">Authenticate</link>
          </li>
        </ul>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/authenticate">
            <Authenticate />
          </Route>
          <Route></Route>
        </Switch>
      </div>
    </Router>

    
  );
}

export default App;
