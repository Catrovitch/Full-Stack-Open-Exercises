import React from "react";

const Numbers = ({persons}) => {
  const names = (persons) => persons.map((item) => item.name);
  const namesList = names(persons);

  return (
    <>
      <ul>
        {namesList.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </>
  );
};

export default Numbers;
