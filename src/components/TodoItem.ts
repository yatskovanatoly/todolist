import DeleteIcon from '@mui/icons-material/Delete'
import DoneIcon from '@mui/icons-material/Done'
import HistoryIcon from '@mui/icons-material/History'
import { Box, ClickAwayListener, IconButton, ListItem, ListItemButton, ListItemText, TextField } from '@mui/material'
import { createElement as $, FC, useState } from 'react'

const TodoItem: FC<TodoItemProps> = (props) => {
  const [isEditing, setIsEditing] = useState(false)
  return isEditing
    ? $(Edit, {
        note: props.note,
        onChange: (value) => props.handleUpdate(props.index, value),
        onDelete: () => props.handleDelete(props.index),
        setViewing: () => setIsEditing(false)
      })
    : $(View, {
        isDone: props.checked,
        onDone: () => props.handleToggle(props.index),
        setEditing: () => setIsEditing(true),
        note: props.note,
        date: props.date
      })
}

const View: FC<ViewProps> = ({ isDone, ...props }) =>
  isDone
    ? $(ViewDone, props)
    : $(ViewActive, props)

const ViewDone: FC<Omit<ViewProps, 'isDone'>> = ({
  note,
  date,
  onDone
}) =>
  $(ListItem, {
    secondaryAction: $(IconButton, { onClick: onDone }, $(HistoryIcon)),
    },
    $(ListItemText, {
      sx: { textDecoration: 'line-through' },
      primary: note,
      secondary: date
    }))

const ViewActive: FC<Omit<ViewProps, 'isDone'>> = ({
  note,
  date,
  onDone,
  setEditing
}) =>
  $(ListItem, {
    secondaryAction: $(IconButton, { onClick: onDone }, $(DoneIcon)),
    disablePadding: true
    },
    $(ListItemButton, { onClick: setEditing },
      $(ListItemText, { primary: note, secondary: date })))

const Edit: FC<EditProps> = ({
  note,
  setViewing,
  onChange,
  onDelete
}) =>
  $(ClickAwayListener, {
    onClickAway: setViewing,
    children:
      $(Box, { padding: '.5rem 0' },
        $(TextField, {
          onChange: (event) => onChange(event.target.value),
          value: note,
          autoFocus: true,
          fullWidth: true,
          variant: 'outlined',
          InputProps: {
            endAdornment: $(IconButton, { onClick: onDelete }, $(DeleteIcon))
          }
        }))})


type ViewProps = Pick<TodoItemProps, 'note' | 'date'> & {
  isDone: boolean
  setEditing: () => void
  onDone: () => void
}

type EditProps = Pick<TodoItemProps, 'note'> & {
  onChange: (value: string) => void
  onDelete: () => void
  setViewing: () => void
}

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


export type TodoItemProps = Item["todos"][number] & {
  index: number;
  handleEdit: (
    index: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  handleUpdate: (index: number, note: string) => void;
  handleDelete: (
    index: number,
  ) => void;
  handleToggle: (index: number) => void;
};

export default TodoItem