
import './App.css';
import Home from './views/Home'
import Movies from './views/Movies'
import TVSeries from './views/TVSeries'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NavbarTop from './components/NavbarTop';
import MovieDetails from './views/MovieDetails';
import AddMovie from './views/AddMovie';
import EditMovie from './views/EditMovie';
import Footer from './components/Footer';
import FavePage from './views/FavePage';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <NavbarTop/>
          <Switch>
            <Route exact path="/movie/edit/:id">
              <EditMovie />
            </Route>
            <Route exact path="/movie/:id">
              <MovieDetails />
            </Route>
            <Route exact path="/addmovie">
              <AddMovie/>
            </Route>
            <Route exact path="/favorites">
              <FavePage />
            </Route>
            <Route exact path="/movie">
              <Movies />
            </Route>
            <Route exact path="/tvseries">
              <TVSeries />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    <Footer/>
    </div>
    
  );
}

export default App;
