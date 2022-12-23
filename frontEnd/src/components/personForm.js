import React from "react";

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPersonFunction}>
      <div>
        name: <input value={props.newNameProp} onChange={props.setNewNamesFunction} />
      </div>
      <div>
        number: <input value={props.newNumProp} onChange={props.setNewNumberFunction}></input>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

export default PersonForm;




