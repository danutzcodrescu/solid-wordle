import type { Component } from 'solid-js';
import { GridContainer } from './Grid/Container';
import { WordleProvider } from './store';

const App: Component = () => {
  return (
    <div class="bg-black w-screen h-screen text-gray-300 ">
      <WordleProvider>
        <GridContainer />
      </WordleProvider>
    </div>
  );
};

export default App;
