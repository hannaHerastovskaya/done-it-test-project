import styled from 'styled-components';
import TextArea from 'antd/lib/input/TextArea';
import { Button, Checkbox } from 'antd';

export const TestFormContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;

  width: 100%;
  display: flex;
  flex-direction: column;
  
  &::-webkit-scrollbar {
    width: 6px;
    background: rgba(91,91,91,0.2);
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: grey;
  }
`;

export const CheckboxGroup = styled(Checkbox.Group)`
  display: flex;
  flex-direction: column;
`;

export const TestContainer = styled.div`
  font-family: 'Arial', sans-serif;
  margin-right: 8px;
  & > p {
    text-shadow: 1px 1px 1px lightgray;
    margin-bottom: 8px;
  }
  margin-bottom: 16px;
  & > div {
    display: flex;
    flex-direction: row;
    flex: auto;
    justify-content: space-between;
    align-content: flex-start;
  }
`;

export const ToggleController = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  
  #timer {
    color: darkred;
    font-weight: bold;
    font-size: 16px;
    font-family: monospace;
    margin-right: 8px;
  }
  
  & > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
`;

export const CodeInput = styled(TextArea)`
  font-size: 11px;
  background: url(http://i.imgur.com/2cOaJ.png);
  background-attachment: local;
  background-repeat: no-repeat;
  padding-left: 35px;
  padding-top: 12px;
  border-color:#ccc;
  font-family: monospace;
  &.ant-input { 
    line-height: 1.4547;
  }
  &::-webkit-scrollbar {
    width: 6px;
    background: rgba(91,91,91,0.2);
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: grey;
  }
`;

export const SubmitButton = styled(Button)`
  background: limegreen;
  &:hover {
    color: lightgray;
    background: green;
  }
`;
