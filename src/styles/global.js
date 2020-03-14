import { createGlobalStyle } from 'styled-components';
import background from '../assets/background.jpg';

export default createGlobalStyle`
  body {
    height: 100vh;
  }

  #root {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${background});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
`;