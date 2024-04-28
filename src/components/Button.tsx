import React from 'react'

type buttonChild = {
  type:string,
    text: string,
    className: string,
}

const Button = (Child:buttonChild) => {
  return (
    <button type={Child.type} className={Child.className}>
      {Child.text}
    </button>
  )
}

export default Button
