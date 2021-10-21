import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import EpisodesModal from './EpisodesModal';
import {
    Modal,
    ModalHeader,
    ModalBody,
} from 'reactstrap';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

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
    modalWindow: boolean
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
            episodeData: [],
            modalWindow: false
        };
    }

    getEpisodes = async (season: number) => {
        console.log('start')
        const Err = 'Operation unsuccessful.';
        const apiURL = `http://localhost:3000/episodes/season/${season}`
        try {
            const res = await fetch(apiURL, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            })
            const json = await res.json();
            this.setState({ episodeData: json })
            console.log(this.state.episodeData)
        } catch (err) {
            alert(`${Err}`)
            console.log(Err)
        }
    }

    modalOn = (): void => {
        this.setState({ modalWindow: true })
    }

    modalOff = (): void => {
        this.setState({ modalWindow: false })
    }

    episodesMapper = () => {
        console.log("episodesMapper is called")
        return() => {
            return(
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
                            {this.state.episodeData.map((eps) => (
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
            )
        }
    }

    seasonMapper = (): JSX.Element[] => {
        return this.itemData.map((item) => {
            return(
                <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={250} gap={10} >
                    <ImageListItem key={item.img}>
                        <img
                            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
                            onClick={e => {
                                e.preventDefault()
                                this.setState({season: item.season})
                                this.getEpisodes(item.season)
                                this.modalOn()
                            }}
                            loading="lazy"
                        />
                        {console.log("Modal is called")}
                        <Modal 
                            open={this.state.modalWindow}
                            onClose={this.modalOff}
                        >
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            > 
                            <ModalHeader open={this.state.modalWindow}
                            onClose={this.modalOff}>
                                <Typography component="h1" variant="h5">
                                    Episodes
                                </Typography>
                            </ModalHeader>
                            <ModalBody>
                                {this.episodesMapper()}
                            </ModalBody>
                            </Box>
                            </Modal>
                    </ImageListItem>
                </ImageList>
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