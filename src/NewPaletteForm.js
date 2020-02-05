import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { ChromePicker } from "react-color";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import SavePaletteDialogue from "./SavePalette";
import DragColorList from "./DragColorList";
import arrayMove from "array-move";
import randomHex from "random-hex-color";
const drawerWidth = 400;

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
  },
  colorBox: {
    display: "grid",
    gridTemplateColumns: "min-content",
    gridTemplateRows: "min-content"
  },
  colorPickerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  btmBtn: {
    display: "flex",
    width: "100%",
    height: "100%",
    margin: "20px 0",
    justifyContent: "space-evenly"
  },
  ColorPicker: {
    display: "flex",
    width: "100%",
    height: "100%",
    margin: "20px 20px",
    justifyContent: "center",
    alignItems: "center"
  },
  upperTop: {
    display: "flex",
    flexDirection: "column"
  },
  upperbtn:{
    display: "flex",
    justifyContent:"space-evenly"
  }
}));

export default function NewPaletteForm({ palette, savePalette, history }) {
  console.log(palette);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [currentColor, setCurrentColor] = React.useState("#000");
  const [colors, setColors] = React.useState([...palette.colors]);
  const [newColorName, setName] = React.useState("");
  const [newPaletteName, setPaletteName] = React.useState("");
  const [newPaletteEmoji, setPaletteEmoji] = React.useState("");

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors([...arrayMove(colors, oldIndex, newIndex)]);
  };
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
  
  const addColor = color => {
    const newColor = { color, name: newColorName };
    setColors([...colors, newColor]);
    setName("");
  };
  const clearPalette = () => {
    setColors([]);
  };
  const handleSave = () => {
    console.log(newPaletteEmoji);
    const paletteName = newPaletteName;
    const newPalette = {
      paletteName: paletteName,
      id: paletteName.toLowerCase().replace(/ /g, "-"),
      colors: colors,
      emoji: newPaletteEmoji.native
    };
    
    savePalette(newPalette);
    history.push("/");
  };
  const handleDelete = val => {
    setColors([...colors.filter(color => color.color !== val)]);
  };
  const addRandomColor = () => {
    const name = `rand-col-${Math.round(Math.random() * 183)}`;
    const color = randomHex();
    const newColor = { name, color };
    setColors([...colors, newColor]);
  };
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
            setPaletteName={setPaletteName}
            setPaletteEmoji={setPaletteEmoji}
            paletteName={newPaletteName}
            paletteEmoji={newPaletteEmoji}
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
        {colors.length < 1 && (
          <Typography>
            Select Color from the right drawer and Click ADD COLOR Button
          </Typography>
        )}
        <DragColorList
          axis="xy"
          colors={colors}
          handleDelete={handleDelete}
          onSortEnd={onSortEnd}
          distance={3}
        />
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
        <Divider />

        <div>
          <div className={classes.colorPickerContainer}>
            <div className={classes.upperTop}>
              <Typography variant="h4">Build Your Own Palette</Typography>
              <div className={classes.upperbtn}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={clearPalette}
                >
                  Clear Palette
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={addRandomColor}
                  disabled={colors.length > 25 && true}
                >
                  {colors.length > 25 ? "Palette Full" : "Random Color"}
                </Button>
              </div>
            </div>

            <div className={classes.ColorPicker}>
              <ChromePicker
                color={currentColor}
                onChange={newColor => handleColorChange(newColor)}
              />
            </div>
            <div className={classes.btmBtn}>
              <ValidatorForm onSubmit={() => addColor(currentColor)}>
                <TextValidator
                  label="Color Name"
                  value={newColorName}
                  onChange={handleNameChange}
                  validators={["required"]}
                  errorMessages={["name is required"]}
                />
              </ValidatorForm>
              <Button
                disabled={colors.length > 25 && true}
                variant="contained"
                color="primary"
                type="submit"
                style={{
                  backgroundColor: colors.length > 25 ? "grey" : currentColor
                }}
              >
                {colors.length > 25 ? "Palette Full" : "Add Color"}
              </Button>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
