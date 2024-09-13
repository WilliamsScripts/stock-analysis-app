# Stock Price Comparison Application

This project is a stock price comparison tool built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. The application allows users to select multiple tech company stocks, specify a date range, and compare their stock prices visually using a chart and a table.

## Features
- Fetch and visualize stock price data for multiple companies.
- Compare stock prices between selected companies over a given date range.
- Display data in both tabular format and chart.

## Technologies Used
- **Next.js 14**: For server-side rendering and React-based frontend.
- **TypeScript**: For static typing.
- **Tailwind CSS**: For UI styling.
- **Axios**: For making API requests.
- **Rechart**: For rendering stock price comparison charts.

## Getting Started

### Prerequisites
To run this project locally, you will need:
- **Node.js** (v14 or above) and **npm**
- An internet connection to install dependencies

### Installation

1. **Clone the repository**:
   ```bash
    git clone https://github.com/WilliamsScripts/stock-analysis-app.git
    cd stock-analysis-app
    ```

2. **Install Dependencies**:
   ```bash
    npm install
    ```
### Environment Variables

The app requires a `.env` file for environment variables. You can set your localhost URL as the server URL for development.

Create a `.env` file in the root directory of your project and add the following:

   ```bash
    NEXT_PUBLIC_SERVER_URL=http://localhost:3000
  ```

### Running the Application

#### Start the Development Server:

To start the development server, use `npm`:

```bash
npm run dev
```

### Open the Application
Once the server is running, open your browser and navigate to:
```bash
http://localhost:3000
```

### Build for Production
To build the application for production, use the following command:
```bash
npm run build
```
After the build is complete, you can start the production server with:
```bash
npm start
```

## Usage
- Navigate to the home page and enter two stock tickers in the form (e.g., "AAPL" for Apple, "GOOGL" for Google).
- Select a date range to compare stock data for those tickers.
- View the stock data and returns in the table.
- Use the chart to visualize the stock price trends.

## Folder Structure
  ```bash
    ├── public/              # Static assets
    ├── src/
    │   ├── actions/         # Server-side actions and API calls
    │   ├── app/             # Next.js app components
    │   ├── components/      # Reusable React components
    │   ├── data/            # Type definitions and static data
    │   ├── hooks/           # Custom Hooks
    │   ├── schemas/         # Validation Schemas for server actions
    │   ├── utils/           # Utility functions
    ├── .env.example         # Example environment variables
    ├── README.md            # Project documentation
    ├── next.config.js       # Next.js configuration
    └── package.json         # Dependencies and scripts
  ```
## Unit Tests
This project includes a unit test for the daily return calculation function. To run the test, use:
  ```bash
  npm run test
  ```
