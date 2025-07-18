import { Layout } from "./Layout/Layout";
import { AppBar } from "./AppBar/AppBar";
import { TaskForm } from "./TaskForm/TaskForm";
import { TaskList } from "./TaskList/TaskList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../redux/operations";

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.tasks.isLoading);
  const error = useSelector((state) => state.tasks.error);

  useEffect(() => {
    dispatch(fetchTasks());
    return () => {};
  }, [dispatch]);

  return (
    <Layout>
      <AppBar />
      <TaskForm />
      {isLoading && !error && <b>In progress ...</b>}
      <TaskList />
    </Layout>
  );
};
