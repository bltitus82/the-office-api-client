import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

type Props = {
    token: string | null
    admin: string | null
    apiErr: string,
    userID: string | null
}

type State = {
    likedQuotes: Array<likes>
    newQuote: string
    quoteChar: string
    liked: boolean
}

type likes = {
    userId: number,
    quoteId: number
}
export default class Likes extends React.Component<Props, State> {
    constructor(props: Props){
        super(props)
        this.state = {
            likedQuotes: [],
            newQuote: '',
            quoteChar: '',
            liked: true
        };
    }

    getLikes = async () => {
        const Err = 'The operation was unsuccessful. Please try again. ';
        const apiURL = `http://localhost:3000/likes/user/${this.props.userID}`;
        try {
            const res = await fetch (apiURL, {
                method: 'GET',
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.props.token}`
                })
            })
            const json = await res.json()
            this.setState({likedQuotes: json})
            console.log(this.state.likedQuotes)
        } catch (err) {
            alert(Err)
            console.log(Err)
        }
    }

    getQuote = async (quoteId: number) => {
        const Err = 'The operation was unsuccessful. Please try again. ';
        const apiURL = `http://localhost:3000/quotes/${quoteId}`
        try {
            const res = await fetch (apiURL, {
                method: 'GET',
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            })
            const json = await res.json()
            this.setState({ newQuote: json.quote })
            this.setState({ quoteChar: json.charName })
            console.log( this.state.newQuote, this.state.quoteChar)
        } catch (err) {
            alert(Err)
            console.log(Err)
        }
    }

    componentDidMount() {
        this.getLikes()
    }

    unLikeQuote = async (quoteId: number) => {
        const ulErr = "The operation was unsuccessful. Please try again. "
        const apiURL = `http://localhost:3000/likes/user/${this.props.userID}/quote/${quoteId}`
        
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
            this.setState({liked: false})
            this.componentDidMount()
        } catch (err) {
            alert(`${ulErr}${this.props.apiErr}`)
            console.log(err)
        }
    }

    displayLikes = (): JSX.Element[] => {
        return this.state.likedQuotes.map((quotes) => {
            return(
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Quote</TableCell>
                            <TableCell align="right">Character</TableCell>
                            <TableCell align="right">&nbsp; </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.likedQuotes.map((quotes) =>(
                            <TableRow
                                key={quotes.quoteId}
                            >
                                {this.getQuote(quotes.quoteId)}
                                <TableCell component='th' scope='row'>
                                    {this.state.newQuote}
                                </TableCell>
                                <TableCell align="right">{this.state.quoteChar}</TableCell>
                                <TableCell align="right"><button> <FavoriteBorderIcon onClick={() => this.unLikeQuote(quotes.quoteId)} /> </button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            )
        })
    }
    render() {
        return(
            <div>
                <h1>Liked Quotes</h1>
                <div>
                {this.displayLikes()}
                </div>
            </div>
        )
    }
}