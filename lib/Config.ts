export const capitalizeFirstLetterOfEveryWord = (str: any) => {
  if (typeof str !== "string") {
    return str;
  }

  return str.replace(/\b\w/g, (char: string) => char.toUpperCase());
};

// convert base64 to normal string
export const decodeBase64 = (base64String: string) => {
  try {
    if (!base64String) {
      return "";
    }
    return decodeURIComponent(
      atob(base64String)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(""),
    );
  } catch (e) {
    console.log("fhdskfh", base64String);
    console.error("Failed to decode base64 string", e);
    return "";
  }
};

// calculate time in different formats using current time and created time
export const timeDifference = (createdAt: any) => {
  const createdDate: any = new Date(createdAt);
  const now: any = new Date();
  const diffInSeconds = Math.floor((now - createdDate) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    return `Posted ${diffInSeconds} ${diffInSeconds === 1 ? "second" : "seconds"} ago`;
  } else if (diffInMinutes < 60) {
    return `Posted ${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`;
  } else if (diffInHours < 24) {
    return `Posted ${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
  } else {
    return `Posted ${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
  }
};

// date formats
// export const formatDate = (dateString: string): string => {
//   const date = new Date(dateString);
//   return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
// };

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    // Handle invalid date
    return "Invalid Date";
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

// format currency
export const formatCurrency = (value: any): string => {
  const stringValue = String(value);

  const numericValue = parseFloat(stringValue.replace(/[^0-9.]/g, ""));

  if (isNaN(numericValue)) {
    return "Invalid Amount";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericValue);
};

// 2024-06-30 to Feb 12, 2024
export const formatForDate = (dateString: any) => {
  if (!dateString) return ""; // Handle empty or undefined input gracefully

  const date = new Date(dateString);
  if (!isValidDate(date)) return ""; // Ensure date is valid

  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

function isValidDate(date: Date) {
  return date instanceof Date && !isNaN(date.getTime());
}


// round to nearest 0.5 value
export const roundToHalf = (value: any): number => {
  return Math.round(value * 2) / 2;
};

// date string for user blogexport const formatDateForBlog = (dateString: any) => {
  export const formatDateForBlog = (dateStrings:any) => {
    // const dateString = 	"2024-07-30T07:11:25.111Z"; // Example valid date string
    

    const date = new Date(dateStrings);
    if (!isValidDate(date)) return "";
  
    if (isNaN(date.getTime())) { // Check if the date is invalid
      throw new Error('Invalid date');
    }
  
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };
  
  