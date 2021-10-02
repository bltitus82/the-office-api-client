import React from 'react';
import {
    TD,
    SmallReverseButton,
    MyH1
} from '../styling/styles';
import { Table } from 'reactstrap';

type UserAdminProps = {
    creatorToken: string,
    isAdmin: string,
    apiErr: string
}

type UserAdminState = {
    userList: User[]
}

type User = {
    id: number,
    userName: string,
    userBio: string,
    admin: boolean
}

export default class UserAdmin extends React.Component<UserAdminProps, UserAdminState> {
    constructor(props: UserAdminProps){
        super(props)
        this.state = {
            userList: []
        }
    }

    viewAllProfiles = async () => {
        const queryAllProfilesErr = 'The database cannot be queried at this time';
        const apiURL = 'http://localhost:3000/profile/all';
        try {
            const res = await fetch (apiURL, {
                method: 'GET',
                headers: new Headers ({
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.props.creatorToken}`
                })
            })
            const profileRes = await res.json();
            this.setState({userList: profileRes})
        } catch (err) {
            alert(`${queryAllProfilesErr}${this.props.apiErr}`)
            console.log(err)
        }
    }

    deleteProfile = async (profile: any) => {
        const confirm = prompt(`Are you sure you want to delete the user ${profile.userName}`, "Yes");
        if (confirm) {
            const deleteProfileErr = 'This user cannot be deleted at this time';
            const apiURL = `http://localhost:3000/profile/${profile.id}`;
            try {
                const res = await fetch (apiURL, {
                    method: 'DELETE',
                    headers: new Headers ({
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${this.props.creatorToken}`
                    })
                })
                const delRes = await res.json();
                alert('User has been deleted')
                this.viewAllProfiles()
            } catch (err) {
                alert(`${deleteProfileErr}${this.props.apiErr}`)
                console.log(err)
            }
        }
    }

    profileMap = (): JSX.Element[] => {
        return this.state.userList.map((profile: User) => {
            return(
                    <tbody>
                        <tr key={profile.id}>
                            <TD>{profile.userName}</TD>
                            <TD>{profile.userBio}</TD>
                            <TD>{profile.admin}</TD>
                            <TD><SmallReverseButton onClick={() => {this.deleteProfile(profile)}}>Delete</SmallReverseButton></TD>
                        </tr>
                    </tbody>
            )
        })
    }

    componentDidMount() {
        this.viewAllProfiles()
    }

    render() {
        return(
            <div>
                <div>
                    <MyH1>All Users</MyH1>
                    <Table>
                    {this.profileMap()}
                    </Table>
                </div>
            </div>
        )
    }
}