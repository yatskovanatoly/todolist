import { Autocomplete, Typography } from "@mui/material";
import { FC, useState, useEffect, useRef } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { TextField } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import format from "date-fns/format";

const CheckboxList: FC<Item> = ({ todos, setTodos }) => {
  const [checked, setChecked] = useState([-1]);
  const handleToggle = (value: number) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleEdit = (value: number) => {
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
            date: `modified ${format(new Date(), "HH:mm, dd.MM yyyy")}`,
            onEdit: false,
          }
        : { ...obj, onEdit: false }
    );
    setTodos(updatedTodo);
  };

  const handleDelete = (value: number) => {
    const updatedArray = todos.filter((obj, index) => index !== value);
    setTodos(updatedArray);
  };

  return (
    <List sx={{ width: "100%", minWidth: 250, bgcolor: "background.paper" }}>
      {todos.map((item, index) => (
        <ToDoItem
          key={index}
          checked={checked}
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

const ToDoItem: FC<TodoItemProps> = ({
  index,
  checked,
  handleEdit,
  handleUpdate,
  handleDelete,
  handleToggle,
  ...item
}) => {
  const [editValue, setEditValue] = useState<string>("");
  const labelId = `checkbox-list-label-${index}`;
  const ref = useRef<HTMLElement>();

  useEffect(() => {
    if (ref.current && document.activeElement === ref.current && item.onEdit) {
      const handler = function (k: KeyboardEvent) {
        if (k.code === "Enter") handleUpdate(index, editValue);
      };
      window.addEventListener("keydown", handler);
      return () => window.removeEventListener("keydown", handler);
    }
  }, [ref, editValue, handleUpdate]);

  return (
    <ListItem
      key={index}
      disablePadding
      divider
      onClick={() => handleToggle(index)}
    >
      {!item.onEdit ? (
        <>
          <ListItemButton role={undefined} dense>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(index) !== -1}
                tabIndex={-1}
                disableRipple
                sx={{ ml: -3 }}
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>
            <ListItemText
              sx={
                checked.indexOf(index) !== -1
                  ? {
                      wordWrap: "break-word",
                      textDecoration: "line-through",
                      opacity: 0.3,
                      minWidth: 150,
                      ml: -3,
                    }
                  : {
                      wordWrap: "break-word",
                      minWidth: 150,
                      ml: -3,
                    }
              }
              id={labelId}
              primary={item.note}
            />{" "}
            <IconButton
              aria-label="edit"
              size="small"
              onClick={() => handleEdit(index)}
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => handleDelete(index)}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
            <Typography
              sx={{
                opacity: 0.3,
                userSelect: "none",
                fontSize: 12,
                textAlign: "right",
                minWidth: 50,
              }}
            >
              {item.date}
            </Typography>
          </ListItemButton>
        </>
      ) : (
        <>
          <TextField
            inputRef={ref}
            focused
            autoFocus
            fullWidth
            size="small"
            autoComplete="off"
            autoCorrect="off"
            id="outlined-basic"
            variant="standard"
            defaultValue={item.note}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setEditValue(event.target.value);
            }}
          />
          <IconButton
            color="primary"
            aria-label="done"
            size="medium"
            onClick={() => handleUpdate(index, editValue)}
          >
            <DoneIcon fontSize="inherit" />
          </IconButton>
        </>
      )}
    </ListItem>
  );
};

type Item = {
  todos: {
    note: string;
    date: string;
    onEdit: boolean;
  }[];
  setTodos: Function;
};

type TodoItemProps = Item["todos"][number] & {
  index: number;
  checked: number[];
  handleEdit: (index: number) => void;
  handleUpdate: (index: number, note: string) => void;
  handleDelete: (index: number) => void;
  handleToggle: (index: number) => void;
};

export default CheckboxList;
