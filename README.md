# React Spinners in CSS

Currently [react-spinners package](https://github.com/davidhu2000/react-spinners) provides spinner implementation with CSS-in-JS ported via [halogen](https://github.com/yuanyan/halogen). With CSP headers we need to add unsafe-inline in styles or provide nonce and sha-256 based protection. This is not ideal for most of the use cases, and incorrect implementation of nonce can leave css injection unprotected. This package is an attempt to migrate all spinners provided in that package to CSP complaint react component.

Following have been ported so far:
- CircleLoader
- BarLoader
- PacmanLoader

Other loader migration is in progress.
Roadmap:
- V1.0.0 will have all loaders migrated

Demo:
[React Spinners Demo](https://www.davidhu.io/react-spinners)

Orignal Author for react-spinners:
- [David Hu](https://www.davidhu.io)
- [Halogen - Yuanyan Cao](https://github.com/yuanyan/halogen)

# Installation

NPM
```bash
npm install react-spinners-css
```

YARN
```shell
yarn add react-spinners-css
```

# Usage

```jsx
import {CircleLoader} from 'react-spinners-css';
import 'react-spinners-css/dist/styles.css';
```