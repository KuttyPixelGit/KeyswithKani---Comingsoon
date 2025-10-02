// This file makes TypeScript aware of the global React and ReactDOM objects
declare global {
  interface Window {
    React: typeof import('react');
    ReactDOM: typeof import('react-dom');
  }
}

export {};
