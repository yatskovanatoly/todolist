import { Typography } from "@mui/material";
import { FC, useState, useEffect, useRef } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { IconButton, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { TextField } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { useIntl } from "react-intl";

const ToDoItem: FC<TodoItemProps> = ({
  index,
  handleEdit,
  handleUpdate,
  handleDelete,
  handleToggle,
  ...item
}) => {
  const [editValue, setEditValue] = useState<string>("");
  const translatedMessage = useIntl().formatMessage({ id: "modified", defaultMessage: 'modified: ' });
  const labelId = `checkbox-list-label-${index}`;
  const ref = useRef<HTMLElement>();

  useEffect(() => {
    if (document.activeElement === ref.current && item.onEdit) {
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
      onClick={(event) => (item.onEdit ? null : handleToggle(index, event))}
    >
      {!item.onEdit ? (
        <>
          <ListItemButton role={undefined} dense>
            <ListItemIcon>
              <Checkbox
                edge='start'
                checked={item.checked}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>
            <ListItemText
              sx={
                item.checked
                  ? {
                      wordWrap: "break-word",
                      textDecoration: "line-through",
                      opacity: 0.3,
                    }
                  : {
                      wordWrap: "break-word",
                    }
              }
              id={labelId}
              primary={item.note}
            />{" "}
            <IconButton
              aria-label="edit"
              size="small"
              sx={{opacity: 0.5, m: 0.3}}
              onClick={(event) => handleEdit(index, event)}
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              aria-label="delete"
              size="small"
              sx={{opacity: 0.5, m: 0.3}}
              onClick={(event) => handleDelete(index, event)}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
            <Stack maxWidth={90} >
              <Typography
                sx={{
                  opacity: 0.3,
                  userSelect: "none",
                  fontSize: 10,
                  textAlign: "right",
                  width: 33,
                }}
              >
                {item.edited ? translatedMessage : ""}
                {item.date}
              </Typography>
            </Stack>
          </ListItemButton>
        </>
      ) : (
        <>
          <TextField
            inputRef={ref}
            autoFocus
            fullWidth
            size="small"
            autoComplete="off"
            autoCorrect="off"
            id="outlined-basic"
            variant="standard"
            defaultValue={item.note}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEditValue(e.target.value);
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
    edited: boolean;
    checked: boolean;
  }[];
  setTodos: Function;
};

type TodoItemProps = Item["todos"][number] & {
  index: number;
  handleEdit: (
    index: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  handleUpdate: (index: number, note: string) => void;
  handleDelete: (
    index: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  handleToggle: (index: number, event: React.MouseEvent<HTMLLIElement>) => void;
};

export default ToDoItem;
