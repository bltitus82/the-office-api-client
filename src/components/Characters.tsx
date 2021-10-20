import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
    Modal,
    ModalHeader,
    ModalBody,
} from 'reactstrap';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/ListItem';

type Character = {
    charName: string,
    id: number,
    job: string,
    actorName: string,
    picture: string,
    charList: []
}

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

    charModal() {
        console.log('working')
        // <Modal isOpen={true}>
        //     {this.characterCard}

        // </Modal>
    }

    render() {
        return(    
            <div>
                <ImageList sx={{ width: 500, height: 450 }} cols={4} rowHeight={164}>
                    {this.state.charList.map((char: allChars) => (
                        <ImageListItem key={char.picture} >
                            <img 
                                src={`${char.picture}?w=248&fit=crop&auto=format`}
                                srcSet={`${char.picture}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={char.charName}
                                loading="lazy"
                                onClick={e => {
                                    e.preventDefault()
                                    this.charModal()
                                }}
                            />
                        {/* <ImageListItemBar
                            onClick={this.charModal}
                            title={char.charName}
                            subtitle={<span>Role: {char.job}</span>}
                            position="below"
                        /> */}
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>
        )
    }
}

