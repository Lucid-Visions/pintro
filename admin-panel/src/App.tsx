import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import logo from './assets/Logo.png';
import SwipeableViews from 'react-swipeable-views';
import './App.css';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './components/TabPanel/TabPanel';
import UserList from './components/UserList/UserList';
import User from './models/User';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import { EventEmitter } from 'events';

/**
 * Add aria controls for accesibility.
 * @param index the index of the element.
 */
function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function App() {
  // The index of the tabs.
  const [tabValue, setTabValue] = React.useState(0);
  // All users retrieved from the database.
  let initialState: User[] = [];
  const [users, setUsers] = React.useState(initialState);
  const [bannedUsers, setBannedUsers] = React.useState(initialState);
  // Animation handler.
  const theme = useTheme();
  const [snackBarOpen, setSnackBar] = React.useState(false);
  const [refreshState, triggerRefresh] = React.useState(true);

  /**
   * Identify change of tabs.
   * @param event the act of changing tabs.
   * @param newValue the newly opened tab.
   */
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSnackClose = () => setSnackBar(false);

  /**
   * Identify change of tabs for the swipe animation.
   * @param index the index of the tab.
   */
  const handleChangeIndex = (index: number) => {
    setTabValue(index);
  };

  /**
   * Retrieve all users from the database.
   */
  const fetchUsers = async () => {
    try {
      let response: Response = await fetch(`http://localhost:3000/api/v1/panel/getAllUsers`);
      let users: User[] = await response.json();

      let activeUsers = users.filter(user => user.accountStatus === 'active');
      setUsers(activeUsers);

      let bannedUsers = users.filter(user => user.accountStatus === 'banned');
      setBannedUsers(bannedUsers);
    }
    catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    // Check whether the snack bar should be displayed.
    if (localStorage.getItem("snackBar")) setSnackBar(true);
    // Check whether an user has been banned.
    if (localStorage.getItem("userBanned")) { console.log(users); triggerRefresh(!refreshState); }
    localStorage.clear();
  })

  React.useEffect(() => {
    localStorage.clear();
    // Get all the users when the component is mounted or updated.
    fetchUsers();


  }, [refreshState, snackBarOpen])

  const mainTheme = createMuiTheme({
    palette: {
      primary: {
        main: '#ff9900'
      }
    }
  },
  );

  return (
    <MuiThemeProvider theme={mainTheme}>
      <div className="App">
        <main className="App-main">
          <img src={logo} className="logo"></img>
          <div className="tabs">
            <Tabs indicatorColor="primary" value={tabValue} onChange={handleChange} aria-label="simple tabs example" centered>
              <Tab label="Active Users" {...a11yProps(0)} />
              <Tab label="Banned Users" {...a11yProps(1)} />
            </Tabs>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={tabValue}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={tabValue} index={0}>
                {users.length > 0
                  ? <UserList users={users} />
                  : <span>No active users</span>
                }

              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                {bannedUsers.length > 0
                  ? <UserList users={bannedUsers} />
                  : <span>No banned users</span>
                }

              </TabPanel>
            </SwipeableViews>
          </div>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            open={snackBarOpen}
            onClose={handleSnackClose}
            autoHideDuration={2000}
            message="Password changed"
          />
        </main>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
