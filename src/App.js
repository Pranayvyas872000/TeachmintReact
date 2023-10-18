import './App.css';
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import Directory from './components/Directory';
import UserDetails from './components/UserDetails';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Directory} />
          <Route
            exact
            path="/user/:id"
            component={UserDetails}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
