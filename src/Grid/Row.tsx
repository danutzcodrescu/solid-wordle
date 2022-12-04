import { Component, createEffect, createSignal, For } from 'solid-js';
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
    };
    if (props.rowIndex === state.activeRow) {
      document.addEventListener('keyup', callback);
    } else {
      document.removeEventListener('keyup', callback);
    }
  });
  return (
    <div class="grid grid-cols-5 uppercase">
      <For each={validated()}>
        {(item, index) => (
          <div
            classList={{
              'h-24': true,
              '[&:not(:first-child)]:border-l-2': true,
              '[&:not(:first-child)]:border-gray-400': true,
              flex: true,
              'justify-center': true,
              'items-center': true,
              'font-bold': true,
              'text-7xl': true,

              'bg-gray-400':
                (state.activeRow > props.rowIndex ||
                  (state.status === 'validation' &&
                    props.rowIndex === state.activeRow)) &&
                item === 'no-match',

              'bg-green-700':
                (state.activeRow > props.rowIndex ||
                  (state.status === 'validation' &&
                    props.rowIndex === state.activeRow)) &&
                item === 'match',

              'bg-amber-300':
                (state.activeRow > props.rowIndex ||
                  (state.status === 'validation' &&
                    props.rowIndex === state.activeRow)) &&
                item === 'contained',
            }}
          >
            {word()[index()] || ''}
          </div>
        )}
      </For>
    </div>
  );
};
