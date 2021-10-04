import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

type Character = {
    charName: string,
    id: number,
    job: string,
    actorName: string,
    picture: string,
    charList: []
}

type CProps = {
    userToken: string,
    admin: string,
    apiErr: string,
    profileID: string | number
}

type CState = {
    charName: string,
    id: number,
    job: string,
    actorName: string,
    picture: string,
    charList: []
}

type allChars = {
    id: number,
    charName: string,
    job: string,
    actorName: string,
    picture: string
}

export default class Characters extends React.Component<CProps, CState> {
    constructor(props: CProps){
        super(props)
        this.state = {
            charName: '',
            id: 0,
            job: '',
            actorName: '',
            picture: '',
            charList: [],
        }
    }

    getAllChar = async () => {
        const cErr = 'The operation was unsuccessful. Please try again. ';
        const apiURL = `https://localhost:3000/characters/all`;
        try {
            const res = await fetch (apiURL, {
                method: 'GET',
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            })
            const json = await res.json();
            this.setState({charList: json})
        } catch (err) {
            alert(`${cErr}${this.props.apiErr}`)
            console.log(err)
        }
    }

    render() {
        return(
            <div>
                <ImageList sx={{ width: 500, height: 450 }}>
                    {this.state.charList.map((char: allChars) => (
                        <ImageListItem key={char.picture}>
                            <img
                                src={`${char.picture}?w=248&fit=crop&auto=format`}
                                srcSet={`${char.picture}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={char.charName}
                                loading="lazy"
                            />
                        <ImageListItemBar
                            title={char.charName}
                            subtitle={<span>Role: {char.job}</span>}
                            position="below"
                        />
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>
        )
    }
}