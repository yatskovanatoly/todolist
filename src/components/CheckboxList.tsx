import List from "@mui/material/List";
import format from "date-fns/format";
import ToDoItem from "./TodoItem";

const CheckboxList: React.FC<Item> = ({ todos, setTodos }) => {
  const handleToggle = (
    value: number,
  ) => {
    const updatedChecked = todos.map((obj, index) =>
      index === value ? { ...obj, checked: !obj.checked } : obj
    );
    setTodos(updatedChecked);
  };

  const handleEdit = (
    value: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    const updatedMode = todos.map((obj, index) =>
      index === value ? { ...obj, onEdit: true } : { ...obj, onEdit: false }
    );
    setTodos(updatedMode);
  };

  const handleUpdate = (value: number, note: string) => {
    const updatedTodo = todos.map((obj, index) =>
      index === value && note !== ""
        ? {
            ...obj,
            note,
            date: `${format(new Date(), "HH:mm, dd.MM yyyy")}`,
            onEdit: false,
            edited: true,
          }
        : { ...obj, onEdit: false }
    );
    setTodos(updatedTodo);
  };

  const handleDelete = (
    value: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    const updatedArray = todos.filter((obj, index) => index !== value);
    setTodos(updatedArray);
  };

  return (
    <List sx={{ width: "100%", minWidth: 250, bgcolor: "background.paper" }}>
      {todos.map((item, index) => (
        <ToDoItem
          key={index}
          handleEdit={handleEdit}
          handleUpdate={handleUpdate}
          handleToggle={handleToggle}
          handleDelete={handleDelete}
          index={index}
          {...item}
        />
      ))}
    </List>
  );
};

type Item = {
  todos: {
    note: string;
    date: string;
    onEdit: boolean;
    edited: boolean;
    checked: boolean;
  }[];
  setTodos: Function;
};

export default CheckboxList;
