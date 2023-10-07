import styled from 'styled-components/macro';
import media from 'styled-media-query';

const H1 = styled.h1`
  font-size: ${(props) => (props.fontSize ? props.fontSize : 'large')};
  margin: 20px;
  color: ${(props) => (props.color ? props.color : 'white')};
  float: center;
`;

const H3 = styled.h3`
  font-size: ${(props) => (props.fontSize ? props.fontSize : 'large')};
  color: ${(props) => (props.color ? props.color : 'white')};
  margin: 10px;
`;

const Button = styled.button`
  background: palevioletred;
  color: white;
  ${media.lessThan('medium')`
    font-size: 0.75h;
    margin: 2vh;
    padding: 0.5vh 1vh;
  `}
  ${media.greaterThan('medium')`
    font-size: 0.75em;
    margin: 1em;
    padding: 0.5em 1em;
  `}
  border: 2px solid black;
  border-radius: 3px;
`;

const Div = styled.div`
  display: ${(props) => (props.display ? props.display : 'flex')};
  color: ${(props) => (props.color ? props.color : 'white')};
  font-size: ${(props) => props.fontSize};
  text-align: ${(props) => props.textAlign};
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
  flex-direction: ${(props) => props.flexDirection};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
`;

export { H1, H3, Button, Div };
