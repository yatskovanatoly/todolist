import { Button } from "@mui/material";
import { TextField, Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import format from "date-fns/format";
import { FormattedMessage } from "react-intl";
import { useIntl } from "react-intl";

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

const InputField: React.FC<Item> = ({ todos, setTodos }) => {
  const [value, setValue] = useState<string>("");
  const translatedMessage = useIntl().formatMessage({ id: "textfield", defaultMessage: "add your task here" });
  const handleSubmit = () => {
    if (value !== "") {
      const newObj = {
        note: value,
        date: format(new Date(), "HH:mm, dd.MM yyyy"),
        onEdit: false,
        edited: false,
        checked: false,
      };
      setTodos(
        (
          current: {
            note: string;
            date: string;
            onEdit: boolean;
            edited: boolean;
            checked: boolean;
          }[]
        ) => [...current, newObj]
      );
    }
    setValue("");
  };

  const ref = useRef<HTMLElement>();

  useEffect(() => {
    if (document.activeElement === ref.current) {
      const handler = function (k: KeyboardEvent) {
        if (k.code === "Enter") handleSubmit();
      };
      window.addEventListener("keydown", handler);
      return () => window.removeEventListener("keydown", handler);
    }
  }, [ref, value, handleSubmit]);

  const resetEdit = todos.map((obj) => ({ ...obj, onEdit: false }));

  return (
    <Stack direction={"row"} >
      <TextField
        onFocus={() => setTodos(resetEdit)}
        inputRef={ref}
        required={true}
        sx={{ mx: 1, minWidth: 200 }}
        fullWidth
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
        sx={{ mx: 1, maxWidth: 50, fontSize: 10, paddingInline: 5 }}
        variant="outlined"
        onClick={handleSubmit}
      >
        <FormattedMessage id="button" defaultMessage="add" />
      </Button>
    </Stack>
  );
};

export default InputField;
