import { Stack, Container, Button, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import CheckboxList from "./CheckboxList";
import { useState } from "react";
import format from "date-fns/format";
import { FormattedMessage } from "react-intl";
import { useIntl } from "react-intl";
import InputField from "./InputField";

type item = {
  note: string;
  date: string;
  onEdit: boolean;
  edited: boolean;
  checked: boolean;
};

const ToDos: React.FC = () => {
  const [todos, setTodos] = useState<item[]>([
    {
      note: `🙏🏻 дать арсению по жопе 🙏🏻`,
      date: format(new Date(), "HH:mm, dd.MM yyyy"),
      onEdit: false,
      edited: false,
      checked: false,
    },
  ]);

  return (
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
      <InputField setTodos={setTodos} />
    </Stack>
  );
};

export default ToDos;
