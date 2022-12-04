import { Component, Index } from 'solid-js';
import { WordleRow } from './Row';

export const GridContainer: Component = () => {
  return (
    <div class="mx-auto max-w-2xl  border-2 border-gray-400 [&>:not(:last-child)]:border-b-2 [&>:not(:last-child):border-gray-400]">
      <Index each={new Array(5)}>
        {(_, index) => <WordleRow rowIndex={index} />}
      </Index>
    </div>
  );
};
