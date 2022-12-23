import React from "react";

const Persons = (props) => {

  const randId = Math.floor(Math.random() * 9999);

  return (
    <div>
      <ul>
        {props.personsArray.map((person) => {
          return (
            <div key={Math.random() * 10}>
              <p key={randId} id={person.id}>
                {person.name} {person.number}
                <button key={"gae"} onClick={props.personsDelete} id={person.id}>
                  Delete
                </button>
              </p>
            </div>)
        })}
      </ul>
    </div>
  );

}

export default Persons;









