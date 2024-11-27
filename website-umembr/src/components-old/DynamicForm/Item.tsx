import { FC, createElement } from "react";

const Item: FC<any> = ({ render, props }) => {

  return (
    createElement(render, props)
  )
}

export default Item