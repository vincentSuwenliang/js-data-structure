import React from 'react';
import ReactDOM from 'react-dom';

import './BinarySearchTree';
// import './LinkList';



const rootComponent = () => {
  return (
    <div>this is root</div>
  )
}

ReactDOM.render(
  rootComponent()
  , document.getElementById('container'),
);
