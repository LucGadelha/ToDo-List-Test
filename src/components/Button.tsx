import React from 'react'

type buttonChild = {
  type: string,
  disable:boolean,
  onClick: () => void,
  text: string,
  className: string,
}

const Button = (Child:buttonChild) => {
  return (
    <button type={Child.type} disable={Child.disable} onClick={Child.onClick} className={Child.className}>
      {Child.text}
    </button>
  )
}

export default Button
