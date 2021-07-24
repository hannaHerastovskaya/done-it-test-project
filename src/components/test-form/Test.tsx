import { Button, Input, Modal, Radio, RadioChangeEvent, Space } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import React, { BaseSyntheticEvent, useCallback, useContext } from 'react';
import { Result, Test, TestType } from '../../types';
import { CheckboxGroup, CodeInput, TestContainer, ToggleController } from './styled';
import { TestContext } from '../../App';
import { useTimer } from '../../userHooks/timer';

interface Props {
  testData: Test;
  setAnswer: (arg: (state: { [p: number]: Result }) => { [p: number]: Result }) => void;
  questionNumber: number;
  value: string | null;
  isCurrentQuestion: boolean;
  getTheNextQuestion: () => void;
  isLastQuestions: boolean;
  onFinishTest: () => void;
}

export const TestComponent: React.FC<Props> = ({
  testData,
  questionNumber,
  value,
  setAnswer,
  getTheNextQuestion,
  isLastQuestions,
  onFinishTest,
  isCurrentQuestion,
}) => {
  const { setFullTime } = useContext(TestContext);
  const { question, img: image, type, options, time, id } = testData;

  const finishTimeInterval = useCallback(() => {
    setAnswer((state) =>
      state[id] ? state : ({...state, [id]: { id, solution: null }})
    );

    if (!isLastQuestions) getTheNextQuestion();
    else Modal.error({ title: 'Time is over!', onOk: onFinishTest });
  }, [isLastQuestions, onFinishTest, getTheNextQuestion, setAnswer, id]);

  const seconds = useTimer(isCurrentQuestion, time, setFullTime, finishTimeInterval);

  const onChangeRadioButton = (e: RadioChangeEvent) => {
    setAnswer((state: { [id: number]: Result }) => ({...state, [id]: { id, solution: e.target.value }}))
  }

  const onChangeMiltySelect = (values: CheckboxValueType[]) => {
    setAnswer((state: { [id: number]: Result }) => ({...state, [id]: { id, solution: values.join('; ')}}))
  }

  const onChangeInput = (e: BaseSyntheticEvent) => {
    setAnswer((state: { [id: number]: Result }) => ({...state, [id]: { id, solution: e.target.value}}))
  }

  const getAnswerVariant = () => {
    switch (type) {
      case TestType.test:
        return (
          <Radio.Group value={value} onChange={onChangeRadioButton} disabled={!isCurrentQuestion}>
            <Space direction="vertical">
              {options?.map(option => (<Radio value={option} key={option}>{option}</Radio>))}
            </Space>
          </Radio.Group>
        )
      case TestType.multiCheckbox:
        return (
          <CheckboxGroup
            options={options?.map(option =>({ value: option, label: option }))}
            disabled={!isCurrentQuestion}
            defaultValue={[]}
            onChange={onChangeMiltySelect}
          />
        )
      case TestType.code:
        return <CodeInput value={value ?? ''} onChange={onChangeInput} disabled={!isCurrentQuestion} />
      case TestType.question:
        return <Input value={value ?? ''} onChange={onChangeInput} disabled={!isCurrentQuestion} allowClear />
      default:
        return <span/>;
    }
  }

  const title = `${questionNumber}. ${question}`;
  const  isVisibleNextButton = isCurrentQuestion && !isLastQuestions;

  return (
    <TestContainer>
      <ToggleController>
        <p>{title}</p>
        <div>
          {isCurrentQuestion && <span id="timer">{`${seconds/1000}sec`}</span>}
          {isVisibleNextButton && <Button onClick={getTheNextQuestion} disabled={!value}>Next Question</Button>}
        </div>
      </ToggleController>
      <div>
        {image && <img src={image} alt="Some image" width="50%" height={350}/>}
        {getAnswerVariant()}
      </div>
    </TestContainer>
  )
}