import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Определение типа задачи
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

// Тип состояния
interface TodoState {
  items: Todo[];
  loading: boolean;
  error: string | null;
}

// Начальное состояние
const initialState: TodoState = {
  items: [],
  loading: false,
  error: null,
};

// Асинхронный thunk для имитации загрузки задач с сервера
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    try {
      // Имитация задержки сетевого запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Получаем задачи из локального хранилища или возвращаем пустой массив
      const savedTodos = localStorage.getItem('todos');
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      return rejectWithValue('Ошибка при загрузке задач');
    }
  }
);

// Создание slice
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // Добавление задачи
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.items.push(action.payload);
      localStorage.setItem('todos', JSON.stringify(state.items));
    },
    // Переключение статуса задачи
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.items.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        localStorage.setItem('todos', JSON.stringify(state.items));
      }
    },
    // Редактирование текста задачи
    editTodo: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const todo = state.items.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
        localStorage.setItem('todos', JSON.stringify(state.items));
      }
    },
    // Удаление задачи
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(todo => todo.id !== action.payload);
      localStorage.setItem('todos', JSON.stringify(state.items));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Экспорт actions
export const { addTodo, toggleTodo, editTodo, deleteTodo } = todoSlice.actions;

// Экспорт reducer
export default todoSlice.reducer; 