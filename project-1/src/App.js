import React, { Component } from 'react'

import './App.scss'

import TodoList from './TodoList'

class App extends Component {
  constructor(props) {
    super(props)
    const storedTodos = localStorage.getItem('todos')
    this.state = { todos: storedTodos ? JSON.parse(storedTodos) : [], newTodo: '' }
    this.addTodo = this.addTodo.bind(this)
    this.completeTodo = this.completeTodo.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentDidUpdate() {
    localStorage.setItem('todos', JSON.stringify(this.state.todos))
  }

  addTodo() {
    const { newTodo, todos } = this.state;
    if (newTodo.trim() !== '') {
      const exists = todos.some((todo) => todo.title === newTodo);
      if (!exists) {
        todos.push({ title: newTodo, completed: false });
        this.setState({ todos, newTodo: '' });
      } else {
        alert('This task already exists in the list!');
      }
    }
  }

  completeTodo(index) {
    const { todos } = this.state
    todos[index].completed = !todos[index].completed
    this.setState({ todos })
  }

  deleteTodo(index) {
    const { todos } = this.state
    todos.splice(index, 1)
    this.setState({ todos })
  }

  handleInputChange(event) {
    this.setState({ newTodo: event.target.value })
  }

  render() {
    const { todos, newTodo } = this.state
    return (
      <div className="App">
        <h1>Todo Mastery</h1>
        <TodoList
          todos={todos}
          newTodo={newTodo}
          addTodo={this.addTodo}
          completeTodo={this.completeTodo}
          deleteTodo={this.deleteTodo}
          handleInputChange={this.handleInputChange}
        />
      </div>
    )
  }
}

export default App
