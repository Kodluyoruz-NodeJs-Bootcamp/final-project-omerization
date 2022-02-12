import { render } from "react-dom";
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Landing from './pages/Landing';
import Feed from './pages/Feed';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import Post from './pages/Post';
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
        <Route path="/posts/:postId" element={loggedIn ? <Post /> : <Landing message={"You have to be logged in!"}/>} />
        <Route
          path="*"
          element={
            <div><h1>404</h1></div>
          }
        />
      </Routes>
    </BrowserRouter>
  </Provider>,
  rootElement
);


