const TARGET_DOMAIN = "https://dholeratimes.co.in/";
const TARGET_BASE_PATH = "/LandX-Beta";
const TARGET_URL = `${TARGET_DOMAIN}${TARGET_BASE_PATH}/dashboard.php`;
const BASE_URL = `${TARGET_DOMAIN}${TARGET_BASE_PATH.replace(/\/$/, "")}`;

function getCurrentApiRoute(req) {
  const url = new URL(req.url);
  const pathParts = url.pathname.split("/");
  const apiIndex = pathParts.indexOf("api");
  return apiIndex >= 0 && pathParts[apiIndex + 1]
    ? pathParts[apiIndex + 1]
    : "landx";
}

const commonHeaders = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
  "Accept-Encoding": "gzip, deflate, br",
  Connection: "keep-alive",
};

function forwardCookies(clientRequest, targetHeaders) {
  const cookies = clientRequest.headers.get("cookie");
  if (cookies) {
    targetHeaders["Cookie"] = cookies;
  }
}

function extractSetCookies(response) {
  const setCookieHeaders = [];
  const setCookieHeader = response.headers.get("set-cookie");
  if (setCookieHeader) {
    setCookieHeaders.push(...setCookieHeader.split(/\s*,\s*(?=[^;]+;)/));
  }
  if (typeof response.headers.raw === "function") {
    setCookieHeaders.push(...(response.headers.raw()["set-cookie"] || []));
  }
  return setCookieHeaders;
}

function isUploadedFileRequest(path) {
  const decodedPath = decodeURIComponent(path);
  return decodedPath.includes("uploads/pdfs/");
}

function constructTargetUrl(path) {
  const decodedPath = decodeURIComponent(path);

  if (!decodedPath || decodedPath === "/") {
    return TARGET_URL;
  }

  const cleanPath = decodedPath.startsWith("/")
    ? decodedPath.slice(1)
    : decodedPath;

  // Handle uploads - construct full path
  if (cleanPath.includes("uploads/")) {
    return `${TARGET_DOMAIN}${TARGET_BASE_PATH}/${cleanPath}`;
  }

  if (cleanPath.includes("generate_pdf.php")) {
    return `${BASE_URL}/${cleanPath}`;
  }

  if (cleanPath === "favicon.ico") {
    return `${TARGET_DOMAIN}/favicon.ico`;
  }

  if (cleanPath.endsWith(".php")) {
    return `${BASE_URL}/${cleanPath}`;
  }

  return `${BASE_URL}/${cleanPath}`;
}

