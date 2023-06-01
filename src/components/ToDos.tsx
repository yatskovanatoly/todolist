import { Stack, Container, Button } from "@mui/material";
import { TextField } from "@mui/material";
import CheckboxList from "./CheckboxList";
import { FC, useState } from "react";
import format from "date-fns/format";
import {FormControl} from "@mui/material";

type item = {
  note: string;
  date: string;
};

const ToDos = () => {
  const [todos, setTodos] = useState<item[]>([
    {
      note: `🙏🏻 дать арсению по жопе 🙏🏻`,
      date: format(new Date(), "HH:mm, dd.MM yyyy"),
    },
  ]);
  const [value, setValue] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    const newObj = {
      note: value,
      date: format(new Date(), "HH:mm, dd.MM yyyy"),
    };
    setTodos((current) => [...current, newObj]);
    setValue("");
  };

  return (
    <Container maxWidth="sm">
      <Stack direction={"column"} gap={5} alignItems={"center"}>
        <CheckboxList todos={todos} />
          <form onSubmit={handleSubmit}>
            <TextField
              sx={{ mx: 1 }}
              size="small"
              autoComplete="off"
              autoCorrect="off"
              id="outlined-basic"
              variant="outlined"
              value={value}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setValue(event.target.value);
              }}
            />
            <Button
              sx={{ m: 0.2 }}
              type="submit"
              variant="outlined"
            >
              Add
            </Button>
          </form>
        </Stack>
    </Container>
  );
};

export default ToDos;
