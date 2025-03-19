import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { fetchTodos } from './redux/slices/todoSlice';
import TodoList from './components/TodoList';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

const AppContent: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: any) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos() as any);
  }, [dispatch]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Список задач</h1>
        <ThemeToggle />
      </header>
      
      <main className="app-main">
        {loading ? (
          <div className="loading">Загрузка задач...</div>
        ) : error ? (
          <div className="error">Ошибка: {error}</div>
        ) : (
          <TodoList />
        )}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Загрузка...</div>} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
};

export default App;
