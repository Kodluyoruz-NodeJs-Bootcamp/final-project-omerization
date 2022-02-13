import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Landing from './pages/Landing';
import Feed from './pages/Feed';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import Post from './pages/Post';
import Error_404 from './pages/404';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from './reducers';

const store = createStore(reducers, compose(applyMiddleware(thunk)));
const rootElement = document.getElementById("root");
const loggedIn = localStorage.getItem('profile');

render( 
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Landing loggedIn={loggedIn} /> }/>
        <Route path="/feed" element={(loggedIn) ? <Feed/> : <Landing message={"You have to be logged in!"}  /> } />
        <Route path="/home" element={ <Home /> } />
        <Route path="/:userId/favorites" element={ loggedIn ? <Favorites /> : <Landing message={"You have to be logged in!"}/>} />
        <Route path="/post/:postId" element={loggedIn ? <Post /> : <Landing message={"You have to be logged in!"}/>} />
        <Route
          path="*"
          element={
            <Error_404 />
          }
        />
      </Routes>
    </BrowserRouter>
  </Provider>,
  rootElement
);


