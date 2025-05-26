import React, { useState, useRef, useEffect } from "react";

interface TruncatedTextProps {
  text: string;
  maxLength: number;
}

const TruncatedText: React.FC<TruncatedTextProps> = ({ text, maxLength }) => {
  const [isTruncated, setIsTruncated] = useState(true);
  const [truncatedText, setTruncatedText] = useState("");
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (text.length > maxLength) {
      setTruncatedText(text.substring(0, maxLength) + "... ");
      setIsTruncated(true);
    } else {
      setTruncatedText(text);
      setIsTruncated(false);
    }
  }, [text, maxLength]);

  return (
    <div className="relative my-4">
      <span
        ref={textRef}
        className={`line-clamp-2 text-[14px] font-[400] text-gray-normal md:text-[16px] ${!isTruncated && "line-clamp-none"}`}
      >
        {isTruncated ? truncatedText : text}
      </span>
      {isTruncated && (
        <span className="absolute bottom-0 right-0 cursor-pointer bg-white pl-1 text-[14px] font-[700] text-primary md:text-[16px]">
          Read more...
        </span>
      )}
    </div>
  );
};

export default TruncatedText;
