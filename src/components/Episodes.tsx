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
import APIURL from '../helpers/environment';

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
        const apiURL = `${APIURL}/episodes/`
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
                    <Accordion style={{ margin: 'auto', paddingLeft: 50, paddingRight: 50 }}> 
                        <AccordionSummary 
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            key={item.season}
                        >
                            <Typography style={{ fontFamily: 'monospace' }}>{item.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>                        
                            <Typography>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell style={{ fontFamily: 'monospace' }}>Title</StyledTableCell>
                                            <StyledTableCell style={{ fontFamily: 'monospace' }} align="center">Air Date</StyledTableCell>
                                            <StyledTableCell style={{ fontFamily: 'monospace' }} align="center">Season</StyledTableCell>
                                            <StyledTableCell style={{ fontFamily: 'monospace' }} align="center">Episode</StyledTableCell>
                                            <StyledTableCell style={{ fontFamily: 'monospace' }} align="center">Synopsis</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {this.state.episodeData.filter(episode => episode.season === item.season ).map((eps) => (
                                            <StyledTableRow key={eps.id}>
                                                <StyledTableCell style={{ fontFamily: 'monospace' }} component="th" scope="row">
                                                    {eps.title}
                                                </StyledTableCell>
                                                <StyledTableCell style={{ fontFamily: 'monospace' }} align="center">{eps.airDate}</StyledTableCell>
                                                <StyledTableCell style={{ fontFamily: 'monospace' }} align="center">{eps.season}</StyledTableCell>
                                            <StyledTableCell style={{ fontFamily: 'monospace' }} align="center">{eps.epNumber}</StyledTableCell>
                                            <StyledTableCell style={{ fontFamily: 'monospace' }} align="left">{eps.synopsis}</StyledTableCell>
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
            <div style={{ textAlign: 'center', fontFamily: 'monospace' }}>
            <h3>Seasons</h3>
            <div>
                {this.seasonMapper()}
            </div>
            </div> 
        );
    }

    itemData = [
        {
            title: 'Season 1',
            season: 1,
        },
        {
            title: 'Season 2',
            season: 2,
        },
        {
            title: 'Season 3',
            season: 3,
        },
        {
            title: 'Season 4',
            season: 4,
        },
        {
            title: 'Season 5',
            season: 5,
        },
        {
            title: 'Season 6',
            season: 6,
        },
        {
            title: 'Season 7',
            season: 7,
        },
        {
            title: 'Season 8',
            season: 8,
        },
        {
            title: 'Season 9',
            season: 9,
        },
    ];
}