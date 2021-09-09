# Template Backend Pure

Tech: TS + Express

## Run

- `npm i`
- `npm run build`: let `tsc` compile Node server in TS to JS, and compile again detect changes in  `/src`
- `npm start`: build a Node server using `nodemon`
- remember install `.d.ts` files for any libraries with `npm i -D @types/yourLibHere`

## Replicate

- `npm i dotenv express`
- `npm i -D @types/express @types/node @typescript-eslint/eslint-plugin @typescript-eslint/parser cors @types/cors eslint eslint-config-prettier eslint-plugin-import eslint-plugin-node eslint-plugin-prettier husky@4.3.8 lint-staged nodemon @types/morgan morgan prettier typescript`
