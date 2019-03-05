import { createGlobalStyle } from "styled-components";
import { background, fontFamily, foreground } from "./variables";

export const GlobalStyle = createGlobalStyle`
  html {
    font-size: 12px;
  }
  body,
  html {
    background: ${background};
    height: 100%;
    min-height: 100%;
    margin: 0;
  }

  body {
    color: ${foreground};
    font-family: ${fontFamily};
    touch-action: none;
    -webkit-tap-highlight-color: transparent;
    &:fullscreen {
      width: 100%;
    }
    &:-webkit-full-screen {
      width: 100%;
    }
    &:-moz-full-screen {
      width: 100%;
    }

    #root {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;
