import React, { FC, createElement } from "react";
import {
  List,
  Divider,
  ListItem,
  ListItemButton,
  IconButton,
} from "@mui/material";
import "./AppDrawer.css";
import MuiDrawer from "@mui/material/Drawer";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export interface iDrawerNav {
  title: string;
  icon: any;
  onclick: () => void;
  iconColor: string;
}

interface iDrawerProps {
  navigationMap: iDrawerNav[];
}

const drawerWidth = 180;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(5)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

const AppDrawer: FC<iDrawerProps> = ({ navigationMap }) => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Drawer
      variant="permanent"
      open={open}
      className="mysmr-drawer"
      style={{ zIndex: 99 }}
    >
      <DrawerHeader>
        {open ? (
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        ) : (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: -1,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
        )}
      </DrawerHeader>
      <List>
        {navigationMap.map((x) => (
          <ListItem key={x.title} disablePadding>
            <ListItemButton
              sx={[
                {
                  display: "flex",
                  alignItems: "center",
                  height: "40px",
                  width: "40px",
                },
                {
                  minHeight: 48,
                  p: 0.7,
                },
              ]}
              onClick={x.onclick}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: "left",
                  },
                  open
                    ? {
                        mr: 1,
                        // ml: -1.9
                      }
                    : {
                        mr: "auto",
                      },
                ]}
              >
                {createElement(x.icon, {
                  sx: {
                    color: x.iconColor,
                    fontSize: "var(--icon-size)",
                    mb: 0,
                  },
                })}
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary={x.title}
                  primaryTypographyProps={{
                    fontSize: "12px",
                    color: "#747474",
                  }}
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default AppDrawer;
