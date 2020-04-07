import React from "react"

const Pizza = (props) => {
  return(
    <tr>
      <td>{props.pizza.topping}</td>
      <td>{props.pizza.size}</td>
      <td>{props.pizza.vegetarian ? "Yes" : "No"}</td>
      <td><button type="button" onClick = {() => props.handleEditClick(props.pizza)} className="btn btn-primary">Edit Pizza</button></td>
    </tr>
  )
}

export default Pizza
