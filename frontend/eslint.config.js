import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { default as tseslint } from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'
import tailwindPlugin from 'eslint-plugin-tailwindcss'

// File naming plugin remains the same
const fileNamingPlugin = {
  rules: {
    'file-naming': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Enforce kebab-case file naming conventions'
        }
      },
      create(context) {
        return {
          Program(node) {
            const filename = context.getFilename()
            if (filename === '<input>') return
            
            if (filename.endsWith('vite-env.d.ts')) return
            if (filename.endsWith('main.tsx')) return
            if (filename.endsWith('index.tsx')) return

            if (filename.includes('/assets/')) return
            if (filename.includes('/routes/')) return
            
            const isTsFile = filename.endsWith('.ts')
            const isTsxFile = filename.endsWith('.tsx')
            const basename = filename.split('/').pop().split('.').slice(0, -1).join('.')
            
            const isKebabCase = (str) => /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(str)
            
            if ((isTsFile || isTsxFile) && !basename.split('.').every(isKebabCase)) {
              context.report({
                node,
                message: 'Files must use kebab-case naming (example: user-profile.service.ts, user-list.component.tsx)'
              })
            }

            const projectPath = filename.split('src/')[1]
            if (projectPath) {
              const dirs = projectPath.split('/')
              dirs.pop()
              
              for (const dir of dirs) {
                if (dir === '' || dir === '.' || dir === '..' || dir === 'assets' || dir === 'routes') continue
                
                if (!isKebabCase(dir)) {
                  context.report({
                    node,
                    message: `Directory "${dir}" must use kebab-case naming`
                  })
                }
              }
            }
          }
        }
      }
    }
  }
}

export default tseslint.config(
  { 
    ignores: [
      'dist',
      '_webpack_front/**'
    ]
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tseslint.parser
    },
    settings: {
      react: {
        version: "18.3"
      }
    },
    plugins: {
      'react': react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'import': importPlugin,
      'tailwindcss': tailwindPlugin,
      'custom': fileNamingPlugin
    },
    rules: {
      ...reactHooks.configs.recommended.rules,

      'indent': ['error', 2],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'quotes': ['error', "double"],
      'brace-style': ['error', '1tbs', { allowSingleLine: false }],
      'function-paren-newline': ['error', 'multiline'],
      'object-curly-newline': ['error', { 'multiline': true, 'consistent': true }],
      'array-bracket-newline': ['error', { 'multiline': true }],
      'object-curly-spacing': ['error', 'always'],
      'operator-linebreak': ['error', 'before'],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
        { blankLine: 'always', prev: 'function', next: '*' },
        { blankLine: 'always', prev: '*', next: 'function' },
        { blankLine: 'always', prev: '*', next: 'export' },
        { blankLine: 'always', prev: 'export', next: '*' }
      ],
      'semi': ['error', 'never'],
      'comma-dangle': ['error', 'never'],
      'prefer-const': 'error',
      'eol-last': ['error', 'always'],
      'custom/file-naming': 'error',

      // TypeScript-specific rules
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports'
        }
      ],
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
          allowDirectConstAssertionInArrowFunctions: true,
          allowFunctionsWithoutTypeParameters: true
        }
      ],
      '@typescript-eslint/no-explicit-any': 'error',

      // React-specific rules
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function'
        }
      ],
      'react/no-unused-prop-types': 'error',
      'react-hooks/exhaustive-deps': 'off',

      // Tailwind rules
      'tailwindcss/classnames-order': 'error',
      'tailwindcss/no-custom-classname': 'error',
      'tailwindcss/no-contradicting-classname': 'error',

      // Import rules
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'index',
            'type'
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before'
            }
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          }
        }
      ]
    }
  }
)