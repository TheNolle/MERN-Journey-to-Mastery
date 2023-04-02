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
