import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";
import filtersReducer from "./filtersSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const filterPersistCfg = {
  key: "filter",
  storage,
  whitelist: ["status"],
};

const tasksPersistCfg = {
  key: "tasks",
  storage,
  whitelist: ["items"],
};

const persistedFilterReducer = persistReducer(filterPersistCfg, filtersReducer);

const persistedtasksReducer = persistReducer(tasksPersistCfg, tasksReducer);

export const store = configureStore({
  reducer: {
    tasks: persistedtasksReducer,
    filters: persistedFilterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Поки що використовуємо редюсер який
// тільки повертає отриманий стан Redux

// const initialState = {
//   tasks: {
//     items: [
//       { id: 0, text: "Learn HTML and CSS", completed: true },
//       { id: 1, text: "Get good at JavaScript", completed: true },
//       { id: 2, text: "Master React", completed: false },
//       { id: 3, text: "Discover Redux", completed: false },
//       { id: 4, text: "Build amazing apps", completed: false },
//     ],
//   },
//   filters: {
//     status: "all",
//   },
// };

// const taskReduser = (state = initialState.tasks, action) => {
//   switch (action.type) {
//     case "tasks/addTask": {
//       return {
//         ...state,
//         items: [...state.items, action.payload],
//       };
//     }
//     case "tasks/deleteTask":
//       return {
//         ...state,
//         items: state.tasks.items.filter((task) => task.id !== action.payload),
//       };
//     case "tasks/toggleCompleted":
//       return {
//         ...state,
//         items: state.tasks.items.map((task) => {
//           if (task.id !== action.payload) {
//             return task;
//           }
//           return {
//             ...task,
//             completed: !task.completed,
//           };
//         }),
//       };
//     default:
//       return state;
//   }
// };
// const filtersReducer = (state = initialState.filters, action) => {
//   switch (action.type) {
//     case "filters/setStatusFilter":
//       return {
//         ...state,
//         status: action.payload,
//       };
//     default:
//       return state;
//   }
// };
// const rootReducer = (state = initialState, action) => {
//   // Редюсер розрізняє екшени за значенням властивості type
//   switch (action.type) {
//     // Залежно від типу екшену виконуватиметься різна логіка
//     case "tasks/addTask": {
//       // Потрібно повернути копію об'єкту поточного стану
//       // в якому є всі дані існуючого стану
//       return {
//         ...state,
//         tasks: {
//           // та новий масив задач в якому є всі існуючі завдання
//           // та об'єкт нового завдання
//           items: [...state.tasks.items, action.payload],
//         },
//       };
//     }
//     case "tasks/deleteTask":
//       return {
//         ...state,
//         tasks: {
//           items: state.tasks.items.filter((task) => task.id !== action.payload),
//         },
//       };
//     case "filters/setStatusFilter":
//       return {
//         ...state,
//         filters: { status: action.payload },
//       };
//     case "tasks/toggleCompleted":
//       return {
//         ...state,
//         tasks: {
//           items: state.tasks.items.map((task) => {
//             if (task.id !== action.payload) {
//               return task;
//             }
//             return {
//               ...task,
//               completed: !task.completed,
//             };
//           }),
//         },
//       };
//     // Залежно від типу екшену виконуватиметься різна логіка

//     // Кожен редюсер отримує всі екшени, відправлені в стор.
//     // Якщо редюсер не повинен обробляти якийсь тип екшену,
//     // необхідно повернути наявний стан без змін.
//     default:
//       return state;
//   }
// };

// export const store = configureStore({
//   reducer: {
//     tasks: tasksReducer,
//     filters: filtersReducer,
//   },
// });
