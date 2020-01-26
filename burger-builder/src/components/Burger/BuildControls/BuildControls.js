import React from "react";

import "./BuildControls.css"
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Tomato', type: 'tomato'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Meat', type: 'meat'},
    { label: 'Mayo', type: 'mayo'},
    { label: 'Cheese', type: 'cheese'},
];

const BuildControls = (props) => (
  <div className="BuildControls">
      <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
      {controls.map(ctrl => (
          <BuildControl
              key={ctrl.label}
              label={ctrl.label}
              added = {() => props.ingredientAdded(ctrl.type)}
              removed = {() => props.ingredientRemoved(ctrl.type)}/>
      ))}
      <button className="OrderButton" disabled={!props.purchasable}>ORDER NOW</button>
  </div>
);

export default BuildControls