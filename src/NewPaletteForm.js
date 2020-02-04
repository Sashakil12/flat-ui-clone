import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { ChromePicker } from "react-color";
import Button from "@material-ui/core/Button";
import DragColorBox from "./DrgColorBox";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import SavePaletteDialogue from "./SavePalette";
const drawerWidth = 500;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: drawerWidth
  },
  title: {
    flexGrow: 1
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-start"
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginRight: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: 0
  }
}));

export default function NewPaletteForm({ savePalette, history }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [currentColor, setCurrentColor] = React.useState("#000");
  const [colors, setColors] = React.useState([]);
  const [newColorName, setName] = React.useState("");
  const [newPaletteName, setPaletteName] = React.useState("");
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleNameChange = e => {
    setName(e.target.value);
    console.log(newColorName);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleColorChange = color => {
    setCurrentColor(color.hex);
  };
  const handlePaletteNameInput = value => {
    setPaletteName(value);
  };
  const addColor = color => {
    const newColor = { color, name: newColorName };
    setColors([...colors, newColor]);
    setName("");
  };
  const handleSave = () => {
    const paletteName = newPaletteName;
    const newPalette = {
      paletteName: paletteName,
      id: paletteName.toLowerCase().replace(/ /g, "-"),
      colors: colors
    };
    savePalette(newPalette);
    history.push("/");
  };
  const handleDelete = (val) => {
    setColors([...colors.filter(color=>color.color!==val)])
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        color="default"
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            Add new color
          </Typography>
          <SavePaletteDialogue
            handleSave={handleSave}
            paletteNameInput={handlePaletteNameInput}
            paletteName={newPaletteName}
          />
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />

        {colors.map(col => (
          <DragColorBox key={`${col}-${Math.random() * 5}`} {...col} handleDelete={handleDelete} />
        ))}
      </main>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <div>
          <Typography variant="h4">Build Your Own Palette</Typography>
          <Button variant="contained" color="secondary">
            Clear Palette
          </Button>
          <Button variant="contained" color="primary">
            Random Color
          </Button>
        </div>

        <ChromePicker
          color={currentColor}
          onChange={newColor => handleColorChange(newColor)}
        />
        <ValidatorForm onSubmit={() => addColor(currentColor)}>
          <TextValidator
            label="Color Name"
            value={newColorName}
            onChange={handleNameChange}
            validators={["required"]}
            errorMessages={["name is required"]}
          />
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            style={{ backgroundColor: currentColor }}
          >
            Add Color
          </Button>
        </ValidatorForm>

        <Divider />
      </Drawer>
    </div>
  );
}
