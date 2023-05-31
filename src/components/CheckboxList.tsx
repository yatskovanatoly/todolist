import { Typography } from "@mui/material";
import { FC, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { format } from "date-fns";
// import { ItemProps } from "myTypes";




const CheckboxList = ({todos}: any) => {
  const [checked, setChecked] = useState([-1]);

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
      {[0, 1, 2, 3].map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem key={value} disablePadding divider>
            <ListItemButton
              role={undefined}
              onClick={handleToggle(value)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText
                sx={
                  checked.indexOf(value) !== -1
                    ? { textDecoration: "line-through", opacity: 0.3 }
                    : {}
                }
                id={labelId}
                primary={null}
              />
            
            </ListItemButton>
            <Typography
              sx={{ opacity: 0.3, p: 1, userSelect: "none", fontSize: 12, textAlign: 'right' }}
            >
            </Typography>
          </ListItem>
        );
      })}
    </List>
  );
}

export default CheckboxList;
