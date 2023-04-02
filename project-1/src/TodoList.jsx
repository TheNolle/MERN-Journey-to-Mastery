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
