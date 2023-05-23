import { Box, Container, Stack } from "@mui/material";
import { useSize } from "ahooks";

interface IPageContainerProps {
  children?: React.ReactNode;
  autoHeight?: boolean;
}

const PageContainer = ({
  children,
  autoHeight = true,
}: IPageContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const size = useSize(containerRef);

  return (
    <Box
      component="main"
      ref={containerRef}
      sx={{ flex: 1, overflow: "auto", py: 2, width: "100%", height: "100%" }}
    >
      {size?.height ? (
        <Container>
          <Stack
            sx={{
              height: autoHeight ? "auto" : size?.height - 32,
              overflow: autoHeight ? "unset" : "auto",
            }}
          >
            {children}
          </Stack>
        </Container>
      ) : null}
    </Box>
  );
};

export default PageContainer;
