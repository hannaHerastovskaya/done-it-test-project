export interface Test {
  question: string,
  type: TestType,
  img: string | null,
  time: number,
  options: (string | number)[] | undefined,
  id: number,
}

export interface Result {
  id: number,
  solution: string | null,
}

export interface ContextType {
  test: Test[],
  result: Result[],
  setResult: (arg: Result[]) => void,
  fullTime: number,
  setFullTime: (arg: (fullTime: number) => number) => void,
}

export enum TestType {
  test = 'test',
  multiCheckbox = 'multi-checkbox',
  question = 'question',
  code = 'code',
}