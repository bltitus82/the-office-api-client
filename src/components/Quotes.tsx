import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import APIURL from '../helpers/environment';

type Quote = {
    quoteBody: string,
    id: number,
    charId: number,
    charName: string,
    charImg: string,
    liked: boolean,
    likeCount: number,
    newLikeCount: number 
}

type QProps = {
    token: string | null
    admin: string | null
    apiErr: string,
    userID: string | null
}

type QState = {
    quote: Quote[],
    id: number,
    liked: boolean,
    charId: number,
    charName: string,
    charImg: string,
    likeCount: number,
    newLikeCount: number
}

export default class Quotes extends React.Component<QProps, QState> {
    constructor(props: QProps){
        super(props)
        this.state = {
            quote: [],
            id: 0,
            liked: false,
            charId: 0,
            charName: '',
            charImg: '',
            likeCount: 0,
            newLikeCount: 0,
        }
    }

    getQuote = async () => {
        const qErr = "The operation was unsuccessful. Please try again. ";
        const apiURL = `${APIURL}/quotes/`;
        try {
            const res = await fetch (apiURL, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            })
            const json = await res.json();
            console.log(json)
            this.setState({quote: json.quote})
            this.setState({id: json.id})
            this.setState({likeCount: json.likes})
            this.setState({charId: json.characterId})
            console.log(this.state.charId)
            this.getChar();
        } catch (err) {
            alert(`${qErr}${this.props.apiErr}`)
            console.log(err)
        }
    }

    getChar = async () => {
        const cErr = "The operation was unsuccessful. Please try again. "
        const apiURL = `${APIURL}/characters/${this.state.charId}`
        try {
            const res = await fetch (apiURL, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            })
            const json = await res.json();
            this.setState({charName: json.charName})
            this.setState({charImg: json.picture})
        } catch (err) {
            alert(`${cErr}${this.props.apiErr}`)
            console.log(err)
        }
    }

    componentDidMount() {
        this.getQuote()
    }

    likeQuote = async () => {
        const lErr = "The operation was unsuccessful. Please try again. "
        const apiURL = `${APIURL}/likes/user/${this.props.userID}/quote/${this.state.id}`
        try {
            const res = await fetch (apiURL, {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.props.token}`
                })
            })
            const json = await res.json();
            console.log(json)
            this.setState({newLikeCount: this.state.likeCount + 1})
            console.log(this.state.newLikeCount)
            this.setState({liked: true})
            // this.updateLikes()
        } catch (err) {
            alert(`${lErr}${this.props.apiErr}`)
            console.log(err)
        }
    }

    unLikeQuote = async () => {
        const ulErr = "The operation was unsuccessful. Please try again. "
        const apiURL = `${APIURL}/likes/user/${this.props.userID}/quote/${this.state.id}`
        
        try{
            const res = await fetch (apiURL, {
                method: 'DELETE',
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.props.token}`
                })
            })
            const json = await res.json();
            console.log(json)
            this.setState({newLikeCount: this.state.likeCount - 1})
            console.log(this.state.newLikeCount)
            this.setState({liked: false})
            // this.updateLikes()
        } catch (err) {
            alert(`${ulErr}${this.props.apiErr}`)
            console.log(err)
        }
    }

    // updateLikes = async () => {
    //     const uErr = 'The operation was unsuccessful. Please try again. '
    //     const apiURL = `http://localhost:3000/quotes/${this.state.id}`
    //     const quoteBody = {
    //         quotes: {
    //             likes: this.state.newLikeCount
    //         }
    //     }
    //     console.log(this.state.id)

    //     try {
    //         const res = await fetch(apiURL, {
    //             method: 'PUT',
    //             body: JSON.stringify(quoteBody),
    //             headers: new Headers({
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${this.props.token}`
    //             })
    //         })

    //         const json = await res.json();
    //         this.setState({ likeCount: json.likes })
    //         console.log(this.state.likeCount)
    //     } catch (err) {
    //         alert(`${uErr}${this.props.apiErr}`)
    //         console.log(err)
    //     }
    // } 


    render() {
        return(
            <div>
                {this.props.token ? 
                    <Card sx={{ maxWidth: 345 }} style={{ margin: 'auto' }}>
                        <CardMedia
                            component="img"
                            height="500"
                            image={this.state.charImg}
                            alt={this.state.charName}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            {this.state.quote}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {this.state.charName}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            {this.state.liked ? 
                                <button name='unlike' onClick={this.unLikeQuote}> <FavoriteBorderIcon onClick={() => this.unLikeQuote} /> </button>                          
                            : 
                                <button name='like' onClick={this.likeQuote}> <FavoriteIcon onClick={() => this.likeQuote} /> </button>
                            }
                            {/* {this.state.likeCount} Update this functionality later */}
                        </CardActions> 
                        <Button variant="outlined" onClick={this.getQuote}>Next Quote</Button>
                    </Card>
                    :
                    <Card sx={{ maxWidth: 345 }} style={{ margin: 'auto' }}>
                        <CardMedia
                            component="img"
                            height="500"
                            image={this.state.charImg}
                            alt={this.state.charName}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            {this.state.quote}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {this.state.charName}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            To like or submit a quote, please log in.
                        </CardActions>
                        <Button variant="outlined" onClick={this.getQuote}>Next Quote</Button>
                        </Card>
                    }                    
            </div>
        )
    }
}