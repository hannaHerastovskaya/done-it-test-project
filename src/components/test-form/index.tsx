import React, { useCallback, useContext, useState } from 'react';
import { TestContext } from '../../App';
import { TestComponent } from './Test';
import { SubmitButton, TestFormContainer } from './styled';
import { Result } from '../../types';

export const TestForm: React.FC = () => {
  const { test, setResult } = useContext(TestContext);

  const [answers, setAnswers] = useState<{ [id: number]: Result }>([]);
  const [currentQuestion, setCurrentQuestion] = useState(test[0]?.id ?? null);

  const answerKeys = Object.keys(answers);
  const testLength = test.length;
  const disableSubmitButton = answerKeys.length < testLength;

  const onFinishTest = useCallback(() => {
    setResult(answerKeys.map((key) => answers[+key]));
  }, [answers, setResult, answerKeys]);

  const getTheNextQuestion = useCallback((indexItem: number) => {
      setCurrentQuestion(test[indexItem+1]?.id)
  }, [test]);

  return (
    <TestFormContainer>
      {
        test.map((t, index) => (
          <TestComponent
            testData={t}
            setAnswer={setAnswers}
            key={t.id}
            questionNumber={index+1}
            value={answers[t.id]?.solution ?? null}
            isCurrentQuestion={currentQuestion === t.id}
            isLastQuestions={testLength === (index+1)}
            getTheNextQuestion={() => getTheNextQuestion(index)}
            onFinishTest={onFinishTest}
          />
        ))
      }
      <SubmitButton onClick={onFinishTest} disabled={disableSubmitButton}>
          Submit
      </SubmitButton>
    </TestFormContainer>
  )
}