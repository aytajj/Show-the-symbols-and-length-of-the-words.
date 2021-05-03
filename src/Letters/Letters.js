import React from "react";

function Letters(props) {
  return (
    
      <span onClick={props.click} style={{borderColor:props.color}}>{props.herf}</span>
    
  );
}

export default Letters;
