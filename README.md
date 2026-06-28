# Boilerplate Web

Quick Start for web project.

## How Maintain~

This boiler will use [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller#) as model, so please keep the rules to easy maintain for everyone:

- All in `/pages` should contain just component, no logic. (as pages view)
- In `/components` is where all logic being used & also for UI execution (as View & Controller)
- In others than that, that including logic and execution will be created & cook in `[folderName]/customHooks` or partial helpers, that will be called in `/components`. DO NOT! created `/customHooks` folder in root `/src` create it where it is needed. (as Model).
- Always created specific `/types` for every response outcome.
- (please look dir structure) For outside than in `/src` will be place for config and others frameworks or library that doesn't have connection with the frontend directly. like cypress frameworks, or husky library.

## Getting Started

These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (12.x or later)
- [pnpm](https://pnpm.io/) (5.x or later)

### Installation

Follow these steps to set up and run the project:

1. Clone the repository to your local machine:


2. Navigate to the project's root directory:

```bash
cd boilerplate
```

3. Install project dependencies using pnpm:

```bash
pnpm i
```

## Development

To start the development server, run the following command:

```bash
pnpm dev
```

This will start the development server, and you can view your project in your web browser at http://localhost:1337.

## Building for Production

To build the project for production, run:

```bash
pnpm build
```

This command will create an optimized production-ready build of your project in the build directory.

## Running Tests

To run tests, run the following command.

For specific `pnpm run test / cy / test:cy:e2e` make sure the server already spin before do a test.

#### Conditional :

for a complete test; unit testing & e2e :

- you chan change(package.json) `jest` as default form of `test` to `start-server-and-test start http://localhost:1337 test:ci` and move `jest` with `test:jest`
- `pnpm run test` will do full testing.

Run Jest

```bash
  pnpm run test
```

Run Cypress

```bash
  pnpm run test:cy
```

Test e2e with Cypress

```bash
  pnpm run test:cy:e2e
```

CI test command

```bash
pnpm run test:ci
```

Husky test command

```bash
pnpm run test:husky
```

## Directory structure

```bash
root/
├── .npmrc
├── .env.example
├── .dockerignore
├── .gitignore
├── .npmrc
├── .husky/
├── cypress/
├── public/
│   ├── css/
│   ├── Icon/
│   ├── Images/
│   ├── vercel.json
│   └── favicon.ico
├── src/
│   ├── api/
│   ├── components/
│   ├── configs/
│   ├── layouts/
│   ├── redux/
│   ├── services/
│   ├── styles/
│   ├── tests/
│   ├── types/
│   ├── utils/
│   └── pages/
│       ├── api/
│       ├── ...
│       ├── _app.tsx
│       └── index.tsx
├── cypress.config.ts
├── jest.config.mjs
├── next-env.d.ts
├── next.config.js
├── package.json
├── pnpm-lock.yaml
├── docker-compose.yml
├── dockerfile
├── tsconfig.json
└── README.md

```

## DOC

- [antD](https://ant.design/components/overview/) | Components UI
- [apexcharts](https://apexcharts.com/docs/creating-first-javascript-chart/) | Chart Components
- [redux](https://redux.js.org/introduction/getting-started) | Global State
- [jwt](https://jwt.io/introduction) | Token
- [localforage](https://localforage.github.io/localForage/) | Localstorage Like but Async
- [js-cookie](https://github.com/js-cookie/js-cookie/blob/main/README.md) | Light weight cookies api
- [axios](https://axios-http.com/docs/api_intro) | Fetch
- [husky](https://typicode.github.io/husky/) | Safety git hooks/clean commit
- [jest](https://jestjs.io/docs/getting-started) | Unit Test
- [cypress](https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test) | e2e test
- [docker](https://docs.docker.com/) | Containerization
