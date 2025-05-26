"use client";

import React, { createContext, useState, ReactNode, useContext } from "react";

// Define the structure of a single blog object
type Blog = any;

// Define the context type
type BlogContextType = {
  blog: Blog | null; // Single blog object or null if no blog is selected
  setBlog: React.Dispatch<React.SetStateAction<Blog | null>>; // Function to update the blog
};

// Create the context with a default value of undefined
const BlogContext = createContext<BlogContextType | undefined>(undefined);

// Provider component to wrap around parts of your application that need access to the blog context
export const BlogProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [blog, setBlog] = useState<Blog | null>(null); // Initial state is null

  return (
    <BlogContext.Provider value={{ blog, setBlog }}>
      {children}
    </BlogContext.Provider>
  );
};

// Custom hook to use the blog context
export const useBlogContext = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error("useBlogContext must be used within a BlogProvider");
  }
  return context;
};
