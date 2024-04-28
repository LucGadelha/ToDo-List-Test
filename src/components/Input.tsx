import { ErrorMessage, Field } from 'formik'
import React from 'react'

type inputChild = {
    name: string,
    label?: String,
    type: string,
    placeholder: string,
    required?: boolean
}

const Input = (Child: inputChild) => {
  return (
    <div className="flex flex-col">
      <label className="capitalize">
        {Child.label || Child.name} <span className="text-red-500">{Child.required && "*"}</span>
      </label>
      <Field
        name={Child.name}
        type={Child.type}
        placeholder={Child.placeholder}
        className="p-2 mb-2 rounded border-zinc-400 border border-solid outline-0 shadow-lg focus:border-blue-500"
      />
      <div className="text-red-500 text-xs mb-1">
        <ErrorMessage name={Child.name} />
      </div>
    </div>
  )
}

export default Input
