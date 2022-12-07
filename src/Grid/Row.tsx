import { Motion } from '@motionone/solid';
import { spring } from 'motion';
import {
  Component,
  createEffect,
  createSignal,
  For,
  Match,
  Switch,
} from 'solid-js';
import { ANIMATION_DURATION_VALIDATION } from '../constants';
import { useWordleState, Validation } from '../store';

interface Props {
  rowIndex: number;
}

export const WordleRow: Component<Props> = (props) => {
  const [state, validate] = useWordleState();
  const [validated, setValidate] = createSignal<Validation>([
    'no-match',
    'no-match',
    'no-match',
    'no-match',
    'no-match',
  ]);
  const [word, setWord] = createSignal('');
  const [key, setKey] = createSignal<string | undefined>(undefined);
  createEffect(() => {
    const callback = (e: KeyboardEvent) => {
      if (e.code === 'Enter' && word().length === 5) {
        setValidate(validate(word(), state.word));
      }
      if (e.code === 'Backspace') {
        setWord((prev) => prev.slice(0, -1));
      }
      if (/^[a-z]$/i.test(e.key.replace(/^Key/i, ''))) {
        setWord((prev) => prev + e.key);
      }
      setKey(e.code);
    };
    if (props.rowIndex === state.activeRow) {
      document.addEventListener('keyup', callback);
    } else {
      document.removeEventListener('keyup', callback);
    }
  });
  return (
    <p class="mb-1.5 grid grid-cols-5 gap-1.5 text-4xl font-bold uppercase">
      <For each={validated()}>
        {(item, index) => (
          <Switch
            fallback={
              <span
                classList={{
                  'h-14': true,
                  flex: true,
                  'justify-center': true,
                  'items-center': true,
                  'font-bold': true,
                  'border-gray-600': !!word()[index()] === false,
                  'border-gray-500': !!word()[index()] === true,
                  'border-2': state.activeRow <= props.rowIndex,
                  'bg-gray-400':
                    state.activeRow > props.rowIndex && item === 'no-match',

                  'bg-green-700':
                    state.activeRow > props.rowIndex && item === 'match',

                  'bg-amber-300':
                    state.activeRow > props.rowIndex && item === 'contained',
                }}
              >
                {word()[index()] || ''}
              </span>
            }
          >
            <Match
              when={
                state.status === 'validation' &&
                props.rowIndex === state.activeRow
              }
            >
              <Motion.span
                class="flex h-14 items-center justify-center"
                initial={{ transform: 'rotateX(0deg)' }}
                transition={{
                  duration: ANIMATION_DURATION_VALIDATION,
                  easing: spring(),
                  delay: index() * ANIMATION_DURATION_VALIDATION,
                }}
                animate={{
                  transform: ['rotateX(90deg)', 'rotateX(0deg)'],
                  border: ['var(--border_width) solid var(--gray)', 'none'],
                  backgroundColor: [
                    'var(--gray)',
                    item === 'match'
                      ? 'var(--green)'
                      : item === 'contained'
                      ? 'var(--yellow)'
                      : 'var(--gray)',
                  ],
                }}
              >
                {word()[index()]}
              </Motion.span>
            </Match>
            <Match
              when={
                props.rowIndex === state.activeRow &&
                word().length - 1 === index() &&
                key() !== 'Backspace'
              }
            >
              <Motion.span
                class="flex h-14 items-center justify-center border-2 border-gray-500"
                transition={{ duration: 0.15, easing: spring() }}
                initial={{ transform: 'scale(1)' }}
                animate={{ transform: ['scale(1.15)', 'scale(1)'] }}
              >
                {word()[index()]}
              </Motion.span>
            </Match>
          </Switch>
        )}
      </For>
    </p>
  );
};
