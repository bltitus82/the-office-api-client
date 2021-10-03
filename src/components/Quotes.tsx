import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

type Quote = {
    quoteBody: string,
    id: number,
    speakerId: number,
    speakerName: string,
    speakerImage: string
}

type QProps = {
    userToken: string,
    admin: string,
    apiErr: string,
    profileID: string | number
}

type QState = {
    quote: Quote[],
    id: 0
}

export default class Quotes extends React.Component<QProps, QState> {
    constructor(props: QProps){
        super(props)
        this.state = {
            quote: [],
            id: 0,
        }
    }

    getQuote = async () => {
        const qErr = "We couldn't get a quote right now. It's Toby's fault. ";
        const apiURL = 'http://localhost:3000/quotes/';
        try {
            const res = await fetch (apiURL, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            })
            const json = await res.json();
            this.setState({quote: json})
            this.setState({id: json.id})
        } catch (err) {
            alert(`${qErr}${this.props.apiErr}`)
            console.log(err)
        }
    }

    componentDidMount() {
        this.getQuote()
    }

    likeQuote = async () => {
        const lErr = "You're not able to like the quote because you don't know how because you don't have any skills."
        const apiURL = `http://localhost:3000/likes/profile/${this.props.profileID}/quote/${this.state.id}`
        try {
            const res = await fetch (apiURL, {
                method: "PUT",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.props.userToken}`
                })
            })
        } catch (err) {
            alert(`${lErr}${this.props.apiErr}`)
            console.log(err)
        }
    }
    render() {
        return(
            <div>

            </div>
        )
    }
}