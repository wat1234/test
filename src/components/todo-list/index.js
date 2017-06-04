export const TodoList = connect(
  state => ({ todos: state }),
  dispatch => bindActionCreators({ addTodo, toggleTodo, clearTodos }, dispatch)
)(({ todos, toggleTodo, addTodo, clearTodos }) =>
    <div style={{ minHeight: "100%", position: "relative", padding: "20px" }}>
      <InputTodo addTodo={addTodo} />
      <ShowTodos todos={todos} toggleTodo={toggleTodo} />
      <Clear clearTodos={clearTodos} />
    </div>
);

const InputTodo = ({ addTodo }) =>
  <TextField
    hintText="Add Todo"
    fullWidth={true} onKeyDown={event => {
      // eject if the key press is not return or the value is empty
      if (event.which !== 13 || event.target.value.length <= 0) { return null };
      addTodo(event.target.value);
      event.target.value = '';
    }} />

const ShowTodos = ({ todos, toggleTodo }) =>
  <div style={{ height: "65vh", overflow: "scroll" }}>
    {todos.map(todo =>
      <div key={todo.get("id")} style={{ margin: "20px 0 20px 0" }}>
        <Todo
          handleClick={ e => toggleTodo(todo.get("id"), todo.get("isDone")) }
          todo={todo} />
        <Divider />
      </div>)}
  </div>

const Clear = ({ clearTodos }) =>
  <RaisedButton label="Clear"
                secondary={true}
                fullWidth={true}
                onClick={event => clearTodos()} />

import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addTodo, toggleTodo, clearTodos } from "../../actions";
import { Todo } from "../todo";
import Divider from "material-ui/Divider";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from "material-ui/Toolbar";
