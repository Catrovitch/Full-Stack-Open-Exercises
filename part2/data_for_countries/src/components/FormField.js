import React from "react"

const FormField = ({formHeader, formFieldText, formOnChange}) => {
    return (
        <>
            {formHeader} 
            <input
              formFieldText={formFieldText}
              onChange={formOnChange}
            />
        </>
    )
}


export default FormField