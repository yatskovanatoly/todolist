import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { useState } from "react";
import format from "date-fns/format";
import { FormattedMessage } from "react-intl";
import { useIntl } from "react-intl";

type Item = {
  setTodos: Function;
};

const InputField: React.FC<Item> = ({ setTodos }) => {
  const [value, setValue] = useState<string>("");
  const translatedMessage = useIntl().formatMessage({ id: "textfield" });
  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    if (value !== "") {
      e.stopPropagation();
      e.preventDefault();
      const newObj = {
        note: value,
        date: format(new Date(), "HH:mm, dd.MM yyyy"),
        onEdit: false, 
        edited: false,
        checked: false,
      };
      setTodos((current: any) => [...current, newObj]);
      setValue("");
    }
  };

  return (
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
  );
};

export default InputField;
