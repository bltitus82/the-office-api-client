import * as React from 'react';
import { styled } from '@mui/material/styles';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

type eProps = {
    token: string | null
    admin: string | null
    apiErr: string
    userID: string | null
}

type State = {
    season: number,
    Episodes: Array<Object>
}

export default class Episodes extends React.Component<eProps, State> {
    constructor(props: eProps){
        super(props)
        this.state = {
            season: 0,
            Episodes: []
        };
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
            console.log(res)
            const json = await res.json();
            console.log(json)
            this.setState({Episodes: json.json})
            console.log(this.state.season)
            console.log(this.state.Episodes)
        } catch (err) {
            alert(`${Err}`)
            console.log(Err)
        }
    }

    render() {
        return(
            <div>
                <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={250} gap={10} >
                    {this.itemData.map((item) => (
                        <ImageListItem key={item.img}>
                        <img
                            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
                            onClick={() => {
                                this.setState({ season: item.season })
                                console.log(item.season)
                                }
                            }
                            loading="lazy"
                        />
                        </ImageListItem>
                    ))}
                </ImageList>
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