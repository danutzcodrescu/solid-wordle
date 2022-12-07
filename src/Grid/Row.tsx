import { Motion } from '@motionone/solid';
import { Component, createEffect, createSignal, For, Show } from 'solid-js';
import { useWordleState, Validation } from '../store';
import { spring } from 'motion';

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
          <Show
            when={word().length - 1 === index() && key() !== 'Backspace'}
            fallback={
              <span
                classList={{
                  'h-14': true,
                  flex: true,
                  'justify-center': true,
                  'items-center': true,
                  'font-bold': true,
                  'border-gray-600': !!word()[index()] === false,
                  'border-gray-400': !!word()[index()] === true,
                  'border-2': true,

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
              </span>
            }
          >
            <Motion.span
              class="flex h-14 items-center justify-center border-2 border-gray-400"
              transition={{ duration: 0.15, easing: spring() }}
              initial={{ transform: 'scale(1)' }}
              animate={{ transform: ['scale(1.15)', 'scale(1)'] }}
            >
              {word()[index()]}
            </Motion.span>
          </Show>
        )}
      </For>
    </p>
  );
};
