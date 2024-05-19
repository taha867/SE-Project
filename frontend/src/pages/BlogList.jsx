import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/blogs/')
      .then((response) => {
        console.log(response.data);
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error('Error fetching blogs:', error);
      });
  }, []);

  return (
    <div className="mt-10 container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Blog List</h1>
      {blogs.length === 0 ? (
        <p className="text-center text-gray-600">No blogs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <Link key={blog._id} to={`/blog/${blog._id}`}>
              <div
                className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 ${
                  index % 3 === 0 ? 'md:row-span-2' : ''
                }`}
              >
                <img
                  src={`https://source.unsplash.com/random/800x600?${index}`}
                  alt={blog.Title}
                  className="w-full h-48 md:h-64 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2">{blog.Title}</h2>
                  <p className="text-gray-600 mb-4">By {blog.authorName}</p>
                  <p className="text-gray-700 mb-4">{blog.description.slice(0, 100)}...</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                    <span className="text-sm text-gray-500">
                      {blog.readingTime} min read
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default BlogList;