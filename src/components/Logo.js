import styled from 'styled-components';
import logo from '../assets/logo.png';

const Logo = styled.div`
  display: flex;
  background-image: url(${logo});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export default Logo;