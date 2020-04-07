// changed from instructions a little bit so could add a new pizza

import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {
  constructor () {
    super()
    this.state = {
      pizzas: [],
      currentTopping: "",
      currentSize: "Small",
      vegetarianStatus: true,
      editPizzaId: null
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/pizzas')
    .then (resp => resp.json())
    .then (pizzas => {
     this.setState({pizzas: pizzas})})
  }
  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm handleSubmit = {this.handleSubmit} handleVegetarianOnChange = {this.handleVegetarianOnChange} handleToppingOnChange = {this.handleToppingOnChange} handleSizeOnChange = {this.handleSizeOnChange} vegetarianStatus = {this.state.vegetarianStatus} currentSize = {this.state.currentSize} currentTopping = {this.state.currentTopping}/>
        <PizzaList handleEditClick = {this.handleEditClick} pizzas = {this.state.pizzas}/>
      </Fragment>
    );
  }

  handleEditClick = (pizza) => {
    this.setState({currentTopping: pizza.topping,
    currentSize: pizza.size,
    vegetarianStatus: pizza.vegetarian,
    editPizzaId: pizza.id})
  }

  handleToppingOnChange = (event) => {
    this.setState({currentTopping: event.target.value})
  }

  handleSizeOnChange = (event) => {
    this.setState({currentSize: event.target.value})
  }

  handleVegetarianOnChange = (event) => {
    if (event.target.value === "Not Vegetarian"){
      this.setState({vegetarianStatus: false}) 
    } else {
      this.setState({vegetarianStatus: true}) 
    }
  }

  handleSubmit = () => {
    if (this.state.editPizzaId) {
      fetch(`http://localhost:3000/pizzas/${this.state.editPizzaId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topping: this.state.currentTopping, size: this.state.currentSize, vegetarian: this.state.vegetarianStatus })
    }).then(resp => resp.json())
    .then(pizza => {console.log(pizza)
      let updatedPizza = this.state.pizzas.find(pizza => pizza.id === this.state.editPizzaId)
      updatedPizza.topping = this.state.currentTopping
      updatedPizza.size = this.state.currentSize
      updatedPizza.vegetarian = this.state.vegetarianStatus
      this.setState({currentTopping: "",
      currentSize: "Small",
      vegetarianStatus: true, 
    editPizzaId: null})
    })
    } else {
     fetch('http://localhost:3000/pizzas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topping: this.state.currentTopping, size: this.state.currentSize, vegetarian: this.state.vegetarianStatus })
  }).then (resp => resp.json())
    .then (pizza => this.setState({pizzas: [...this.state.pizzas, pizza],
      currentTopping: "",
      currentSize: "Small",
      vegetarianStatus: true}))
  }}

}

export default App;


