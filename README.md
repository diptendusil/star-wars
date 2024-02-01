# Star Wars Registry

## Running the application

### Prerequisites

- NodeJS v20.10.0
- An Editor, preferred VSCode
- Windows 11 / Mac / Linux
- Git

### Setup

```bash
- git clone sdfsdff
- cd star-wars
- npm install
- npm run build
- npm run dev
```

Open ```http://localhost:4000/home``` on your browser.

## Testing

### Unit tests

To run the unit tests, execute ```npm run test:unit```

### E2E tests

Make sure the application is already running to test localhost ```npm run dev```

Install playwright browsers using ```npx playwright install```

To run the automation, run ```npm run test:browser```. By default it will run in headless mode.

To run in headed mode, append ```-- --headed```. Full command: ```npm run test:browser -- --headed```

### Unit test + E2E test

Run ```npm run test``` to run the unit tests followed by the browser tests. (Make sure the application is running)
