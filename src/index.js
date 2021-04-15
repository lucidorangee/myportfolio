import React, { useCallback } from 'react';
import ReactDOM, { render } from 'react-dom';
import './index.css';

import tetris from './Tetris_T.png';
import githubicon from './github_icon.png';
import menuicon from './menu_icon.png';
import chessicon from './chess_icon.png';
import guitaricon from './guitar_icon.png';
import guitarscene from './guitarhelper_scene.PNG';
import tetrisscene from './tetris_scene.png';
import chessscene from './chess_scene.png';

import shelf from './shelf.png';

var inDesc = false;

class Item extends React.Component{
  
  state = { xpos: 400 , ypos: 400 , drag: false ,
            pos1 : 0 , pos2 : 0,
            desc : "<h1>PLEASE ENTER DESCRIPTION</h1>",
            display_image : tetris,
            bonus_image : guitarscene };

  constructor(props){
    super(props);
  }

  // While dragging the element
  elementDrag = (e) => {
    
    if(!inDesc)
    {
      e = e || window.event;
      e.preventDefault();

      this.setState(currentState => {
        return {
          xpos : currentState.pos1 - currentState.xrel,
          ypos : currentState.pos2 - currentState.yrel,
          pos1 : e.clientX,
          pos2 : e.clientY,
        };
      });
    }
  }

  // When the user lets go of the mouse
  closeDragElement = (e) => {
    
    if(this.state.ypos < 200)
    {
      // If to be displayed
      if(!inDesc) 
      {
        this.setState(currentState => {
          return {
            xpos : 776,
            ypos : 92,
          };
        });
        inDesc = true;
        
        document.getElementById("dim").innerHTML = '<div class = "detail_content"><img src=' + this.state.bonus_image + ' alt="Guitar!"/></div><div class = "ashadow"></div><div class = "bshadow">hi</div>';

      }
    }
    else if(inDesc && this.state.ypos >= 200) 
    {
      inDesc = false;
    }
    document.onmouseup = null;
    document.onmousemove = null;
    
  }

  // When element is clicked
  dragMouseDown = (e) => {
    if(this.state.ypos < 200 && inDesc)
    {
      document.getElementById("dim").innerHTML = "";
      inDesc = false;
    }
    if(!inDesc)
    {
      e = e || window.event;
      e.preventDefault();

      this.setState(currentState => {
        return {
          xrel : e.clientX - currentState.xpos,
          yrel : e.clientY - currentState.ypos,
          pos1 : e.clientX,
          pos2 : e.clientY,
        };
      });

      document.onmouseup = this.closeDragElement;
      document.onmousemove = this.elementDrag;
    }
  }

  render(){

    let text;
    if(this.state.ypos < 200) {
      document.getElementById("description").innerHTML = this.state.desc;
    }
    

    return(
      <div id="item_description">
        <span id="description"></span>
        <img src={this.state.display_image}  
          alt="Tetris T Piece" 

          onMouseDown = {this.dragMouseDown}

          style={{
            position: "absolute",
            left: this.state.xpos + "px",
            top: this.state.ypos + "px",
          }}
        />
      </div>
    )
  }
}

class Tetris extends Item{
  constructor(props){
    super(props);
    this.state.xpos = 519;
    this.state.ypos = 270;
    this.state.desc = '<h1>Tetris Project - built with C++ and SFML</h1>When I was in grade 11, I wanted to attempt creating tetris in C++, <br>and I\'ve made a video on "speedrunning" to create one in C++!<br>Sadly, I do not have the project in my repository because I did not know how to use github back then, <br>but I have edited recording of it :(<br><a href="https://youtu.be/7_1XTFHXqcI">Click here if you want to check it out~!</a>';
    this.state.bonus_image = tetrisscene;
  }
}

class GithubPiece extends Item{
  constructor(props){
    super(props);
    this.state.xpos = 516;
    this.state.ypos = 494;
    this.state.desc = '<h1>Github Account</h1>Here\'s the link to the github<br> for this website!<br><a href="https://github.com/lucidorangee">Click here to go to Jihoo\'s github link!</a>';
    this.state.display_image = githubicon;
  }
}

class ChessPiece extends Item{
  constructor(props){
    super(props);
    this.state.xpos = 998;
    this.state.ypos = 272;
    this.state.desc = '<h1>Chess</h1>I play a little bit of chess, still a lot to improve but it\'s fun :D<br>';
    this.state.display_image = chessicon;
    this.state.bonus_image = chessscene;
  }
}

class GuitarPiece extends Item{
  constructor(props){
    super(props);
    this.state.xpos = 751;
    this.state.ypos = 297;
    this.state.desc = '<h1>Guitar Practice App</h1>I needed both an app to help me practice guitar more easily and some practice on Android Studio.<br>So, I decided to create an android app that helps me with my guitar preferences!<br><a href="https://github.com/lucidorangee/guitarhelper">You can check github link here!</a>';
    this.state.display_image = guitaricon;
    this.state.bonus_image = guitarscene;
  }
}

