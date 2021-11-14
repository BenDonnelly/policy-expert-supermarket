import { Toolbar, Box, CssBaseline } from "@mui/material";
import { ReactNode } from "react";
import Header from "./Header";
import NavigationDrawer from "./NavigationDrawer";

const drawerWidth = 240;

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header drawerWidth={drawerWidth} />
      <NavigationDrawer drawerWidth={drawerWidth} />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Container;
