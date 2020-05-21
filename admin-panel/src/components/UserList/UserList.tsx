import React from 'react';
import List from '@material-ui/core/List';
import Users from '../UserItem/UserItem';
import User from '../../models/User';

interface UserListProps {
    users: User[];
}

/**
 * Render a list of all users passed in.
 * @param props the users to display.
 */
function UserList(props: UserListProps) {
    return (
        <div>
            <List>
                {Users(props.users)}
            </List>
        </div>
    )
}

export default UserList;