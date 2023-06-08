import { Stack, Typography, Container } from "@mui/material";
import CheckboxList from "./CheckboxList";
import { useState, useEffect } from "react";
import format from "date-fns/format";
import { FormattedMessage } from "react-intl";
import InputField from "./InputField";

type item = {
  note: string;
  date: string;
  onEdit: boolean;
  edited: boolean;
  checked: boolean;
};

type Storage = {}

const MainBlock: React.FC = () => {
  // const [todos, setTodos] = useState<item[]>([
  //   {
  //     note: `🙏🏻 дать арсению по жопе 🙏🏻`,
  //     date: format(new Date(), "HH:mm, dd.MM yyyy"),
  //     onEdit: false,
  //     edited: false,
  //     checked: false,
  //   },
  // ]);
  const storedTodos = JSON.parse(localStorage.getItem('todos') || '')
  const [todos, setTodos] = useState(storedTodos);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <Container maxWidth="sm">
      <Stack direction={"column"} gap={5} alignItems={"center"}>
        {todos.length > 0 ? (
          <CheckboxList todos={todos} setTodos={setTodos} />
        ) : (
          <Typography sx={{ opacity: 0.2 }}>
            <FormattedMessage
              id="noTasksMessage"
              defaultMessage="such a slacker"
            />
          </Typography>
        )}
        <InputField setTodos={setTodos} todos={todos} />
      </Stack>
    </Container>
  );
};

export default MainBlock;
