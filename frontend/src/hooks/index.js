// Barrel file: re-exports all custom hooks from a single entry point so
// consumers can import from 'hooks' instead of navigating individual files,
// making refactoring (e.g. renaming or moving a hook) transparent to callers.
export { useApi } from './useApi';
export { useResponsive } from './useResponsive';
