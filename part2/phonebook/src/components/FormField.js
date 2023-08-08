import React from "react"

const FormField = ({text, formValue, formOnChange}) => {
    return (
        <div>
            {text} <input
                value={formValue}
                onChange={formOnChange}
            />
        </div>
    )
}


export default FormField