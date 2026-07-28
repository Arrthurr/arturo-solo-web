import '@testing-library/jest-dom/vitest';

// jsdom does not implement window.scrollTo; stub it to silence framer-motion warnings.
window.scrollTo = () => {};