// HTML modifier with enhanced upload handling
function modifyHtmlContent(html, currentPath = "", apiRoute = "landx") {
  currentPath = currentPath.replace(/\/+$/, "");

  console.log(`[HTML] Processing for path: ${currentPath}, route: ${apiRoute}`);

  let modifiedHtml = html;

  // Fix href attributes
  modifiedHtml = modifiedHtml.replace(
    /href=["']([^"']*?)["']/gi,
    (match, href) => {
      if (
        href.startsWith("http") ||
        href.startsWith("//") ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("javascript:") ||
        href.startsWith("/api/")
      ) {
        return match;
      }

      if (href.includes("uploads/")) {
        const cleanHref = href.startsWith("/") ? href.slice(1) : href;
        const newHref = `/api/${apiRoute}?path=${encodeURIComponent(cleanHref)}`;
        return `href="${newHref}"`;
      }

      const cleanHref = href.startsWith("/") ? href.slice(1) : href;
      const newHref = `/api/${apiRoute}?path=${encodeURIComponent(cleanHref)}`;
      return `href="${newHref}"`;
    }
  );

  // Fix src attributes for images, scripts, etc.
  modifiedHtml = modifiedHtml.replace(
    /src=["']([^"']*?)["']/g,
    (match, src) => {
      if (
        src.startsWith("http") ||
        src.startsWith("data:") ||
        src.startsWith("//") ||
        src.startsWith("/api/")
      ) {
        return match;
      }

      // Route uploads through proxy
      if (src.includes("uploads/")) {
        const cleanSrc = src.startsWith("/") ? src.slice(1) : src;
        const newSrc = `/api/${apiRoute}?path=${encodeURIComponent(cleanSrc)}`;
        return `src="${newSrc}"`;
      }

      // Direct reference for other assets
      const cleanSrc = src.startsWith("/") ? src.slice(1) : src;
      return `src="${BASE_URL}/${cleanSrc}"`;
    }
  );

  // Fix form actions
  modifiedHtml = modifiedHtml.replace(
    /<form([^>]*?)action=["']([^"']*?)["']/gi,
    (match, formAttrs, action) => {
      if (action.startsWith("http") || action.startsWith("/api/")) {
        return match;
      }

      if (!action || action.trim() === "") {
        const newAction = `/api/${apiRoute}?path=${encodeURIComponent(currentPath || "dashboard.php")}`;
        return `<form${formAttrs}action="${newAction}"`;
      }

      const cleanAction = action.startsWith("/") ? action.slice(1) : action;
      const newAction = `/api/${apiRoute}?path=${encodeURIComponent(cleanAction)}`;
      return `<form${formAttrs}action="${newAction}"`;
    }
  );

  // Fix forms without action
  modifiedHtml = modifiedHtml.replace(
    /<form([^>]*?)>/gi,
    (match, formAttrs) => {
      if (formAttrs.includes("action=")) {
        return match;
      }
      const newAction = `/api/${apiRoute}?path=${encodeURIComponent(currentPath || "dashboard.php")}`;
      return `<form${formAttrs} action="${newAction}">`;
    }
  );

  // Fix CSS background images
  modifiedHtml = modifiedHtml.replace(
    /url\(["']?([^"')]*?)["']?\)/g,
    (match, url) => {
      if (
        url.startsWith("http") ||
        url.startsWith("data:") ||
        url.startsWith("//")
      ) {
        return match;
      }

      if (url.includes("uploads/")) {
        const cleanUrl = url.startsWith("/") ? url.slice(1) : url;
        return `url("/api/${apiRoute}?path=${encodeURIComponent(cleanUrl)}")`;
      }

      const cleanUrl = url.startsWith("/") ? url.slice(1) : url;
      return `url("${BASE_URL}/${cleanUrl}")`;
    }
  );

  // Fix AJAX calls
  modifiedHtml = modifiedHtml.replace(
    /(fetch|axios|jQuery\.ajax|XMLHttpRequest|\.post|\.get)\s*\(\s*["']([^"']*?)["']/g,
    (match, method, url) => {
      if (
        url.startsWith("http") ||
        url.startsWith("//") ||
        url.startsWith("/api/")
      ) {
        return match;
      }

      if (url.includes(".php")) {
        const cleanUrl = url.startsWith("/") ? url.slice(1) : url;
        const newUrl = `/api/${apiRoute}?path=${encodeURIComponent(cleanUrl)}`;
        return `${method}("${newUrl}"`;
      }

      return match;
    }
  );

  // Enhanced dynamic content interceptor
  const interceptorScript = `
<script>
(function() {
  'use strict';
  
  const API_ROUTE = '${apiRoute}';
  
  function fixUploadUrl(url) {
    if (!url || url.startsWith('http') || url.startsWith('data:') || 
        url.startsWith('//') || url.includes('/api/')) {
      return url;
    }
    
    if (url.includes('uploads/')) {
      const cleanUrl = url.startsWith('/') ? url.slice(1) : url;
      return '/api/' + API_ROUTE + '?path=' + encodeURIComponent(cleanUrl);
    }
    
    return url;
  }
  
  // Intercept dynamic content
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(node) {
        if (node.nodeType === 1) {
          // Fix images
          if (node.tagName === 'IMG' && node.src) {
            const fixedSrc = fixUploadUrl(node.src);
            if (fixedSrc !== node.src) {
              node.src = fixedSrc;
            }
          }
          
          // Fix links
          if (node.tagName === 'A' && node.href) {
            const fixedHref = fixUploadUrl(node.getAttribute('href'));
            if (fixedHref !== node.getAttribute('href')) {
              node.href = fixedHref;
            }
          }
          
          // Fix nested elements
          const images = node.querySelectorAll ? node.querySelectorAll('img[src*="uploads/"]') : [];
          images.forEach(function(img) {
            img.src = fixUploadUrl(img.src);
          });
          
          const links = node.querySelectorAll ? node.querySelectorAll('a[href*="uploads/"]') : [];
          links.forEach(function(link) {
            link.href = fixUploadUrl(link.getAttribute('href'));
          });
        }
      });
    });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src', 'href']
    });
  });
})();
</script>`;

  // Insert interceptor
  if (modifiedHtml.includes("</head>")) {
    modifiedHtml = modifiedHtml.replace(
      "</head>",
      interceptorScript + "\n</head>"
    );
  } else if (modifiedHtml.includes("<body")) {
    modifiedHtml = modifiedHtml.replace(
      /<body([^>]*)>/,
      "<body$1>" + interceptorScript
    );
  }

  return modifiedHtml;
}

// UNIFIED FILE HANDLER - handles all file types
async function handleFileRequest(requestedPath, req) {
  console.log(`[FILE] Request: ${requestedPath}`);

  try {
    const decodedPath = decodeURIComponent(requestedPath);

    if (!decodedPath.includes("uploads/")) {
      console.log("[FILE] Not an uploads request");
      return new Response("Not a valid file request", { status: 400 });
    }

    // Extract file path after 'uploads/'
    const uploadsIndex = decodedPath.indexOf("uploads/");
    const filePath = decodedPath.substring(uploadsIndex + 8); // 'uploads/'.length = 8

    if (!filePath || filePath.trim() === "") {
      console.log("[FILE] Empty file path");
      return new Response("No file path found", { status: 400 });
    }

    const targetUrl = `${TARGET_DOMAIN}${TARGET_BASE_PATH}/uploads/${filePath}`;
    console.log(`[FILE] Fetching: ${targetUrl}`);

    const targetHeaders = {
      "User-Agent": commonHeaders["User-Agent"],
      Accept: "*/*",
      "Cache-Control": "no-cache",
      Referer: `${TARGET_DOMAIN}${TARGET_BASE_PATH}/dashboard.php`,
    };

    // Forward cookies for authentication
    const cookieHeader = req.headers.get("cookie");
    if (cookieHeader) {
      targetHeaders["Cookie"] = cookieHeader;
    }

    const fileResponse = await fetch(targetUrl, {
      headers: targetHeaders,
      redirect: "follow",
    });

    console.log(`[FILE] Status: ${fileResponse.status}`);

    if (!fileResponse.ok) {
      if (fileResponse.status === 404) {
        return new Response("File not found", { status: 404 });
      } else if (fileResponse.status === 403 || fileResponse.status === 401) {
        return new Response("Authentication required", { status: 401 });
      }
      return new Response(`Server error: ${fileResponse.status}`, {
        status: fileResponse.status,
      });
    }

    const fileBuffer = await fileResponse.arrayBuffer();
    console.log(`[FILE] Size: ${fileBuffer.byteLength} bytes`);

    if (fileBuffer.byteLength === 0) {
      return new Response("File is empty", { status: 500 });
    }

    // Detect content type
    let contentType = fileResponse.headers.get("content-type");
    const filename = filePath.split("/").pop() || "file";
    const ext = filename.toLowerCase().split(".").pop();

    // Magic byte detection if content-type is generic
    if (
      !contentType ||
      contentType === "application/octet-stream" ||
      contentType === "text/plain"
    ) {
      const firstBytes = new Uint8Array(fileBuffer.slice(0, 8));

      // Check magic bytes
      if (
        firstBytes[0] === 0xff &&
        firstBytes[1] === 0xd8 &&
        firstBytes[2] === 0xff
      ) {
        contentType = "image/jpeg";
      } else if (
        firstBytes[0] === 0x89 &&
        firstBytes[1] === 0x50 &&
        firstBytes[2] === 0x4e &&
        firstBytes[3] === 0x47
      ) {
        contentType = "image/png";
      } else if (
        firstBytes[0] === 0x47 &&
        firstBytes[1] === 0x49 &&
        firstBytes[2] === 0x46
      ) {
        contentType = "image/gif";
      } else if (
        firstBytes[0] === 0x52 &&
        firstBytes[1] === 0x49 &&
        firstBytes[2] === 0x46 &&
        firstBytes[3] === 0x46
      ) {
        contentType = "image/webp";
      } else if (
        firstBytes[0] === 0x25 &&
        firstBytes[1] === 0x50 &&
        firstBytes[2] === 0x44 &&
        firstBytes[3] === 0x46
      ) {
        contentType = "application/pdf";
      } else {
        // Fallback to extension
        const mimeMap = {
          jpg: "image/jpeg",
          jpeg: "image/jpeg",
          png: "image/png",
          gif: "image/gif",
          webp: "image/webp",
          svg: "image/svg+xml",
          pdf: "application/pdf",
          txt: "text/plain",
          html: "text/html",
        };
        contentType = mimeMap[ext] || "application/octet-stream";
      }
    }

    // Check if we received HTML instead of file (auth issue)
    if (contentType.includes("text/html")) {
      const textContent = new TextDecoder().decode(fileBuffer.slice(0, 500));
      if (
        textContent.includes("<!DOCTYPE") ||
        textContent.includes("<html") ||
        textContent.includes("login")
      ) {
        return new Response("Authentication required", { status: 401 });
      }
    }

    console.log(`[FILE] Serving ${contentType}: ${filename}`);

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": fileBuffer.byteLength.toString(),
        "Content-Disposition": `inline; filename="${filename}"`,
        "Cache-Control": "public, max-age=86400",
        "Access-Control-Allow-Origin": "*",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("[FILE] Error:", error);
    return new Response(`File error: ${error.message}`, { status: 500 });
  }
}

// PDF generation handler
async function handlePdfGenerationRequest(requestedPath, req) {
  console.log(`[PDF-GEN] Request: ${requestedPath}`);

  try {
    const decodedPath = decodeURIComponent(requestedPath);

    // Improved regex to capture both file types and query strings
    const generatePdfMatch = decodedPath.match(
      /(generate_pdf(?:_non_brand|_filtered)?|generate_pdf_filtered)\.php(\?.*)?$/i
    );

    if (!generatePdfMatch) {
      return new Response("Invalid PDF generation path", { status: 400 });
    }

    const pdfFileName = generatePdfMatch[1] + ".php";
    const queryString = generatePdfMatch[2] || "";
    const targetUrl = `${BASE_URL}/${pdfFileName}${queryString}`;

    console.log(`[PDF-GEN] Generating from: ${targetUrl}`);

    // Enhanced headers for PDF generation
    const targetHeaders = {
      "User-Agent": commonHeaders["User-Agent"],
      Accept: "application/pdf, */*",
      "Accept-Language": "en-US,en;q=0.9",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Referer: `${TARGET_DOMAIN}${TARGET_BASE_PATH}/dashboard.php`,
      Origin: TARGET_DOMAIN,
    };

    // Forward cookies and potentially other headers
    forwardCookies(req, targetHeaders);

    // Add timeout and better error handling for fetch
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const pdfResponse = await fetch(targetUrl, {
      headers: targetHeaders,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!pdfResponse.ok) {
      const errorText = await pdfResponse.text();
      console.error(
        `[PDF-GEN] Server error ${pdfResponse.status}:`,
        errorText.substring(0, 500)
      );
      return new Response(
        `PDF generation failed: ${pdfResponse.status} ${pdfResponse.statusText}`,
        {
          status: pdfResponse.status,
        }
      );
    }

    // Validate that we actually got a PDF
    const contentType = pdfResponse.headers.get("content-type");
    if (!contentType || !contentType.includes("application/pdf")) {
      const bodyPreview = await pdfResponse.text();
      console.error(
        "[PDF-GEN] Response is not PDF:",
        bodyPreview.substring(0, 500)
      );
      return new Response("Server did not return a PDF", { status: 500 });
    }

    const pdfBuffer = await pdfResponse.arrayBuffer();

    // Extract filename from server response OR generate one based on parameters
    let filename = "document.pdf";

    // Option 1: Check server's Content-Disposition header
    const serverDisposition = pdfResponse.headers.get("content-disposition");
    if (serverDisposition && serverDisposition.includes("filename=")) {
      const match = serverDisposition.match(/filename\s*=\s*"?(.+?)"?$/);
      if (match && match[1]) {
        filename = match[1];
        console.log(`[PDF-GEN] Using server filename: ${filename}`);
      }
    }

    // Option 2: Generate filename based on query parameters
    if (filename === "document.pdf") {
      // Try to extract from query parameters
      const urlObj = new URL(targetUrl);
      const searchParams = urlObj.searchParams;

      // Common parameter names that might contain filename info
      const possibleFilenameParams = [
        "filename",
        "file_name",
        "name",
        "title",
        "report_name",
      ];
      for (const param of possibleFilenameParams) {
        if (searchParams.has(param)) {
          const paramValue = searchParams.get(param);
          filename = paramValue.endsWith(".pdf")
            ? paramValue
            : `${paramValue}.pdf`;
          console.log(`[PDF-GEN] Using parameter filename: ${filename}`);
          break;
        }
      }

      // Option 3: Generate based on date/time
      if (filename === "document.pdf") {
        const now = new Date();
        const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
        const timeStr = now.toTimeString().slice(0, 8).replace(/:/g, "");
        filename = `report_${dateStr}_${timeStr}.pdf`;
        console.log(`[PDF-GEN] Using generated filename: ${filename}`);
      }
    }

    // Enhanced response headers
    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${filename}"`,
        "Content-Length": pdfBuffer.byteLength.toString(),
        "Cache-Control": "no-store, no-cache, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        "X-Content-Type-Options": "nosniff",
        // Forward server's filename if available
        ...(serverDisposition ? {} : {}),
      },
    });
  } catch (error) {
    console.error("[PDF-GEN] Error:", error);

    if (error.name === "AbortError") {
      return new Response("PDF generation timeout", { status: 504 });
    }

    return new Response(`PDF generation error: ${error.message}`, {
      status: 500,
    });
  }
}

