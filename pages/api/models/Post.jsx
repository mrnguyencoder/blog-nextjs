const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;


import React from 'react';
import Post from './Post';

const Posts = ({ posts }) => {
  return (
    <ul>
      {posts.map(post => (
        <li key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </li>
      ))}
    </ul>
  );
};

export async function getServerSideProps() {
  const posts = await Post.find().sort({ date: -1 });

  return {
    props: {
      posts,
    },
  };
}

export default Posts;

