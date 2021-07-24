import styled from 'styled-components';

export const Container = styled.div`
  background: aliceblue;
  border-radius: 15px;
  
  margin: 16px;
  padding: 16px;
  
  width: 800px;
  min-width: 260px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  & > h2, & > h3 {
    text-align: center;
    font-family: 'Fjalla One', sans-serif;
  }
`;

export const Header = styled.header`
  color: limegreen;
  font-size: 36px;
  line-height: 36px;
  text-shadow: 1px 1px 2px black;
  text-align: center;
  font-family: 'Fjalla One', sans-serif;
  position: relative;
  padding-bottom: 60px;

  &::before {
    content: 'Test Project for DoneIT Company';
    color: #003a1b;
    font-size: 25px;
    line-height: 25px;
    position: absolute;
    right: 0;
    top: 48px;
    left: 0;
  }

  @media screen and (max-width: 562px) {
    &::before {
      top: 75px;
    }
  }
  
  @media screen and (max-width: 400px) {
    &::before {
      font-size: 16px;
    }
    font-size: 26px;
  }
`;
