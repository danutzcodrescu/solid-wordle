import { Component, createContext, JSX, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';

interface WordleState {
  word: string;
  activeRow: number;
  status: 'playing' | 'win' | 'validation' | 'lose';
}

interface Props {
  children: JSX.Element;
  initialState?: WordleState;
}

type LetterCheck = 'match' | 'contained' | 'no-match';
export type Validation = [
  LetterCheck,
  LetterCheck,
  LetterCheck,
  LetterCheck,
  LetterCheck,
];
type ContextValue = [WordleState, (word: string, wordle: string) => Validation];

const WordleContext = createContext<ContextValue>();

export const WordleProvider: Component<Props> = (props) => {
  const [state, setState] = createStore<WordleState>(
    props.initialState || { word: 'solid', activeRow: 0, status: 'playing' },
  );
  const wordleState: ContextValue = [
    state,
    (word, wordle) => {
      setState('status', 'validation');
      setTimeout(() => {
        setState((s) => {
          if (s.word === word) {
            return {
              ...s,
              status: 'win',
            };
          }
          if (s.activeRow === 4 && s.word !== word) {
            return { ...s, status: 'lose' };
          }

          return {
            ...s,
            status: 'playing',
            activeRow: s.activeRow + 1,
          };
        });
      }, 2500);
      return word.split('').map((letter, index) => {
        if (wordle[index] === letter) return 'match';
        if (wordle.includes(letter)) return 'contained';
        return 'no-match';
      }) as Validation;
    },
  ];
  return (
    <WordleContext.Provider value={wordleState}>
      {props.children}
    </WordleContext.Provider>
  );
};

export function useWordleState() {
  return useContext(WordleContext);
}
