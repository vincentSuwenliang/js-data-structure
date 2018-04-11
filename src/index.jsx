import React from 'react';
import ReactDOM from 'react-dom';

const rootComponent = () => {
  return (
    <div>this is root</div>
  )
}

ReactDOM.render(
  rootComponent()
  , document.getElementById('container'),
);
