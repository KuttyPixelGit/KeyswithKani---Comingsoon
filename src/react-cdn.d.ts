// This file makes TypeScript aware of the global React and ReactDOM objects from CDN
declare namespace ReactCDN {
  interface React {
    createElement: any;
    StrictMode: any;
  }

  interface ReactDOM {
    createRoot: (container: Element | DocumentFragment) => {
      render: (element: any) => void;
      unmount: () => void;
    };
  }
}

declare global {
  interface Window {
    React: ReactCDN.React;
    ReactDOM: ReactCDN.ReactDOM;
  }
}

export {};
