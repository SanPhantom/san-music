import { ArrowDropDown } from "@mui/icons-material";
import { Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useCreation, useMemoizedFn, useSetState } from "ahooks";
import { TypeEnum } from "../../types/utils";

interface ITypeSelectProps {
  value?: number;
  onSelect?: (v: number) => void;
}

const TypeSelect = ({ value = 0, onSelect }: ITypeSelectProps) => {
  const [state, setState] = useSetState({
    anchorEl: null as HTMLElement | null,
  });

  const types = useCreation(() => {
    const arrayObjects = [];
    for (const [propertyKey, propertyValue] of Object.entries(TypeEnum)) {
      if (!Number.isNaN(Number(propertyKey))) {
        continue;
      }
      arrayObjects.push({ id: propertyValue, name: propertyKey });
    }
    return arrayObjects;
  }, []);

  const open = Boolean(state.anchorEl);

  const handleSetAnchorEl = useMemoizedFn(
    (event: React.MouseEvent<HTMLElement>) => {
      setState({
        anchorEl: event.currentTarget,
      });
    }
  );

  const handleClose = useMemoizedFn(() => {
    setState({
      anchorEl: null,
    });
  });

  const handleSelectItem = useMemoizedFn((selectId: string | TypeEnum) => {
    onSelect?.(Number(selectId));
    handleClose();
  });

  return (
    <div>
      <Stack
        direction={"row"}
        alignItems="center"
        spacing={1}
        onClick={handleSetAnchorEl}
        sx={{
          // border: 1,
          // borderColor: (theme) => alpha(theme.palette.primary.main, 0.25),
          borderRadius: 1,
          py: 0.5,
          px: 1.5,
        }}
      >
        <Typography
          component={"nav"}
          variant="body2"
        >{`${TypeEnum[value]}`}</Typography>
        <ArrowDropDown />
      </Stack>

      <Menu anchorEl={state.anchorEl} open={open} onClose={handleClose}>
        {types.map((typeItem) => (
          <MenuItem
            key={typeItem.name}
            selected={typeItem.id === value}
            onClick={() => handleSelectItem(typeItem.id)}
          >
            {typeItem.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default TypeSelect;
