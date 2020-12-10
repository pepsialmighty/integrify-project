import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/home/home';
import UserInfo from './components/user-info/user-info';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/user/:id' component={UserInfo} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
