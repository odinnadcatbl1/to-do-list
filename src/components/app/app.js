import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {
  maxId = 0; // для генерации id

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Learn React'),
      this.createTodoItem('Have a lunch')
    ],
    temp: '',
    filter: 'all'
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  };

  deleteItem = (id) => {
    this.setState(({todoData}) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx+1)];

      return {
        todoData: newArray
      }
    })
  }; 

  addItem = (text) => {
     const newItem = this.createTodoItem(text);

     this.setState(({todoData}) => {
        return {
          todoData: [...todoData, newItem]
        }
     });
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx+1)];
  }

  onToggleImportant = (id) => {
    this.setState(({todoData})=>{
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    })
  };
  
  onToggleDone = (id) => {
    this.setState(({todoData})=>{
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    })
  };

  onSearch = (temp) => {
    this.setState({temp});
  };

  search(items, temp) {
    if (temp.length === 0) {
      return items;
    }
    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(temp.toLowerCase()) > -1; // вернет 0 или больше, если такая строка содержится
    });
  };

  filterItems(items, filter) {
    switch(filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  };

  onFilterChange = (filter) => {
    this.setState({filter});
  };

  render() {
    const {todoData, temp, filter} = this.state;
    const visibleItems = this.filterItems(this.search(todoData, temp), filter);
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel 
            onSearch={this.onSearch}/>
          <ItemStatusFilter 
            filter={filter}
            onFilterChange={this.onFilterChange}/>
        </div>
  
        <TodoList todos={visibleItems}
        onDeleted={this.deleteItem}
        onToggleImportant={this.onToggleImportant}
        onToggleDone={this.onToggleDone} />

        <ItemAddForm onItemAdded={this.addItem}/>
      </div>
    );
  }
};

