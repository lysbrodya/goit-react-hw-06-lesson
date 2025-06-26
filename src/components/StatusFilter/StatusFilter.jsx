import { setStatusFilter } from "../../redux/filtersSlice";
import { Button } from "../Button/Button";
import css from "./StatusFilter.module.css";
import { useDispatch, useSelector } from "react-redux";

export const StatusFilter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filters.status);

  const hendleFilter = (filter) => dispatch(setStatusFilter(filter));
  return (
    <div className={css.wrapper}>
      <Button onClick={() => hendleFilter("all")} selected={filter === "all"}>
        All
      </Button>
      <Button
        onClick={() => hendleFilter("active")}
        selected={filter === "active"}
      >
        Active
      </Button>
      <Button
        onClick={() => hendleFilter("completed")}
        selected={filter === "completed"}
      >
        Completed
      </Button>
    </div>
  );
};
