import Text from '../components/Text/Text';
import Form from '../components/Form/Form';
import { useState, useEffect } from 'react';
import inTodos from '../components/todos.json';
import TodoList from '../components/TodoList/TodoList';
import { nanoid } from 'nanoid';
const Todos = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const addNewTodos = text => {
    const newTodo = { id: nanoid(), text };
    setTodos(prev => [newTodo, ...prev]);
  };
  const deleteTodo = todoId => {
    setTodos(prevTodos => {
      return prevTodos.filter(el => el.id !== todoId);
    });
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <Form onSubmit={addNewTodos} />
      <Text textAlign="center">There are no any todos ...</Text>
      <TodoList onDelete={deleteTodo} todos={todos} />
    </>
  );
};

export default Todos;