class Menu extends Item{
  constructor(props){
    super(props);
    this.state.desc = '<h1>MENU</h1>';
    this.state.xpos = 1235;
    this.state.ypos = 285;
    this.state.display_image = menuicon;
  }

  // While dragging the element
  elementDrag = (e) => {
    
    if(!inDesc)
    {
      e = e || window.event;
      e.preventDefault();

      this.setState(currentState => {
        return {
          xpos : currentState.pos1 - currentState.xrel,
          ypos : currentState.pos2 - currentState.yrel,
          pos1 : e.clientX,
          pos2 : e.clientY,
        };
      });
    }
  }

  // When the user lets go of the mouse
  closeDragElement = (e) => {
    
    if(this.state.ypos < 200)
    {
      // If to be displayed
      if(!inDesc) 
      {
        this.setState(currentState => {
          return {
            xpos : 776,
            ypos : 92,
          };
        });
        inDesc = true;
        //document.getElementById("dim").innerHTML = '<div class = "bshadow"></div>';

        let menu = document.getElementsByClassName("sidenav")[0];
        let content = document.getElementById("content");
        
        if(menu.classList.contains('menuclose'))
        {
          menu.classList.remove('menuclose');
          content.classList.remove('menuclose');
          menu.classList.remove('menuopen');
          content.classList.remove('menuopen');
          
          menu.classList.add('menuopen');
          content.classList.add('menuopen');
        }
      }
    }
    else if(inDesc && this.state.ypos >= 200) 
    {
      inDesc = false;
    }
    if(this.state.ypos >= 200)
    {
      let menu = document.getElementsByClassName("sidenav")[0];
      let content = document.getElementById("content");
      
      menu.classList.remove('menuopened');
      content.classList.remove('menuopened');
      menu.classList.remove('menuclose');
      content.classList.remove('menuclose');

      menu.classList.add('menuclose');
      content.classList.add('menuclose');
    }
    document.onmouseup = null;
    document.onmousemove = null;
    
  }

  // When element is clicked
  dragMouseDown = (e) => {
    if(this.state.ypos >= 200)
    {
      let menu = document.getElementsByClassName("sidenav")[0];
      let content = document.getElementById("content");
      let shadow = document.getElementsByClassName("bshadow")[0];
      
      menu.classList.remove('menuclose');
      content.classList.remove('menuclose');
      menu.classList.remove('menuopen');
      content.classList.remove('menuopen');
      
      menu.classList.add('menuopen');
      content.classList.add('menuopen');
    }
    if(this.state.ypos < 200 && inDesc)
    {
      document.getElementById("dim").innerHTML = "";
      inDesc = false;

      let menu = document.getElementsByClassName("sidenav")[0];
      let content = document.getElementById("content");
      let shadow = document.getElementsByClassName("bshadow")[0];
      
      menu.classList.remove('menuclose');
      content.classList.remove('menuclose');
      void menu.offsetWidth;
      void content.offsetWidth;
      menu.classList.add('menuclose');
      content.classList.add('menuclose');

      shadow.classList.remove('active');
    }
    if(!inDesc)
    {
      e = e || window.event;
      e.preventDefault();

      this.setState(currentState => {
        return {
          xrel : e.clientX - currentState.xpos,
          yrel : e.clientY - currentState.ypos,
          pos1 : e.clientX,
          pos2 : e.clientY,
        };
      });

      document.onmouseup = this.closeDragElement;
      document.onmousemove = this.elementDrag;
    }
  }

  render(){

    
    let text;
    if(this.state.ypos < 200) {
      document.getElementById("description").innerHTML = this.state.desc;
    }
    

    return(
      <div id="item_description">
        <span id="description"></span>
        <img src={this.state.display_image}  
          alt="Tetris T Piece" 

          onMouseDown = {this.dragMouseDown}

          width="140" height="120"
          style={{
            position: "absolute",
            left: this.state.xpos + "px",
            top: this.state.ypos + "px",
          }}
        />
      </div>
    )
  }
}

class App extends React.Component{

    render() {
      
      return(
        <div className = 'container'>
          <span id="dim"></span>
          <div class = "bshadow">

          </div>
          <div class = "sidenav">
            <a href="#about">About</a>
            <a href="#services">Services</a>
          </div>
          <div id='content' className = 'content'>
            <img src={shelf}
            style={{
            position: "absolute",
            left: 300 + "px",
            top: 50 + "px",
          }}></img>
            <Menu />
            <Tetris />
            <GithubPiece />
            <ChessPiece />
            <GuitarPiece />
            <hr id="divide"></hr>
          </div>
          
        </div>
      )
    }
}

ReactDOM.render(
  
  <App />,
  document.getElementById('root')
);
