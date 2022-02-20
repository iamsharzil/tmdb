import { css, Global } from '@emotion/react';

export const globalStyles = (
  <Global
    styles={css`
      html,
      body {
        font-family: 'Inter', sans-serif;
      }

      html {
        font-size: 62.5%;
      }

      body {
        font-size: 1.6rem;
        /*line-height: 1.6;*/
        font-weight: 400;
        color: #000;
        background-color: #fff;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    `}
  />
);
