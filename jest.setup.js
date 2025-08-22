import "@testing-library/jest-dom";

// Mock Three.js
global.THREE = {};

// Mock canvas
HTMLCanvasElement.prototype.getContext = jest.fn();
