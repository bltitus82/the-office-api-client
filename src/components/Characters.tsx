import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

type CProps = {
    token: string | null
    admin: string | null
    apiErr: string,
    userID: string | null
}

type CState = {
    charName: string,
    id: number,
    job: string,
    actorName: string,
    picture: string,
    charList: [],
    Character: []
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
            Character: [],
        };
    }

    getAllChar = async () => {
        const cErr = 'The operation was unsuccessful. Please try again. ';
        const apiURL = `http://localhost:3000/characters/all`;
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

    componentDidMount() {
        this.getAllChar()
    }

    characterCard = async () => {
        console.log('start')
        const cErr = 'The operation was unsuccessful. Please try again. ';
        const apiURL = `http://localhost:3000/characters/${this.state.id}`
        try {
            const res = await fetch (apiURL, {
                method: 'GET',
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            })
            const json = await res.json();
            this.setState({Character: json})

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
                        <ImageListItem key={char.picture} >
                            <img 
                                src={`${char.picture}?w=248&fit=crop&auto=format`}
                                srcSet={`${char.picture}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={char.charName}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                title={char.charName}
                                subtitle={<span>{char.job}</span>}
                                position="below"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>
        )
    }
}

