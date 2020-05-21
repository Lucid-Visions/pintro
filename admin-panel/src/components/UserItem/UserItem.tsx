import React, { useState } from 'react';
import User from '../../models/User';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// Customise the divier.
const useStyles = makeStyles((theme: Theme) => createStyles({
    divider: {
        backgroundColor: 'white'
    },
    inputs: {
        '& > *': {
            margin: theme.spacing(1),

        },
        display: 'flex',
        flexDirection: 'column',
    }
}));

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * Make a request to change a user's password.
 * @param uid the user id.
 * @param newPassword the new password.
 */
async function resetPassword(uid: string, newPassword: string) {
    await fetch(`http://localhost:3000/api/v1/panel/reset/${uid}`,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify({ password: newPassword })
        });
}

/**
 * Set the user status to either banned or active.
 * @param uid the id of the user to update.
 * @param satus the new status.
 */
async function resetUserStatus(uid: string, status: string) {
    await fetch(`http://localhost:3000/api/v1/panel/status/${uid}/${status}`,
        {
            method: 'PUT',
        });
}

/**
 * Render users' basic info as a list item.
 * @param users the users to be rendered.
 */
function Users(users: User[]) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    // Store the id of the user currently being manipulated
    const [current_uid, setCurrentUid] = useState("");

    const classes = useStyles();

    // Manage the state of the dialog.
    const handleOpenDialog = (uid: string) => {
        setCurrentUid(uid);
        setDialogOpen(true);
    }

    /**
     * Perform the action of resetting the password and close the modal.
     */
    const handleClose = () => {
        // Reset the password.
        resetPassword(current_uid, password);
        // Used to notifiy the main screen that the snack bar should open.
        localStorage.setItem("snackBar", "dummy");
        setDialogOpen(false);
    }

    // Store the passwords.
    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };
    const handleRepeatPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRepeatPassword(event.target.value);
    };

    /**
     * Change the account status of an user.
     * @param user the user to update.
     */
    const updateStatus = (user: User) => {
        let updatedUser: User = user.accountStatus === 'active'
            ? { ...user, accountStatus: 'banned' }
            : { ...user, accountStatus: 'active' };
        resetUserStatus((updatedUser._id as string), (updatedUser.accountStatus as string));
        // api call goes here.
        localStorage.setItem("userBanned", "dummy");
    }

    /**
     * Check wheter the passwords input are equal.
     * @return true if they don't match (for convenience purposes).
     */
    const passwordsMatch = () => {
        return password !== repeatPassword;
    }

    // Return their own 
    return users.map(user => (
        <div>
            <ListItem>
                <ListItemText>
                    {user.name}
                </ListItemText>
                <Button onClick={() => updateStatus(user)} color="primary">{user.accountStatus === 'active' ? "Ban" : "Re-activate account"}</Button>
                <Button onClick={() => handleOpenDialog(user._id as string)} color="primary">Reset Password</Button>
                <Dialog
                    open={dialogOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    fullWidth={true}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">Reset Password</DialogTitle>
                    <DialogContent className={classes.inputs}>
                        <TextField type="password" onChange={handlePassword} id="standard-basic" label="New password" />
                        <TextField type="password" onChange={handleRepeatPassword} id="standard-basic" label="Repeat password" error={passwordsMatch()} />
                    </DialogContent>
                    <DialogActions>
                        <Button disabled={password === "" ? true : passwordsMatch()} onClick={handleClose} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </ListItem>
            <Divider className={classes.divider} />
        </div>
    ));
}

export default Users;