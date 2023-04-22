import { Box, Stack, Typography, TypographyProps } from "@mui/material";

interface ITitleProps extends Omit<TypographyProps, "children"> {
  label: string;
  showTab?: boolean;
}

const Title = ({ label, showTab, ...titleProps }: ITitleProps) => {
  return (
    <Stack
      spacing={1}
      direction="row"
      justifyContent={"flex-start"}
      alignItems={"center"}
    >
      {showTab && (
        <Box
          sx={{
            width: 4,
            height: 24,
            bgcolor: (theme) => theme.palette.primary.main,
            borderRadius: 1,
          }}
        />
      )}
      <Typography variant="h6" fontWeight={600} fontSize={22} {...titleProps}>
        {label}
      </Typography>
    </Stack>
  );
};

export default Title;
