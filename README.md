# Template Backend Pure

Tech: TS + Express

## Run

- `npm i`
- `npm run build`: let `tsc` compile Node server in TS to JS, and compile again detect changes in `/src`
- `npm start`: build a Node server using `nodemon`
- remember install `.d.ts` files for any libraries with `npm i -D @types/yourLibHere`

## Replicate

- clone this repo + del `package.json` + add code below

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "build": "tsc -w",
  "start": "nodemon dist/app.js"
},

,
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "./src/**/*.ts": [
      "npx eslint --max-warnings 100 --cache --fix",
      "npx prettier --write"
    ],
    "./src/app.ts": [
      "npx eslint --max-warnings 100 --cache --fix",
      "npx prettier --write"
    ]
  }
```

- `npm i dotenv express`
- `npm i -D @types/express @types/node @typescript-eslint/eslint-plugin @typescript-eslint/parser cors @types/cors eslint eslint-config-prettier eslint-plugin-import eslint-plugin-node eslint-plugin-prettier husky@4.3.8 lint-staged nodemon @types/morgan morgan prettier typescript`
