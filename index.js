const express = require('express');
const axios = require('axios');
const _ = require('lodash');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const hasuraAdminSecret = process.env.HASURA_ADMIN_SECRET;

// route for getting all blogs
app.get('/api/blogs', _.memoize(async (req, res) => {
    try {
        const response = await axios.get('https://intent-kit-16.hasura.app/api/rest/blogs', {
            headers: {
                'x-hasura-admin-secret': hasuraAdminSecret,
            },
        });

        const blogs = response.data;
        res.status(200).json(blogs.blogs)
    } catch (error) {
        //Error Handling
        res.status(500).json(error)
    }
}))

// route for getting blog stats
app.get('/api/blog-stats', _.memoize(async (req, res) => {
    try {
        const response = await axios.get('https://intent-kit-16.hasura.app/api/rest/blogs', {
            headers: {
                'x-hasura-admin-secret': hasuraAdminSecret,
            },
        });

        const blogs = response.data;

        const totalBlogs = blogs.blogs.length;

        // Find the blog with the longest title
        const longestTitleBlog = _.maxBy(blogs.blogs, blog => blog.title.length);;

        // Determine the number of blogs with titles containing the word "privacy"
        const privacyBlogs = _.filter(blogs.blogs, (blog) => _.includes(_.toLower(blog.title), 'privacy'));

        // Create an array of unique blog titles (no duplicates)
        const uniqueTitles = _.uniqBy(blogs.blogs, 'title');

        res.json({
            totalBlogs,
            longestTitle: longestTitleBlog.title,
            privacyBlogs: privacyBlogs.length,
            uniqueTitles: uniqueTitles.map(blog => blog.title),
        });
    } catch (error) {
        //Errors handling
        console.error('Error fetching blog analytics:', error.message);
        res.status(500).json({ error: 'Internal Server Error', message: 'Error fetching the blog analytics' });
    }
}));

// route for blog search
app.get('/api/blog-search', _.memoize(async (req, res) => {

    const query = req.query.query;

    if (!query || typeof query !== 'string') {
        return res.status(400).json({ error: 'Bad Request', message: 'Invalid or missing search query parameter.' });
    }

    try {
        const response = await axios.get('https://intent-kit-16.hasura.app/api/rest/blogs', {
            headers: {
                'x-hasura-admin-secret': hasuraAdminSecret,
            },
        });

        const blogs = response.data;
        // Filter blogs based on the query (case-insensitive)
        const searchResults = _.filter(blogs.blogs, (blog) => _.includes(_.toLower(blog.title), _.toLower(query)));

        if (searchResults.length === 0) {
            res.json({ message: 'No blogs found with the specified keyword.' });
        } else {
            res.json({ searchResults });
        }

    } catch (error) {
        // Error handling
        console.error(`Error fetching the keyword ${req.query.query}: ${error.message}`);
        res.status(500).json({
            error: 'Internal Server Error',
            message: `Error fetching the keyword ${query}: ${error.message}`,
        });
    }

}));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
