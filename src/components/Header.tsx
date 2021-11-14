import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = ({ drawerWidth }: { drawerWidth: number }) => {
  return (
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Policy Expert Supermarket
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
