import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

// Deliberately close to the standard Vite + React + TS template's own
// config, not a stricter ruleset — this codebase already has a real style
// (see CLAUDE.md), and rules that would fight it (e.g. forcing every prop
// destructure into a named interface, banning `any` outright when a few
// third-party types genuinely need it) add noise without catching real
// bugs. react-hooks + react-refresh + typescript-eslint's recommended set
// covers the things actually worth enforcing (hook deps, unused vars,
// stale closures) — see CLAUDE.md if this needs tightening later.
export default tseslint.config(
  { ignores: ['dist', 'node_modules', '.firebase', '.claude/worktrees'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // Just the two classic rules, not eslint-plugin-react-hooks v7's
      // full "recommended" bundle — that set now also includes React
      // Compiler-readiness checks (e.g. flagging setState called
      // directly in a useEffect body) that fire on totally standard,
      // correct hook patterns already used throughout this codebase
      // (useMediaQuery, useDelayedLoad) — not bugs, just not written
      // for a compiler this app doesn't use.
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      // Real-world escape hatch used deliberately in a handful of spots
      // (a third-party lib with weak types, a generic helper) — a warning
      // flags new uses for review without failing the build over
      // existing, considered ones.
      '@typescript-eslint/no-explicit-any': 'warn',
      // A leading underscore is this codebase's existing convention for
      // "intentionally unused" (a destructured value kept for its
      // position, an unused catch binding) — matches ts's own
      // noUnusedParameters escape hatch.
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },
)
