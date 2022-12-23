import React from "react";

const Filter = (props) => {
  return (
    <>
      <div>
        search: <input onChange={props.searchName}></input>
      </div>
      <ul>
        {props.namesOutputArray.map((person) => (
          <p key={Math.random() * 10}>
            {person.name} {person.number}
          </p>
        ))}
      </ul>
    </>
  );
};

export default Filter;
