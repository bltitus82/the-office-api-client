import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import APIURL from '../helpers/environment';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

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

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

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
        const apiURL = `${APIURL}/characters/all`;
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
        const apiURL = `${APIURL}/characters/${this.state.id}`
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

    characterMapper = (): JSX.Element[] => {
        return this.state.charList.map((char: allChars) => {
            return(
                <Grid item xs={4} sm={4} md={4} key={char.picture} style={{ margin: 'auto' }}>
                    <Item>
                        <Card sx={{ maxWidth: 345 }} style={{ margin: 'auto' }}> 
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                width="550"
                                image={char.picture}
                                alt={char.charName}
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {char.charName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {char.job} <br />
                                    Played by {char.actorName}
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                            </Card>
                    </Item>
                </Grid>
            )
        })
    }

    render() {
        return(    
            <Box>
                <Grid container spacing={{ xs: 1 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{ padding: 10 }} >
                    {this.characterMapper()}
                </Grid>
            </Box>
        )
    }
}

