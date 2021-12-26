import './App.css';
import React from 'react';
import { Outlet,useNavigate } from 'react-router-dom'

function App(){

  const navigate = useNavigate();

  return (
    <div className="App">
      <nav class="navbar navbar-dark bg-dark">
        <a class="navbar-brand" href="/" style={{color: RandomColor()}}>
          Welcome to DJX-Blog!
          </a>
        <div>
          <button class="btn btn-outline-light" onClick={() => navigate('/')}>
              Home
          </button>
          &nbsp;
          &nbsp;
          &nbsp;
          <button class="btn btn-outline-light" onClick={() => navigate('message-board')}>
              message-board
          </button>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

function RandomColor(){
  var Arr = ['1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
  var color = "";
  for(var i = 0; i < 6; i++){
      color += Arr[Math.floor(Math.random()*15)];
  }
  return "#"+color;
}
export default App;
