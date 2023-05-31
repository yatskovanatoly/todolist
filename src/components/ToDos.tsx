import { Stack, Container, Button } from "@mui/material";
import { TextField } from "@mui/material";
import CheckboxList from "./CheckboxList";
import { FC, useState } from "react";
// import { ItemProps } from "myTypes";
import format from "date-fns/format";

type item = {
  note: string;
  date: string;
  id: number;
  isChecked: boolean;
}

const ToDos = () => {
  const [todos, setTodos] = useState<item[]>([
    {
      note: `🙏🏻 дать полине по жопе 🙏🏻`,
      date: format(new Date(), "HH:mm, dd.MM yyyy"),
      id: 0,
      isChecked: false,
    },
  ]);
  const [value, setValue] = useState("");
  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <Container maxWidth="sm">
      <Stack direction={"column"} gap={5} alignItems={"center"}>
      {/* /////////это пробный лист дел без мюи ////
         {todos.map((todo) => ( 
          <li key={todo.id}>{todo.note}</li>
        ))}  */}
        <CheckboxList todos={todos}/>
        <Stack direction="row" spacing={2} justifyContent={"center"}>
          <TextField
            autoComplete="off"
            autoCorrect="off"
            id="outlined-basic"
            variant="outlined"
            value={value}
            onChange={handleChange}
          />
          <Button variant="outlined">Add</Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default ToDos;
