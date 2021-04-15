import React, { useCallback } from 'react';
import ReactDOM, { render } from 'react-dom';
import './index.css';

import mainLogo from './Tetris_T.png';

class Item extends React.Component{
  state = { xpos: 0 , ypos: 0 , drag: false ,
            pos1 : 0 , pos2 : 0 };

  constructor(props){
    super(props);
    const FREE = 0;
    const DRAG = 1;
  }

  elementDrag = (e) => {
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

  closeDragElement = (e) => {
    document.onmouseup = null;
    document.onmousemove = null;
  }

  dragMouseDown = (e) => {
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

  render(){
    return(
      <div>
        <img src={mainLogo}  
          alt="Tetris T Piece" 

          onMouseDown = {this.dragMouseDown}

          width="140" height="100"
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