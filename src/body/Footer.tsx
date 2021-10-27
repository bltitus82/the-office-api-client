import React from 'react';
import {
    FooterStyle,
    FooterContainer,
    Column,
    Row,
    FooterLink,
    Heading,
    FooterP
} from '../styling/styles';
import Link from '@mui/material/Link';
import { BrowserRouter as Router } from 'react-router-dom'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default class Footer extends React.Component {

    render() {
        return(
            <FooterStyle>
                <FooterContainer>
                    <Row>
                        <Router>
                        <Column style={{ padding: 10 }}>
                            <Heading>Designed by</Heading>
                            <FooterLink style={{ fontSize: 18, padding: 5 }} href="https://www.linkedin.com/in/bltitus" target="_blank"><LinkedInIcon /> Brad Titus </FooterLink>
                            <FooterLink style={{ fontSize: 18, padding: 5 }} href="https://www.github.com/bltitus82" target="_blank"><GitHubIcon /> bltitus82 </FooterLink>
                        </Column>
                        <Column style={{ padding: 10 }}>
                            <Heading>Disclaimer</Heading>
                            <FooterP>All quotes, likenesses, characters, and information included on this site are the intellectual property of NBC Universal and the creators of The Office. This is intended for entertainment purposes only.</FooterP>
                            <FooterLink style={{ fontSize: 12 }} href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" > Unless otherwise stated, the content of this page is licensed under Creative Commons Attribution-ShareAlike 3.0 License </FooterLink>
                        </Column>
                        <Column style={{ padding: 10, gridColumn: '3 / span 3' }}>
                            <Heading>Resources</Heading>
                            <FooterLink style={{ fontSize: 15, padding: 5 }} href="https://www.peacocktv.com/stream-tv/the-office" target="_blank"> Watch The Office on Peacock! </FooterLink>
                            <FooterLink style={{ fontSize: 15, padding: 5 }} href="https://www.officeladies.com" target="_blank"> The Office Ladies podcast on iHeart</FooterLink>
                            <FooterLink style={{ fontSize: 15, padding: 5 }} href="https://www.theincomparable.com/sim/" target="_blank"> Somehow I Manage podcast on The Incomparable </FooterLink>
                            <FooterLink style={{ fontSize: 15, padding: 5 }} href="https://www.iheart.com/podcast/1119-the-office-deep-dive-with-77030510/" target="_blank"> The Office Deep Dive with Brian Baumgartner on iHeart </FooterLink>
                        </Column>
                        </Router>
                    </Row>
                </FooterContainer>
            </FooterStyle>
        )
    }
}