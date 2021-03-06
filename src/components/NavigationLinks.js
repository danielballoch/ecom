import { Link } from 'gatsby'
import styled from '@emotion/styled';

export const StyledLink = styled(Link)`
padding: 10px;
text-decoration: none;
color: ${props => props.theme.colors.nav.textdark};
list-style-type: none;
transition: 0.1s;
&:hover {
    color: ${props => props.theme.colors.nav.texthover};
}
&:active {
    color: red;
    background: radial-gradient(rgba(255,245,255, 0.95), rgba(255,255,255, 0.95)); 
  }

`
