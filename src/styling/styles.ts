import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: top;
    color: papayawhip;
    background-color: #01579B;
    height: 86vh;
`

export const Form = styled.form`
    display: block;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
    color: papayawhip;
    background-color: #01579B;
    width: 75%;
    height: 75vh;
    padding: 1%;
`

export const Button = styled.button`
    border-radius: 5px;
    color: #4527A0;
    border: 2px solid #4527A0;
    background-color: antiquewhite;
    margin: 1em 2em;
    padding: 0.25em 1em;
    font-family: 'Source Code Pro', monospace;
`

export const NavbarColors = styled.div`
    background-color: #ffc300;
`

export const ReverseButton = styled.button`
    border-radius: 5px;
    color: antiquewhite;
    border: 2px solid antiquewhite;
    background-color: indigo;
    margin: 1em 2em;
    padding: 0.25em 1em;
    font-family: 'Source Code Pro', monospace;
`

export const CreateButton = styled.button`
    border-radius: 5px;
    color: indigo;
    border: 2px solid indigo;
    background-color: papayawhip;
    margin-left: 2%;
    margin-bottom: 2%;
    padding: 0.25em 1em;
    font-size: x-large;
    font-family: 'Source Code Pro', monospace;
`

export const SmallButton = styled.button`
    border-radius: 5px;
    color: indigo;
    background-color: papayawhip;
    border: 2px solid papayawhip;
`

export const SmallReverseButton = styled.button`
    border-radius: 5px;
    color: papayawhip;
    background-color: indigo;
    border: 1px solid indigo;
`

export const Input = styled.input`
    background-color: antiquewhite;
    width: 15em;
`

export const FormInput = styled.input`
    background-color: mintcream;
    width: 19em;
`

export const Label = styled.label`
    color: mintcream;
    font-size: large;
    margin-left: 2%;
    font-family: 'Source Code Pro', monospace;
`

export const AuthHeader = styled.div`
    display: block;
    justify-content: space-evenly;
    color: papayawhip;
    text-align: center;
    background-color: indigo;
    padding-top: 1%;
    padding-bottom: 1%;
    margin-bottom: -1%;
    font-family: 'Source Code Pro', monospace;
`

export const SideStyle = styled.div`
    display: inline;
    background-color: #01579B;
    color: antiquewhite;
    width: 100%;
    min-height: 75vh;
    padding-top: 3%;
    padding-left: 1%;
    position: relative;
`

export const HeaderStyle = styled.div`
    display: flex;
    background-color: indigo;
    color: antiquewhite;
    justify-content: space-evenly;
    width: 100%;
    padding-top: 2%;
    font-family: 'Source Code Pro', monospace;

`

export const FooterStyle = styled.div`
    background-color: #424242;
    color: papayawhip;
    justify-content: space-evenly;
    width: 100%;
    min-height: 20vh;
    position: relative;
    font-family: 'Source Code Pro', monospace;
`

export const TD = styled.td`
    color: mintcream;
`

export const TH = styled.td`
    color: mintcream;
    font-family: 'Roboto-Mono', monospace;
`

export const FooterContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	max-width: 1100px;
	margin: auto;
`

export const Row = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill,
						minmax(200px, 1fr));
grid-gap: 20px;

@media (max-width: 1000px) {
	grid-template-columns: repeat(auto-fill,
						minmax(225px, 1fr));
}
`

export const Column = styled.div`
display: flex;
flex-direction: column;
margin-left: 20px;
margin-right: -20px;
`

export const FooterLink = styled.a`
color: mintcream;
font-size: 18px;
text-decoration: none;

&:hover {
	color: #FFC300;
	transition: 200ms ease-in;
}
`

export const Heading = styled.p`
font-size: 24px;
color: mintcream;
font-family: 'Roboto Mono', monospace;
`

export const FooterP = styled.p`
color: mintcream;
font-size: 12px;
`

export const MyH1 = styled.h1`
color: mintcream;
font-family: 'Roboto-Mono', monospace;
`