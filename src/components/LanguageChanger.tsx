import * as React from "react";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import { Context } from "./Localisation";
import { useContext } from "react";
import { Select } from "@mui/material";

// type ChangerTypes = {
//   selectLanguage: (e: React.ChangeEvent<HTMLSelectElement>) => void;
// }

// const LanguageChanger: React.FC<ChangerTypes> = ({selectLanguage}) => {
const LanguageChanger = () => {
  const context = useContext(Context);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleListItemClick = (locale: string) => {
    context.selectLanguage({ target: { value: locale } } as React.ChangeEvent<HTMLSelectElement>);
    
    setOpen(false);
  };


  const handleClose = (event: Event | React.SyntheticEvent, locale: string) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
   handleListItemClick(locale)

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <Stack direction="row" spacing={2}>
        <Button
          size="large"
          sx={{ fontSize: 20 }}
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          // onChange={context.selectLanguage}
        >
          {context.locale}
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={(event) => handleClose(event, context.locale)}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={(event) => handleClose(event, 'ru')}>
                      Русский
                    </MenuItem>
                    <MenuItem onClick={(event) => handleClose(event, 'en')}>
                      English
                    </MenuItem>
                    <MenuItem onClick={(event) => handleClose(event, 'fr')}>
                      Français
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
    </Stack>
  );
}

export default LanguageChanger