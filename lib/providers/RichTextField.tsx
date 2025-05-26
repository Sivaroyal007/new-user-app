import React, { useEffect } from 'react';
import StoryblokClient from 'storyblok-js-client';

let Storyblok = new StoryblokClient({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN, 
});

// Function to create markup for rich text
function createMarkup(storyblokHTML: any) {
  if (!storyblokHTML) {
    return { __html: '' }; // Return empty HTML if storyblokHTML is undefined
  }
  return {
    __html: Storyblok.richTextResolver.render(storyblokHTML),
  };
}


type RichTextFieldProps = any;

// RichTextField component
const RichTextField = ({ data }: RichTextFieldProps) => {

  useEffect(() => {
    // Find all links and set their target to _blank
    const links = document.querySelectorAll('.rich-text-content a');
    links.forEach((link) => {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer'); 
    });
  }, [data]);
  
  // console.log('RichTextField data:', data);

  
  if (!data) {
    return <p>No content available.</p>; 
  }

  return (
    <div className={`rich-text-content`} dangerouslySetInnerHTML={createMarkup(data?.Content)} />
  );
};

export default RichTextField;
