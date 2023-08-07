import React from 'react';
import FormField from './FormField'; 

const AddNewPeopleForm = ({ onSubmit, formList, buttonText }) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        {formList.map((form, index) => (
          <FormField
            key={index}
            text={form.text}
            formValue={form.formValue}
            formOnChange={form.formOnChange}
          ></FormField>
        ))}
        <div>
            <button type="submit">{buttonText}</button>
        </div>
      </form>

    </>
  );
};

export default AddNewPeopleForm;
