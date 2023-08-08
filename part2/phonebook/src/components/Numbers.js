import React from "react";
import Person from "./Person"

const Numbers = ({persons, deletePerson}) => {

  return (
    <>
      <ul>
        {persons.map((person) => (
          <Person key={person.id} person={person} deletePerson={() => deletePerson(person.id)}></Person>
        ))}
      </ul>
    </>
  );
};

export default Numbers;
