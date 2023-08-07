import React from "react";

const Numbers = ({persons}) => {

  return (
    <>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Numbers;
