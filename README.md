# 🎮 GameExplorer

**GameExplorer** is a simple web app built with **Next.js** that allows users to explore video games using data from the [RAWG.io](https://rawg.io/apidocs) external API.
This project was created as a learning exercise to practice API integration and dynamic content rendering with Next.js.

## ✨ Features

* Browse popular and trending video games.
* Search for games by title.
* View information about each game, including:
  * Cover image
  * Genres
  * Platforms
  * Ratings
  * Release date
* Responsive UI built with Tailwind CSS (optional depending on your setup).

## 🔧 Technologies Used

* [Next.js](https://nextjs.org/) – React framework for server-side rendering and routing
* [RAWG.io API](https://rawg.io/apidocs) – Free video game database API
* [Axios](https://axios-http.com/) – HTTP client for making API requests
* [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework (optional)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/MaryanneKaffer/game-explorer-app
cd game-explorer-app
```

### 2. Install dependencies

```bash
npm install
# or
yarn
```

### 3. Set up environment variables

Create a `.env.local` file in the root of the project and add your RAWG API key:

```bash
NEXT_PUBLIC_RAWG_API_KEY=your_rawg_api_key_here
```

> You can get a free API key from [https://rawg.io/apidocs](https://rawg.io/apidocs).

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## 🎯 Learning Objectives

* Practice working with external APIs in a Next.js app
* Learn how to manage API keys securely with environment variables
* Explore responsive UI design with Tailwind CSS
