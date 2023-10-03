# Blog Analytics and Search Tool

This project is a blog analytics and search tool developed using Express.js and Lodash. The tool fetches data from a third-party blog API, performs analytics, and provides search functionality. The goal is to create insightful statistics about the blogs and enable users to search for specific blog posts.

## Setup

Follow these steps to set up the project in your local environment:

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/blog-analytics-search-tool.git
   ```

2. Navigate to the project directory:

   ```bash
   cd blog-analytics-search-tool
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Configuration

1. Obtain an admin secret key for the Hasura blog API.

2. Create a `.env` file in the project root and add your secret key:

   ```env
   HASURA_ADMIN_SECRET=your-secret-key
   ```

### Running the Server

Start the Express server:

```bash
npm start
```

The server will run on `http://localhost:3000` by default.

## Endpoints

### 1. Blog Stats

- **Endpoint:** `/api/blog-stats`
- **Description:** Fetches data from the third-party blog API, performs analytics, and provides statistics.
- **Method:** GET
- **Example Request:** `http://localhost:3000/api/blog-stats`
- **Example Response:**
  ```json
  {
    "totalBlogs": 50,
    "longestTitle": "The Longest Blog Title Ever Written",
    "privacyBlogs": 10,
    "uniqueTitles": ["Blog 1", "Blog 2", ...]
  }
  ```

### 2. Blog Search

- **Endpoint:** `/api/blog-search`
- **Description:** Searches for blogs based on a provided query.
- **Method:** GET
- **Example Request:** `http://localhost:3000/api/blog-search?query=privacy`
- **Example Response:**
  ```json
  {
    "searchResults": [
      {"title": "Privacy Matters", ...},
      {"title": "The Importance of Privacy in Tech", ...},
      ...
    ]
  }
  ```

## Error Handling

The server handles errors gracefully and provides meaningful error messages. Common error scenarios include:

- Server errors (status code 500): Internal Server Error.
- Invalid or missing parameters (status code 400): Bad Request.

## Bonus Challenge - Caching

The project includes a bonus challenge implementing caching using Lodash's `memoize` function. This enhances performance by storing and reusing analytics and search results for a certain period.
