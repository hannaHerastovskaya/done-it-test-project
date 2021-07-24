import React, { useEffect, useState } from 'react';
import { Container, Header } from './styled';
import { TestForm } from './components/test-form';
import * as data from './data.json';
import { ContextType, Result, Test } from './types';
import { Button } from 'antd';

export const TestContext = React.createContext<ContextType>({
  test: [],
  result: [],
  setResult: () => {},
  fullTime: 0,
  setFullTime: () => {},
});

export const App:React.FC = () => {
  const [result, setResult] = useState<Result[]>([]);
  const [fullTime, setFullTime] = useState<number>(0);

  useEffect(() => {
    result.length && console.log(
      'Answers:',
      result
        .map(({ id, solution }) => `Question id:${id}\nAnswer: ${solution}`)
        .join('\n')
    );
  }, [result]);

  const context: ContextType = { test: data.test as Test[], result, setResult, fullTime, setFullTime };

  return (
    <TestContext.Provider value={context}>
      <Container>
        <Header>{data.testName}</Header>
        {
          !result.length ?
            <TestForm/> : (
              <>
                <h2>The Test has already finished!</h2>
                <h3>Full time: {Math.floor(fullTime/60)}min {fullTime%60}s</h3>
                <Button onClick={() => setResult([])}>Repeat test</Button>
              </>
            )
        }
      </Container>
    </TestContext.Provider>
  );
}
