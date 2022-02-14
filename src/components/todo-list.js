import React from 'react';

import TodoListItem from './todo-list-item';

const TodoList = ({todos}) => {

    const elements = todos.map((item) => {
        
        const {id, ...itemProps} = item; // чтобы не передавать лишний id в todolistitem, отделили id и itemprops
        return (
            <li key={id}>
                <TodoListItem {...itemProps} />
            </li> 
        );
    });

    return (
        <ul>
            {elements}
        </ul>
    );
}

export default TodoList;