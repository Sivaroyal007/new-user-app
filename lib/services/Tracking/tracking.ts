"use client";

export function getCanvasFingerprint() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return "";
  }
  ctx.textBaseline = "top";
  ctx.font = "16px Arial";
  ctx.fillStyle = "#000";
  ctx.fillText("Canvas Fingerprinting", 10, 50);
  ctx.fillRect(20, 70, 100, 50);
  return canvas.toDataURL();
}

export function collectFingerprint() {
  return {
    userAgent: navigator.userAgent,
    screenResolution: `${screen.width}x${screen.height}`,
    language: navigator.language,
    platform: (navigator as any).userAgentData?.platform || navigator.platform,
    canvas: getCanvasFingerprint(),
    ipAddress: "",
  };
}

export async function hashFingerprint(fingerprint: any) {
  const string = JSON.stringify(fingerprint);
  const encoder = new TextEncoder();
  const data = encoder.encode(string);

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function getFingerprintHash() {
  const fingerprint = collectFingerprint();
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    fingerprint.ipAddress = data.ip;
  } catch (e) {
    console.error("Error fetching IP address:", e);
  }
  return hashFingerprint(fingerprint);
}

export async function generateUserId() {

  const today = new Date().toISOString().split('T')[0];
  const lastVisitDate = localStorage.getItem('lastVisitDate');
  try {
    const userId = await getFingerprintHash();
    localStorage.setItem("userId", userId);
    return userId;
  } catch (error) {
    console.error("Error generating user ID:", error);
    return "";
  }
}

export async function getUserId() {
  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = await generateUserId();
  }
  return userId;
}



export async function trackPageVisit(pageType:string, jobId?:string) {
  console.log('trackPageVisit', pageType);

  const userId = await getUserId();
  const currentPageType = pageType;
  const currentJobId = jobId || '';

  const visitData = {
      userId,
      pageType: currentPageType,
      jobId: currentJobId,
  };

  // const now = Date.now();
  // const oneDayInMillis = 24 * 60 * 60 * 1000;

  const today = new Date().toISOString().split('T')[0];

  // const lastVisitTime = localStorage.getItem("lastVisitTime");
  const lastVisitDate = localStorage.getItem('lastVisitDate');
  let visitDataStored = JSON.parse(localStorage.getItem('visitData') || '[]');

  // Clear data if more than a day has passed
  // if (!lastVisitTime || (now - parseInt(lastVisitTime)) >= oneDayInMillis) {
  //     visitDataStored = [];
  //     localStorage.setItem('visitData', JSON.stringify(visitDataStored));
  //     localStorage.setItem('lastVisitTime', now.toString());
  // }

  if (lastVisitDate !== today) {
    visitDataStored = [];
    localStorage.setItem('visitData', JSON.stringify(visitDataStored));
    localStorage.setItem('lastVisitDate', today);
    localStorage.removeItem(`visitedJobIds_${userId}`); // Reset visited job IDs for the new day
  }

  
  const existingVisit = visitDataStored.find((visit:any) =>
      visit.userId === userId &&
      visit.pageType === pageType &&
      visit.jobId === currentJobId
  );

  if (existingVisit) {

      console.warn('Duplicate visit detected, skipping trackPageVisit.');
      return;
  }

  // If this is a 'job' page type, handle visitedJobIds to avoid tracking multiple visits
  if (currentPageType === 'job') {
      let visitedJobIds = JSON.parse(localStorage.getItem(`visitedJobIds_${userId}`) || '[]');

      if (visitedJobIds.includes(currentJobId)) {
          return;
      }

      visitedJobIds.push(currentJobId);
      localStorage.setItem(`visitedJobIds_${userId}`, JSON.stringify(visitedJobIds));
  }

  
  visitDataStored.push(visitData);
  localStorage.setItem('visitData', JSON.stringify(visitDataStored));

 
  await sendVisitData(visitData);
}

async function sendVisitData(data: any) {
  // console.log("fetching",data)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    const response = await fetch(` ${baseUrl}/analytics/add-analytics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Error sending visit data:", error);
  }
}
