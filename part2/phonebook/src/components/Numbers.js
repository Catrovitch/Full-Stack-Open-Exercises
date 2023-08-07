import React from "react";
import Person from "./Person"

const Numbers = ({persons}) => {

  return (
    <>
      <ul>
        {persons.map((person, index) => (
          <Person key={index} person={person}></Person>
        ))}
      </ul>
    </>
  );
};

export default Numbers;
