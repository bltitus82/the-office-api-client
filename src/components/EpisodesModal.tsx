import * as React from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
} from 'reactstrap';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

type epProps = {
    season: number
    modalOff: () => void
}

type epState = {
    id: number,
    title: string,
    airDate: Date | null,
    season: number,
    epNumber: number,
    synopsis: string,
    Episodes: Array<episodeList>,
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

export default class EpisodesModal extends React.Component<epProps, epState> {
    constructor(props: epProps){
        super(props)
        this.state = {
            id: 0,
            title: '',
            airDate: null,
            season: this.props.season,
            epNumber: 0,
            synopsis: '',
            Episodes: [],
        };
    }

    componentDidMount() {
        this.getSeason()
    }

    getSeason = async () => {
        console.log('start')
        const Err = 'Operation unsuccessful.';
        const apiURL = `http://localhost:3000/episodes/season/${this.state.season}`
        try {
            const res = await fetch(apiURL, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            })
            const json = await res.json();
            this.setState({ Episodes: json.json })
        } catch (err) {
            alert(`${Err}`)
            console.log(Err)
        }
    }

    render() {
        return(
            <Modal isOpen={true}>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                > <ModalHeader>
                    <Typography component="h1" variant="h5">
                        Episodes
                    </Typography>
                </ModalHeader>
                <ModalBody>
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
                        {this.state.Episodes.map((eps) => (
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
            </ModalBody>
            </Box>
            </Modal>
        )
    }
}