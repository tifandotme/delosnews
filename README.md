# Delosnews

Next.js application that integrates with the New York Times API to display a list of articles. Users can view article details, purchase articles, and also play a minigame to earn rewards!

**Deployed at: [delosnews.tifan.me](https://delosnews.tifan.me/)**

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Testing](#testing)

## Overview

There is no authentication. Data unique to your usage such as your balance or purchased articles are stored in the browser's local storage. To reset your balance or purchased articles, you can delete the local site data.

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
- `FETCH_DELAY` (optional): Simulate a fetch delay in "/" route. This is useful for testing the loading state during infinite scrolling. Default is 0.

### Lucky Coin Minigame

The Lucky Coin minigame is a simple game where you can draw or "flip a coin" to earn rewards. The cost of entering a round is 3 tickets. For each round, you can draw 3 times.

The prizes are as follows:

- 50000 coins (max 1 per round)
- 20000 coins
- 1 ticket
- A try again

You can earn 3 tickets for each purchase of an article with a minimum price of 50000.

## Prerequisites

Ensure that you have **Node.js v20** or above installed on your local machine.

## Installation

1. Install the required packages and dependencies by running the following command:

```bash
npm install
```

> [!NOTE]
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
