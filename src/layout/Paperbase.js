import * as React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Navigator from './Navigator';
import Content from './Content';
import ManagedQuestionContent from '../managedQuestion/ManagedQuestionContent';
import ExamHistory from '../examhistory/ExamHistory';
import Header from './Header';
import InterviewHeader from '../Interview/InterviewHeader';
import InterContent from '../Interview/InterContent';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

let theme = createMuiTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#18202c',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        label: {
          textTransform: 'none',
        },
        contained: {
          boxShadow: 'none',
          '&:active': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginLeft: theme.spacing(1),
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: theme.palette.common.white,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          margin: '0 16px',
          minWidth: 0,
          padding: 0,
          [theme.breakpoints.up('md')]: {
            padding: 0,
            minWidth: 0,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: '#404854',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
          marginRight: 0,
          '& svg': {
            fontSize: 20,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
  },
};

const drawerWidth = 256;

const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    background: '#eaeff1',
  },
  footer: {
    padding: theme.spacing(2),
    background: '#eaeff1',
  },
};

function Paperbase(props) {
  const { classes } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [headerPopulated, setHeaderPopulated] = React.useState(false);
  const [selectedClass,setSelectedClass] = React.useState("");
  const [selectedLeftNavigation,setSelectedLeftNavigation] = React.useState("WBBSE");
  const [selectedLeftNavigationDescription,setSelectedLeftNavigationDescription] = React.useState("West Bengal Board of Secondary Education");
  const [selectHeaderName, setSelectHeaderName] = React.useState('');
  const [selectedTab, setSelectedTab] = React.useState("knowledgeTest");
  const [tabShow , setTabShow] = React.useState(true);



  const setNavigation = (navigation,headerName,navigationDescription) => {
      setSelectedLeftNavigation(navigation);
      console.log(navigation);
      setSelectHeaderName(headerName);
      console.log(headerName);
      setSelectedLeftNavigationDescription(navigationDescription);
      console.log(navigationDescription);
      setMobileOpen(false);
    }

  const setTab = (tab) => {
    setSelectedTab(tab);
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  if(selectedLeftNavigation === "Technical Interview Questions"){
    return (
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <nav className={classes.drawer}>
            <Hidden smUp implementation="js">
              <Navigator
                PaperProps={{ style: { width: drawerWidth } }}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                setNavigation = {setNavigation}
              />
            </Hidden>
            <Hidden smDown implementation="css">
              <Navigator PaperProps={{ style: { width: drawerWidth } }} setNavigation = {setNavigation}/>
            </Hidden>
          </nav>
          <div className={classes.app}>
            <InterviewHeader onDrawerToggle={handleDrawerToggle} selectedLeftNavigation = {selectedLeftNavigationDescription} loggedInUser = {props.loggedInUser} setTab = {setTab}/>
            <main className={classes.main}>
              <InterContent boardHeaderName={selectHeaderName} headerPopulated = {headerPopulated} selectedBoard = {selectedLeftNavigation}  selectedClass = {selectedClass} loggedInUser = {props.loggedInUser}/>
            </main>
            <footer className={classes.footer}>
              <Copyright />
            </footer>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedTab === "knowledgeTest"){
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <Hidden smUp implementation="js">
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              setNavigation = {setNavigation}
            />
          </Hidden>
          <Hidden smDown implementation="css">
            <Navigator PaperProps={{ style: { width: drawerWidth } }} setNavigation = {setNavigation}/>
          </Hidden>
        </nav>
        <div className={classes.app}>
          <Header onDrawerToggle={handleDrawerToggle} selectedLeftNavigation = {selectedLeftNavigationDescription} loggedInUser = {props.loggedInUser} setTab = {setTab}/>
          <main className={classes.main}>
            <Content boardHeaderName={selectHeaderName} headerPopulated = {headerPopulated} selectedBoard = {selectedLeftNavigation}  selectedClass = {selectedClass} loggedInUser = {props.loggedInUser}/>
          </main>
          <footer className={classes.footer}>
            <Copyright />
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}
if (selectedTab === "manageQuestion"){
     return (
       <ThemeProvider theme={theme}>
         <div className={classes.root}>
           <CssBaseline />
           <nav className={classes.drawer}>
             <Hidden smUp implementation="js">
               <Navigator
                 PaperProps={{ style: { width: drawerWidth } }}
                 variant="temporary"
                 open={mobileOpen}
                 onClose={handleDrawerToggle}
                 setNavigation = {setNavigation}
               />
             </Hidden>
             <Hidden smDown implementation="css">
               <Navigator PaperProps={{ style: { width: drawerWidth } }} setNavigation = {setNavigation}/>
             </Hidden>
           </nav>
           <div className={classes.app}>
             <Header onDrawerToggle={handleDrawerToggle} selectedLeftNavigation = {selectedLeftNavigationDescription} loggedInUser = {props.loggedInUser} setTab = {setTab}/>
             <main className={classes.main}>
             <ManagedQuestionContent boardHeaderName={selectHeaderName} headerPopulated = {headerPopulated} selectedBoard = {selectedLeftNavigation}  selectedClass = {selectedClass} loggedInUser = {props.loggedInUser}/>
             </main>
             <footer className={classes.footer}>
               <Copyright />
             </footer>
           </div>
         </div>
       </ThemeProvider>
     );
}
if (selectedTab === "resultHistory"){
     return (
       <ThemeProvider theme={theme}>
         <div className={classes.root}>
           <CssBaseline />
           <nav className={classes.drawer}>
             <Hidden smUp implementation="js">
               <Navigator
                 PaperProps={{ style: { width: drawerWidth } }}
                 variant="temporary"
                 open={mobileOpen}
                 onClose={handleDrawerToggle}
                 setNavigation = {setNavigation}
               />
             </Hidden>
             <Hidden smDown implementation="css">
               <Navigator PaperProps={{ style: { width: drawerWidth } }} setNavigation = {setNavigation}/>
             </Hidden>
           </nav>
           <div className={classes.app}>
             <Header onDrawerToggle={handleDrawerToggle} selectedLeftNavigation = {selectedLeftNavigationDescription} loggedInUser = {props.loggedInUser} setTab = {setTab}/>
             <main className={classes.main}>
             <ExamHistory loggedInUser = {props.loggedInUser}/>
             </main>
             <footer className={classes.footer}>

             </footer>
           </div>
         </div>
       </ThemeProvider>
     );
}

  }

Paperbase.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Paperbase);
