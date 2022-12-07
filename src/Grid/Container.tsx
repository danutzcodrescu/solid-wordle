import { Component, Index } from 'solid-js';
import { WordleRow } from './Row';

export const GridContainer: Component = () => {
  return (
    <div class="mx-auto max-w-xs pt-5">
      <Index each={new Array(5)}>
        {(_, index) => <WordleRow rowIndex={index} />}
      </Index>
    </div>
  );
};
