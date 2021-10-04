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
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default class Footer extends React.Component {

    render() {
        return(
            <FooterStyle>
                <FooterContainer>
                    <Row>
                        <Column>
                            <Heading>Designed By:</Heading>
                            <FooterLink href="https://www.linkedin.com/in/bltitus" target="_blank"><LinkedInIcon /> Brad Titus </FooterLink>
                            <FooterLink href="https://www.github.com/bltitus82" target="_blank"><GitHubIcon /> bltitus82 </FooterLink>
                        </Column>
                        <Column>
                            <Heading>Disclaimer</Heading>
                            <FooterP>All quotes, likenesses, characters, and information included on this site are the intellectual property of NBC Universal and the creators of The Office. This is intended for entertainment purposes only.</FooterP>
                            <FooterLink style={{ fontSize: 12 }} href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" > Unless otherwise stated, the content of this page is licensed under Creative Commons Attribution-ShareAlike 3.0 License </FooterLink>
                        </Column>
                        <Column>
                            <Heading>Resources</Heading>
                            <FooterLink href="https://www.peacocktv.com/stream-tv/the-office"> Watch The Office on Peacock! </FooterLink>
                            <FooterLink href="https://www.officeladies.com"> The Office Ladies podcast </FooterLink>
                            <FooterLink href="https://www.theincomparable.com/sim/"> Somehow I Manage podcast on The Incomparable </FooterLink>
                            <FooterLink href="https://www.iheart.com/podcast/1119-the-office-deep-dive-with-77030510/"> The Office Deep Dive with Brian Baumgartner on iHeart </FooterLink>
                        </Column>
                    </Row>
                </FooterContainer>
            </FooterStyle>
        )
    }
}