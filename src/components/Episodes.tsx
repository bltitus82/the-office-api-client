import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type eProps = {
    token: string | null
    admin: string | null
    apiErr: string
    userID: string | null
}

type State = {
    season: number,
    id: number,
    title: string,
    airDate: Date | null,
    epNumber: number,
    synopsis: string,
    episodeData: Array<episodeList>,
}

type episodeList = {
    id: number,
    title: string,
    airDate: Date,
    season: number,
    epNumber: number,
    synopsis: string
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
    }));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default class Episodes extends React.Component<eProps, State> {
    constructor(props: eProps){
        super(props)
        this.state = {
            season: 0,
            id: 0,
            title: '',
            epNumber: 0,
            synopsis: '',
            airDate: null,
            episodeData: []
        };
    }

    getEpisodes = async () => {
        console.log('start')
        const Err = 'Operation unsuccessful.';
        const apiURL = `http://localhost:3000/episodes/`
        try {
            const res = await fetch(apiURL, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            })
            const json = await res.json();
            this.setState({ episodeData: json })
            console.log(json)
            console.log(this.state.episodeData)
        } catch (err) {
            alert(`${Err}`)
            console.log(Err)
        }
    }

    componentDidMount() {
        this.getEpisodes()
    }

    seasonMapper = (): JSX.Element[] => {
        return this.itemData.map((item) => {
            return(
                <div>
                    <Accordion> 
                        <AccordionSummary 
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            key={item.season}
                        >
                            <Typography>{item.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>                        
                            <Typography>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Title</StyledTableCell>
                                            <StyledTableCell align="right">Air Date</StyledTableCell>
                                            <StyledTableCell align="right">Season</StyledTableCell>
                                            <StyledTableCell align="right">Episode</StyledTableCell>
                                            <StyledTableCell align="right">Synopsis</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {this.state.episodeData.filter(episode => episode.season === item.season ).map((eps) => (
                                            <StyledTableRow key={eps.id}>
                                                <StyledTableCell component="th" scope="row">
                                                    {eps.title}
                                                </StyledTableCell>
                                                <StyledTableCell align="right">{eps.airDate}</StyledTableCell>
                                                <StyledTableCell align="right">{eps.season}</StyledTableCell>
                                            <StyledTableCell align="right">{eps.epNumber}</StyledTableCell>
                                            <StyledTableCell align="right">{eps.synopsis}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
            )
        })
    }

    render() {
        return(
            <div>
            <h1>The Office Seasons</h1>
            <div>
                {this.seasonMapper()}
            </div>
            </div> 
        );
    }

    itemData = [
        {
            img: 'http://localhost:3001/assets/seasonImages/S1.jpeg',
            title: 'Season 1',
            season: 1,
        },
        {
            img: 'http://localhost:3001/assets/seasonImages/S2.jpeg',
            title: 'Season 2',
            season: 2,
        },
        {
            img: 'http://localhost:3001/assets/seasonImages/S3.jpeg',
            title: 'Season 3',
            season: 3,
        },
        {
            img: 'http://localhost:3001/assets/seasonImages/S4.jpeg',
            title: 'Season 4',
            season: 4,
        },
        {
            img: 'http://localhost:3001/assets/seasonImages/S5.jpeg',
            title: 'Season 5',
            season: 5,
        },
        {
            img: 'http://localhost:3001/assets/seasonImages/S6.jpeg',
            title: 'Season 6',
            season: 6,
        },
        {
            img: 'http://localhost:3001/assets/seasonImages/S7.jpeg',
            title: 'Season 7',
            season: 7,
        },
        {
            img: 'http://localhost:3001/assets/seasonImages/S8.jpeg',
            title: 'Season 8',
            season: 8,
        },
        {
            img: 'http://localhost:3001/assets/seasonImages/S9.jpeg',
            title: 'Season 9',
            season: 9,
        },
    ];
}