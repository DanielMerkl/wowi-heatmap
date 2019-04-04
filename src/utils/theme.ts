import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#8e0038"
    }
  },
  typography: {
    useNextVariants: true
  }
});

export default theme;
