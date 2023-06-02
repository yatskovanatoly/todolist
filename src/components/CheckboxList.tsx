import { Autocomplete, Typography } from "@mui/material";
import { FC, useState } from "react";
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

type item = {
  todos: {
    note: string;
    date: string;
    onEdit: boolean;
  }[];
  setTodos: Function;
  setValue: Function;
  text: string;
};

const CheckboxList: FC<item> = ({ todos, setTodos, setValue, text }) => {
  const [checked, setChecked] = useState([-1]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>("");

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List sx={{ width: "100%", minWidth: 250, bgcolor: "background.paper" }}>
      {todos.map((item: any, value: number) => {
        const labelId = `checkbox-list-label-${value}`;
        const handleEdit = () => {
          const updatedMode = todos.map((obj, index) =>
            index === value ? { ...obj, onEdit: true } : obj
          );
          setTodos(updatedMode);
        };
        const handleUpdate = (e: React.FormEvent<HTMLElement>) => {
          e.preventDefault();
          const updatedTodo = todos.map((obj, index) =>
            index === value && editValue !== ""
              ? {
                  ...obj,
                  note: editValue,
                  date: `modified ${format(new Date(), "HH:mm, dd.MM yyyy")}`,
                  onEdit: false,
                }
              : { ...obj, onEdit: false }
          );
          setTodos(updatedTodo);
        };
        const handleDelete = () => {
          const updatedArray = todos.filter((obj, index) => index !== value);
          setTodos(updatedArray);
        };
        return (
          <ListItem key={value} disablePadding divider>
            {!item.onEdit ? (
              <>
                <ListItemButton role={undefined} dense>
                  <ListItemIcon>
                    <Checkbox
                      onClick={handleToggle(value)}
                      edge="start"
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      sx={{ ml: -3 }}
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    sx={
                      checked.indexOf(value) !== -1
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
                    onClick={handleEdit}
                  >
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={handleDelete}
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
                <ListItemText>
                  <form onSubmit={handleUpdate}>
                    <TextField
                      focused
                      autoFocus
                      fullWidth
                      size="small"
                      autoComplete="off"
                      autoCorrect="off"
                      id="outlined-basic"
                      variant="standard"
                      defaultValue={item.note}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setEditValue(event.target.value);
                      }}
                    />
                  </form>
                </ListItemText>
                <IconButton
                  color="primary"
                  aria-label="done"
                  size="medium"
                  onClick={handleUpdate}
                >
                  <DoneIcon fontSize="inherit" />
                </IconButton>
              </>
            )}
          </ListItem>
        );
      })}
    </List>
  );
};

export default CheckboxList;
