"use client";

import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getStoryblokApi } from "@storyblok/react/rsc";
import { fetchAllBlogs, fetchDataByTag } from "@/lib/services/storyblok";
import Pagination from "@/components/common/Pagination";
import { useIsLargeScreen } from "@/lib/hooks/screenSizeCheck";

// import { useBlogContext } from "@/lib/context/BlogContext";

interface Tag {
  name: string;
  taggings_count: number;
}

interface BlogListSectionProps {
  tags: Tag[];
}

const BlogListSection: React.FC<BlogListSectionProps> = ({ tags }) => {
  // const { setBlog } = useBlogContext();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [filteredBlogs, setFilteredBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [uniqueTags, setUniqueTags] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const tagParam = selectedTag
          ? `${encodeURIComponent(selectedTag)}`
          : "";

        const { data }: { data: any } = await fetchDataByTag(tagParam);
        
        setFilteredBlogs(data?.stories || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [selectedTag]);

 

//  useEffect(() => {
//   const handleFetchAllBlogsData = async () => {
//     const { data:fetchAllBlogsData }: { data: any } = await fetchAllBlogs();
//     console.log(fetchAllBlogsData?.stories?.map((item:any) => item.tag_list),"ALL BLOGS DATA")
  
//    }

//    handleFetchAllBlogsData()
// }, []);

useEffect(() => {
  const handleFetchAllBlogsData = async () => {
    const { data: fetchAllBlogsData }: { data: any } = await fetchAllBlogs();
    const allTags = fetchAllBlogsData?.stories?.flatMap((item: any) => item.tag_list) || [];
    const uniqueTagsSet = new Set(allTags);
    setUniqueTags(Array.from(uniqueTagsSet) as string[]);
  };

  handleFetchAllBlogsData();
}, []);
 
// console.log(uniqueTags,"uniquwe tags")
  const handleTagClick = (tag: string | null) => {
    setSelectedTag(tag);
    setCurrentPage(1)
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };



  const limit = useIsLargeScreen() ? 6 : 3;
  const totalPages = Math.ceil((filteredBlogs?.length || 0) / limit);
  const startIndex = (currentPage - 1) * limit;
  const currentBlogs = filteredBlogs.slice(startIndex, startIndex + limit);

  return (
    <section className="px-[5vw]">
      <ul className="hide-scrollbar1 my-[32px] flex gap-[8px] overflow-x-scroll md:overflow-hidden">
        <Link
          href="#"
          scroll={false}
          className={`blogFilterTag min-w-fit ${!selectedTag ? "bg-primary text-[#FAFAFA]" : "text-[#7C7C7C]"}`}
          onClick={() => handleTagClick(null)}
        >
          All
        </Link>
        {uniqueTags.map((tag) => (
          <Link
            scroll={false}
            key={tag}
            href="#"
            className={`blogFilterTag min-w-fit ${selectedTag === tag ? "bg-primary text-[#FAFAFA]" : "text-[#7C7C7C]"}`}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </Link>
        ))}
      </ul>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="mb-[80px] grid grid-cols-1 gap-x-[32px] gap-y-[24px] md:grid-cols-2 lg:grid-cols-3">
          {currentBlogs.length > 0 ? (
            currentBlogs.map((blog: any) => (
              <Link
                key={blog?._uid}
                href={`job-insights/${blog?.slug}`}
                className=""
              >
                <BlogCard key={blog.id} blog={blog} />
              </Link>
            ))
          ) : (
            <p>No blogs found for the selected category.</p>
          )}
        </div>
      )}

      <div className="my-[60px] md:my-[80px]">
        {filteredBlogs?.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            limit={limit}
            onPageChange={handlePageChange}
            totalItems={filteredBlogs?.length || 0}
          />
        )}
      </div>
    </section>
  );
};

export default BlogListSection;
