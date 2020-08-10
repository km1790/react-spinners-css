import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import alias from '@rollup/plugin-alias';
import svgr from '@svgr/rollup';
import path from 'path';
import pkg from './package.json';
import json from 'rollup-plugin-json5';

const projectRootDir = path.resolve(__dirname);

export default {
    input: 'src/index.js',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: pkg.module,
            format: 'es',
            sourcemap: true,
        },
    ],
    plugins: [
        external({ includeDependencies: true }),
        json({
            // specify json files tester, defaults /\.(json|babelrc)$/
            resolve: ['json5', 'json'],
            // All JSON files will be parsed by default, but you can also specifically
            // include/exclude files
            exclude: 'node_modules/**',
            // for tree-shaking, properties will be declared as variables, using either
            // `var` or `const`
            preferConst: true, // Default: false
            // specify indentation for the generated default export — defaults to '\t'
            // indent: '  '
        }),
        alias({
            resolve: ['.jsx', '.js'],
            entries: {
                '@': path.resolve(projectRootDir, './src'),
            },
        }),
        postcss({
            modules: false,
            extensions: ['.css', '.scss'],
            extract: 'dist/styles.css',
            sourceMap: true,
        }),
        url(),
        svgr(),
        babel({
            exclude: 'node_modules/**',
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-optional-chaining',
                '@babel/plugin-proposal-private-methods',
                [
                    '@kutils/babel-plugin-react-docgen',
                    {
                        resolver: './plugins/reactdocgen-lift-resolver.js',
                        removeMethods: false, // optional (default: false)
                        'handlers:': ['react-docgen-deprecation-handler'],
                    },
                ],
            ],
        }),
        resolve({
            extensions: ['.mjs', '.js', '.jsx', '.json', '.scss', '.css'],
            dedupe: ['react', 'react-dom'],
        }),
        commonjs(),
    ],
};