// MAIN REQUEST HANDLER
async function handleRequest(req, method = "GET") {
  try {
    const url = new URL(req.url);
    const { searchParams } = url;
    let requestedPath = searchParams.get("path") || "";

    // If no path param, try to extract from URL pathname
    if (!requestedPath) {
      const pathname = url.pathname;
      const landxBetaMatch = pathname.match(/\/LandX-Beta\/(.+)/);
      if (landxBetaMatch) {
        requestedPath = landxBetaMatch[1];
      } else {
        requestedPath = "dashboard.php"; // Default fallback
      }
    }

    // IMPORTANT: Add all other query params to the path
    // Remove 'path' param and append rest to requestedPath
    const otherParams = new URLSearchParams();
    for (const [key, value] of searchParams.entries()) {
      if (key !== "path") {
        otherParams.append(key, value);
      }
    }

    // If there are other params, append them to requestedPath
    if (otherParams.toString()) {
      const separator = requestedPath.includes("?") ? "&" : "?";
      requestedPath = requestedPath + separator + otherParams.toString();
    }

    console.log(`\n[${method}] Final Path: ${requestedPath}`);

    // ROUTING PRIORITY:
    // 1. File uploads (GET only)
    if (
      method === "GET" &&
      requestedPath &&
      isUploadedFileRequest(requestedPath)
    ) {
      return await handleFileRequest(requestedPath, req);
    }

    // 2. PDF generation (GET only)
    if (
      method === "GET" &&
      requestedPath &&
      requestedPath.includes("generate_pdf.php")
    ) {
      return await handlePdfGenerationRequest(requestedPath, req);
    }

    if (
      method === "GET" &&
      requestedPath &&
      requestedPath.includes("generate_pdf_non_brand.php")
    ) {
      return await handlePdfGenerationRequest(requestedPath, req);
    }

    if (
      method === "GET" &&
      requestedPath &&
      requestedPath.includes("generate_pdf_filtered.php")
    ) {
      return await handlePdfGenerationRequest(requestedPath, req);
    }

    // 3. All other requests (PHP pages, form submissions, etc.)
    const targetUrl = constructTargetUrl(requestedPath);
    const targetHeaders = { ...commonHeaders };

    forwardCookies(req, targetHeaders);

    const currentRoute = getCurrentApiRoute(req);
    targetHeaders.Referer = `${TARGET_DOMAIN}${TARGET_BASE_PATH}/dashboard.php`;
    targetHeaders.Origin = TARGET_DOMAIN;

    if (method !== "GET") {
      targetHeaders["X-Requested-With"] = "XMLHttpRequest";
    }

    const fetchOptions = {
      method,
      headers: targetHeaders,
      redirect: "manual",
    };

    // Handle request body for POST/PUT/DELETE
    // try using images reagrding content header
    if (method !== "GET" && method !== "HEAD") {
      const contentType = req.headers.get("content-type") || "";

      if (contentType.includes("multipart/form-data")) {
        console.log(`[${method}] Multipart form (file upload)`);
        const formData = await req.formData();
        fetchOptions.body = formData;
        // Don't set Content-Type - let fetch set it with boundary
        delete targetHeaders["Content-Type"];
      } else if (contentType.includes("application/json")) {
        console.log(`[${method}] JSON data`);
        fetchOptions.body = await req.text();
        targetHeaders["Content-Type"] = "application/json";
      } else {
        console.log(`[${method}] Form data`);
        fetchOptions.body = await req.text();
        targetHeaders["Content-Type"] =
          contentType || "application/x-www-form-urlencoded";
      }
    }

    console.log(`[${method}] Fetching: ${targetUrl}`);
    const response = await fetch(targetUrl, fetchOptions);
    console.log(`[${method}] Response: ${response.status}`);

    // Handle redirects
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (location) {
        let redirectPath = location;
        if (location.startsWith("http")) {
          const url = new URL(location);
          if (url.hostname === new URL(TARGET_DOMAIN).hostname) {
            redirectPath = url.pathname + url.search;
          } else {
            return new Response(null, {
              status: response.status,
              headers: { Location: location },
            });
          }
        }
        return new Response(null, {
          status: 302,
          headers: {
            Location: `/api/${currentRoute}?path=${encodeURIComponent(redirectPath)}`,
            ...Object.fromEntries(
              extractSetCookies(response).map((cookie) => [
                "Set-Cookie",
                cookie,
              ])
            ),
          },
        });
      }
    }

    const contentType = response.headers.get("content-type") || "";
    const responseText = await response.text();

    // Handle JSON responses
    if (contentType.includes("application/json")) {
      return new Response(responseText, {
        status: response.status,
        headers: {
          "Content-Type": "application/json",
          ...Object.fromEntries(
            extractSetCookies(response).map((cookie) => ["Set-Cookie", cookie])
          ),
        },
      });
    }

    // Handle HTML responses
    if (contentType.includes("text/html")) {
      const modifiedHtml = modifyHtmlContent(
        responseText,
        requestedPath,
        currentRoute
      );
      return new Response(modifiedHtml, {
        status: response.status,
        headers: {
          "Content-Type": "text/html",
          ...Object.fromEntries(
            extractSetCookies(response).map((cookie) => ["Set-Cookie", cookie])
          ),
        },
      });
    }

    // Handle other responses
    return new Response(responseText, {
      status: response.status,
      headers: {
        "Content-Type": contentType || "text/plain",
        ...Object.fromEntries(
          extractSetCookies(response).map((cookie) => ["Set-Cookie", cookie])
        ),
      },
    });
  } catch (error) {
    console.error(`[ERROR] ${method}:`, error);
    return new Response(`Proxy Error: ${error.message}`, { status: 500 });
  }
}

// Export HTTP methods
export async function OPTIONS(req) {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, Cookie",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}

export async function GET(req) {
  return handleRequest(req, "GET");
}

export async function POST(req) {
  return handleRequest(req, "POST");
}

export async function PUT(req) {
  return handleRequest(req, "PUT");
}

export async function DELETE(req) {
  return handleRequest(req, "DELETE");
}
