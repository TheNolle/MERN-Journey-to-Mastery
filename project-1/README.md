# Project 1: Todo Mastery

Todo Mastery is a simple Todo List application built using ReactJS, SCSS, and HTML. This project focuses on the basics of ReactJS, including components, JSX, state, and props. By following the tutorial below, you can learn these concepts and build the Todo List App too.



## Summary
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Tutorial](#tutorial)
  - [Step 1: Setup the Project](#step-1-setup-the-project)
  - [Step 2: Create Components](#step-2-create-components)
  - [Step 3: Implement the App component](#step-3-implement-the-app-component)
- [Conclusion](#conclusion)



## Features

- Add new tasks to the list
- Mark tasks as complete by clicking on them
- Delete tasks from the list
- LocalStorage implementation to save todos



## Technologies Used

- [ReactJS](https://reactjs.org/)
- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [SCSS](https://sass-lang.com/)



## Tutorial

### Step 1: Setup the Project
1. Install [NodeJS](https://nodejs.org/en/) if you haven't already.
2. Open your terminal and run the following command to install Create React App globally: `npm install -g create-react-app`
3. Create a new React app by running the following command: `create-react-app todo-mastery`
4. Navigate to the project directory: `cd todo-mastery`


### Step 2: Create Components

In the `src` directory, create the following components:
1. `App.js` - This will be the main component that contains our Todo List.
2. `TodoList.js` - This component will render the list of todo items.
3. `TodoItem.js` - This component will represent each individual todo item.


### Step 3: Implement the App component

1. In `App.js`, import the necessary dependencies:  
```js
import React, { Component } from 'react'
import './App.scss'
import TodoList from './TodoList'
```

2. Create the `App` component:  
```js
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
```

3. Implement methods for adding, marking as complete, and deleting tasks.  
In the `App` component, we need to implement the methods for adding a new todo, marking a todo as complete, and deleting a todo. We've already added the function signatures in the constructor of the `App` component, so we'll implement them now.  
Here are the methods that we need to implement:
```js
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
```
The `addTodo` method checks whether the new todo is not an empty string and whether the todo already exists in the list. If the new todo is valid and doesn't exist in the list, we add it to the `todos` array and reset the `newTodo` state to an empty string. If the new todo already exists in the list, we show an alert.  
The `completeTodo` method toggles the completion status of a todo item based on its index in the `todos` array.  
The `deleteTodo` method removes a todo item from the `todos` array based on its index.

4. Implement the TodoList and TodoItem components  
Now that we have the basic functionality of our app working, we need to create the `TodoList` and `TodoItem` components.  
In the `TodoList` component, we'll render a list of `TodoItem` components. We'll also add a form for users to create new todo items.
```js
import React from 'react'

import './TodoList.scss'

import TodoItem from './TodoItem'

function TodoList({ todos, newTodo, addTodo, completeTodo, deleteTodo, handleInputChange }) {
    return (
        <div className="todo-list-container">
            <div className="create-todo-container">
                <input
                    type="text"
                    placeholder="Create new todo"
                    value={newTodo}
                    onChange={handleInputChange}
                    onKeyDown={e => { if (e.key === 'Enter') addTodo() }}
                />
                <button onClick={addTodo}>Add</button>
            </div>
            <ul className="todo-list">
                {todos.map((todo, index) => (
                    <TodoItem
                        key={index}
                        todo={todo}
                        index={index}
                        completeTodo={completeTodo}
                        deleteTodo={deleteTodo}
                    />
                ))}
            </ul>
        </div>
    )
}

export default TodoList
```
In the `TodoItem` component, we'll render each individual todo item. We'll also add a button for users to delete the todo item.
```js
import React from 'react'

import './TodoItem.scss'

function TodoItem({ todo, index, completeTodo, deleteTodo }) {
    return (
        <li className="todo-item">
            <div
                className={`title ${todo.completed ? 'completed' : ''}`}
                onClick={() => completeTodo(index)}
                title={todo.completed ? 'Click me to un-complete this task.' : 'Click me to complete this task.'}
            >
                {todo.title}
            </div>
            <button className="delete" onClick={() => deleteTodo(index)} title={`Delete ${todo.title}`}>
                ❌
            </button>
        </li>
    )
}

export default TodoItem
```

5. Now that we have created the `App`, `TodoList`, and `TodoItem` components, we can import them into App.js and use them to create our Todo List app. In the `render` method of the App component, we will render the `TodoList` component and pass it the necessary props:
```js
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
```

6. With all the components in place, we can now run our Todo List app. In your terminal, run the following command from the project directory to start the app:
```bash
npm start
```

7. Once the app is running, open your browser and visit `http://localhost:3000` to view the Todo List app.

---

Great job! You have now built a simple Todo List application using ReactJS. This project has covered the basics of ReactJS, including components, JSX, state, and props.

---

### Conclusion

By following this tutorial, you have learned how to:
- Create React components and organize them into a component hierarchy
- Use JSX to define the structure and appearance of each component
- Manage component state using this.state and this.setState
- Pass data between components using props
- Use localStorage to persist data across sessions
- Implement basic SCSS styles for a React application

This is just the beginning of your journey in ReactJS and web development. From here, you can build on this foundation to explore more advanced concepts and create more complex applications.