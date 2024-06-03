# Delosnews

Next.js application

**Deployed at: [delosnews.tifan.me](https://delosnews.tifan.me/)**

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Testing](#testing)

## Overview

There is no authentication. Data unique to your usage such as your balance or purchased articles are stored in the browser's local storage.

### Routes

Routes available in the application are as follows:

```plaintext
/              (Home page with a list of articles)
/[articleId]   (Article detail page)
/purchased     (Purchased articles page)
/lucky         (Lucky Coin page)
```

### Environment Variables

The application uses the following environment variables:

- `API_KEY`: Provide your own New York Times API key if you want to run this application locally.
- `FETCH_DELAY` (optional): The delay in ms to simulate fetching data from the API.

## Prerequisites

Ensure that you have **Node.js v20** or above installed on your local machine.

## Installation

1. Install the required packages and dependencies by running the following command:

```bash
npm install
```

> Feel free to use an alternative package manager of your choice. (bun, yarn, etc)

2. Create a `.env.local` file by copying the example file:

```bash
cp .env.local.example .env.local
```

3. In the `.env.local` file, fill in the appropriate values.

## Running the Application

To run the application in production mode, run te following command:

```bash
npm run build
```

After the build is complete, run the following command to start the application:

```bash
npm run start
```

To run the application in development mode, run the following command to start the development server and watch for changes:

```bash
npm run dev
```

The application will be available at http://localhost:3000 by default.

## Testing

To run the test suite and check the current test coverage report, use the following command:

```bash
npm run test
```
