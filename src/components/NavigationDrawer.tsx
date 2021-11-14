import {
  Drawer,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  colors,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { Store, ShoppingBasket } from "@material-ui/icons";
import { useEffect, useState } from "react";

type NavigationItem = {
  text: string;
  route: string;
  icon: any;
};

const navigationItems: NavigationItem[] = [
  {
    text: "Products",
    route: "/",
    icon: <Store />,
  },
  {
    text: "Basket",
    route: "/basket",
    icon: <ShoppingBasket />,
  },
];

const NavigationDrawer = ({ drawerWidth }: { drawerWidth: number }) => {
  const { pathname } = useLocation();
  const [activeItem, setActiveItem] = useState<NavigationItem>();

  useEffect(() => {
    const item = navigationItems.find((item) => item.route === pathname);

    setActiveItem(item);
  }, [pathname]);

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List>
        {navigationItems.map((item, index) => (
          <ListItem component={Link} to={item.route} key={index}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              sx={{ color: activeItem === item ? colors.blue[700] : "#000000" }}
              primary={item.text}
            ></ListItemText>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default NavigationDrawer;
