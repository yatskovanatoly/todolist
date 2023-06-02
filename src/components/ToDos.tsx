import { Stack, Container, Button, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import CheckboxList from "./CheckboxList";
import { useState } from "react";
import format from "date-fns/format";
import { FormattedMessage } from "react-intl";
import { useIntl } from "react-intl";

type item = {
  note: string;
  date: string;
  onEdit: boolean;
};

const ToDos: React.FC = () => {
  const [todos, setTodos] = useState<item[]>([
    {
      note: `🙏🏻 дать арсению по жопе 🙏🏻`,
      date: format(new Date(), "HH:mm, dd.MM yyyy"),
      onEdit: false,
    },
  ]);
  const [value, setValue] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    const newObj = {
      note: value,
      date: format(new Date(), "HH:mm, dd.MM yyyy"),
      onEdit: false,
    };
    setTodos((current) => [...current, newObj]);
    setValue("");
  };

  const translatedMessage = useIntl().formatMessage({ id: "textfield" });

  return (
    <Container maxWidth="sm">
      <Stack direction={"column"} gap={5} alignItems={"center"}>
        {todos.length > 0 ? (
          <CheckboxList
            todos={todos}
            setTodos={setTodos}
            setValue={setValue}
            text={value}
          />
        ) : (
          <Typography sx={{ opacity: 0.2 }}>
            <FormattedMessage
              id="noTasksMessage"
              defaultMessage="such a slacker"
            />
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            required
            sx={{ mx: 0.5 }}
            size="small"
            autoComplete="off"
            autoCorrect="off"
            id="outlined-basic"
            variant="outlined"
            placeholder={translatedMessage}
            value={value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setValue(event.target.value);
            }}
          />
          <Button
            className="button"
            sx={{ mx: 0.5 }}
            type="submit"
            variant="outlined"
          >
            <FormattedMessage id="button" defaultMessage="add" />
          </Button>
        </form>
      </Stack>
    </Container>
  );
};

export default ToDos;
