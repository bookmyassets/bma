const TARGET_DOMAIN = "https://dholeratimes.co.in/";
const TARGET_BASE_PATH = "/LandX-Beta";
const TARGET_URL = `${TARGET_DOMAIN}${TARGET_BASE_PATH}/dashboard.php`;
const BASE_URL = `${TARGET_DOMAIN}${TARGET_BASE_PATH.replace(/\/$/, '')}`;

function getCurrentApiRoute(req) {
  const url = new URL(req.url);
  const pathParts = url.pathname.split('/');
  const apiIndex = pathParts.indexOf('api');
  return apiIndex >= 0 && pathParts[apiIndex + 1] ? pathParts[apiIndex + 1] : 'landx';
}

const commonHeaders = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
  "Accept-Encoding": "gzip, deflate, br",
  Connection: "keep-alive",
  "Upgrade-Insecure-Requests": "1",
};

function forwardCookies(clientRequest, targetHeaders) {
  const cookies = clientRequest.headers.get("cookie");
  if (cookies) {
    targetHeaders["Cookie"] = cookies;
  }
}

function extractSetCookies(response) {
  const setCookieHeaders = [];
  const setCookieHeader = response.headers.get('set-cookie');
  if (setCookieHeader) {
    setCookieHeaders.push(...setCookieHeader.split(/\s*,\s*(?=[^;]+;)/));
  }
  if (typeof response.headers.raw === 'function') {
    setCookieHeaders.push(...(response.headers.raw()['set-cookie'] || []));
  }
  return setCookieHeaders;
}

// Enhanced file type detection
function getFileType(path) {
  const decodedPath = decodeURIComponent(path);
  const filename = decodedPath.split('/').pop() || '';
  const ext = filename.toLowerCase().split('.').pop();
  
  if (ext === 'pdf') return 'pdf';
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'].includes(ext)) return 'image';
  if (['php', 'html'].includes(ext)) return 'page';
  return 'other';
}

function isUploadedFileRequest(path) {
  const decodedPath = decodeURIComponent(path);
  return decodedPath.includes('uploads/');
}

function constructTargetUrl(path) {
  const decodedPath = decodeURIComponent(path);
  
  if (!decodedPath || decodedPath === '/') {
    return TARGET_URL;
  }

  const cleanPath = decodedPath.startsWith('/') ? decodedPath.slice(1) : decodedPath;

  if (cleanPath.includes('uploads/')) {
    return `${TARGET_DOMAIN}${TARGET_BASE_PATH}/${cleanPath}`;
  }

  if (cleanPath.includes('generate_pdf.php')) {
    return `${BASE_URL}/${cleanPath}`;
  }

  if (cleanPath === 'favicon.ico') {
    return `${TARGET_DOMAIN}/favicon.ico`;
  }

  if (cleanPath.endsWith('.php')) {
    return `${BASE_URL}/${cleanPath}`;
  }

  return `${BASE_URL}/${cleanPath}`;
}

// HTML modifier - UNCHANGED
// Enhanced HTML modifier - FIX FILE URLS
function modifyHtmlContent(html, currentPath = "", apiRoute = "landx") {
  currentPath = currentPath.replace(/\/+$/, '');
  
  console.log(`[HTML Modifier] Processing HTML for path: ${currentPath}, route: ${apiRoute}`);

  let modifiedHtml = html;

  // CRITICAL FIX: Fix ALL href attributes for uploads
  modifiedHtml = modifiedHtml.replace(/href=["']([^"']*?)["']/gi, (match, href) => {
    if (href.startsWith('http') || href.startsWith('//') || 
        href.startsWith('#') || href.startsWith('mailto:') || 
        href.startsWith('javascript:') || href.startsWith('/api/')) {
      return match;
    }
    
    // SPECIAL HANDLING: If it's an uploads file, ensure it goes through landx API
    if (href.includes('uploads/')) {
      const cleanHref = href.startsWith('/') ? href.slice(1) : href;
      const newHref = `/api/${apiRoute}?path=${encodeURIComponent(cleanHref)}`;
      console.log(`[HREF-UPLOAD] ${href} → ${newHref}`);
      return `href="${newHref}"`;
    }
    
    const cleanHref = href.startsWith('/') ? href.slice(1) : href;
    const newHref = `/api/${apiRoute}?path=${encodeURIComponent(cleanHref)}`;
    console.log(`[HREF] ${href} → ${newHref}`);
    return `href="${newHref}"`;
  });

  // CRITICAL FIX: Fix ALL src attributes for uploads (images, etc.)
  modifiedHtml = modifiedHtml.replace(/src=["']([^"']*?)["']/g, (match, src) => {
    if (src.startsWith('http') || src.startsWith('data:') || src.startsWith('//') || src.startsWith('/api/')) {
      return match;
    }
    
    // SPECIAL HANDLING: If it's an uploads file, ensure it goes through landx API
    if (src.includes('uploads/')) {
      const cleanSrc = src.startsWith('/') ? src.slice(1) : src;
      const newSrc = `/api/${apiRoute}?path=${encodeURIComponent(cleanSrc)}`;
      console.log(`[SRC-UPLOAD] ${src} → ${newSrc}`);
      return `src="${newSrc}"`;
    }
    
    const cleanSrc = src.startsWith('/') ? src.slice(1) : src;
    return `src="${BASE_URL}/${cleanSrc}"`;
  });

  // Fix form actions
  modifiedHtml = modifiedHtml.replace(/<form([^>]*?)action=["']([^"']*?)["']/gi, (match, formAttrs, action) => {
    if (action.startsWith('http') || action.startsWith('/api/')) {
      return match;
    }
    
    if (!action || action.trim() === '') {
      const newAction = `/api/${apiRoute}?path=${encodeURIComponent(currentPath || 'dashboard.php')}`;
      console.log(`[FORM] Empty action → ${newAction}`);
      return `<form${formAttrs}action="${newAction}"`;
    }
    
    const cleanAction = action.startsWith('/') ? action.slice(1) : action;
    const newAction = `/api/${apiRoute}?path=${encodeURIComponent(cleanAction)}`;
    console.log(`[FORM] ${action} → ${newAction}`);
    return `<form${formAttrs}action="${newAction}"`;
  });

  // Fix forms without action
  modifiedHtml = modifiedHtml.replace(/<form([^>]*?)>/gi, (match, formAttrs) => {
    if (formAttrs.includes('action=')) {
      return match;
    }
    const newAction = `/api/${apiRoute}?path=${encodeURIComponent(currentPath || 'dashboard.php')}`;
    console.log(`[FORM-NO-ACTION] Adding action → ${newAction}`);
    return `<form${formAttrs} action="${newAction}">`;
  });

  // Fix CSS background images
  modifiedHtml = modifiedHtml.replace(/url\(["']?([^"')]*?)["']?\)/g, (match, url) => {
    if (url.startsWith('http') || url.startsWith('data:') || url.startsWith('//')) {
      return match;
    }
    
    if (url.includes('uploads/')) {
      const cleanUrl = url.startsWith('/') ? url.slice(1) : url;
      return `url("/api/${apiRoute}?path=${encodeURIComponent(cleanUrl)}")`;
    }
    
    const cleanUrl = url.startsWith('/') ? url.slice(1) : url;
    return `url("${BASE_URL}/${cleanUrl}")`;
  });

  // Fix AJAX calls
  modifiedHtml = modifiedHtml.replace(/(fetch|axios|jQuery\.ajax|XMLHttpRequest|\.post|\.get)\s*\(\s*["']([^"']*?)["']/g, 
    (match, method, url) => {
      if (url.startsWith('http') || url.startsWith('//') || url.startsWith('/api/')) {
        return match;
      }
      
      if (url.includes('.php')) {
        const cleanUrl = url.startsWith('/') ? url.slice(1) : url;
        const newUrl = `/api/${apiRoute}?path=${encodeURIComponent(cleanUrl)}`;
        console.log(`[AJAX] ${url} → ${newUrl}`);
        return `${method}("${newUrl}"`;
      }
      
      return match;
    });

  // Add JavaScript to intercept dynamic file loading
  const fileInterceptorScript = `
<script>
// Intercept dynamic file loading
document.addEventListener('DOMContentLoaded', function() {
  // Fix any dynamically set image src that points to uploads
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(node) {
        if (node.nodeType === 1) { // Element node
          // Fix img tags
          if (node.tagName === 'IMG' && node.src && node.src.includes('uploads/') && !node.src.includes('/api/landx')) {
            const originalSrc = node.src;
            const cleanSrc = originalSrc.startsWith('/') ? originalSrc.slice(1) : originalSrc;
            node.src = '/api/landx?path=' + encodeURIComponent(cleanSrc);
            console.log('[JS-INTERCEPT] Fixed image src:', originalSrc, '→', node.src);
          }
          
          // Fix anchor tags
          const links = node.querySelectorAll ? node.querySelectorAll('a[href*="uploads/"]') : [];
          links.forEach(function(link) {
            if (link.href && !link.href.includes('/api/landx')) {
              const originalHref = link.getAttribute('href');
              const cleanHref = originalHref.startsWith('/') ? originalHref.slice(1) : originalHref;
              link.href = '/api/landx?path=' + encodeURIComponent(cleanHref);
              console.log('[JS-INTERCEPT] Fixed link href:', originalHref, '→', link.href);
            }
          });
        }
      });
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});
</script>`;

  // Insert the interceptor script
  if (modifiedHtml.includes('</head>')) {
    modifiedHtml = modifiedHtml.replace('</head>', fileInterceptorScript + '\n</head>');
  } else if (modifiedHtml.includes('<body')) {
    modifiedHtml = modifiedHtml.replace(/<body([^>]*)>/, '<body$1>' + fileInterceptorScript);
  }

  return modifiedHtml;
}

// COMPREHENSIVE FILE HANDLER - WORKS FOR ALL FILE TYPES
async function handleFileRequest(requestedPath, req) {
  console.log(`[FILE] Handling file request: ${requestedPath}`);
  
  try {
    const decodedPath = decodeURIComponent(requestedPath);
    
    if (!decodedPath.includes('uploads/')) {
      return new Response('Not a valid file request', { status: 400 });
    }
    
    // Extract the full path after uploads/
    const pathParts = decodedPath.split('uploads/');
    const filePath = pathParts[pathParts.length - 1];
    
    if (!filePath || filePath.trim() === '') {
      return new Response('No file path found', { status: 400 });
    }
    
    const targetUrl = `${TARGET_DOMAIN}${TARGET_BASE_PATH}/uploads/${filePath}`;
    console.log(`[FILE] Fetching from: ${targetUrl}`);

    // Prepare headers with authentication
    const targetHeaders = {
      'User-Agent': commonHeaders['User-Agent'],
      'Accept': '*/*',
      'Cache-Control': 'no-cache',
      'Referer': `${TARGET_DOMAIN}${TARGET_BASE_PATH}/dashboard.php`,
    };

    // CRITICAL: Forward ALL cookies for authentication
    const cookieHeader = req.headers.get("cookie");
    if (cookieHeader) {
      targetHeaders["Cookie"] = cookieHeader;
      console.log('[FILE] Cookies forwarded for authentication');
    } else {
      console.log('[FILE] WARNING: No cookies found - authentication may fail');
    }

    // Fetch the file with proper error handling
    console.log(`[FILE] Making file request to target server...`);
    const fileResponse = await fetch(targetUrl, {
      headers: targetHeaders,
      redirect: 'follow' // Follow redirects for files
    });

    console.log(`[FILE] Response status: ${fileResponse.status}`);
    console.log(`[FILE] Response content-type: ${fileResponse.headers.get('content-type')}`);
    
    // Handle different response scenarios
    if (!fileResponse.ok) {
      if (fileResponse.status === 404) {
        console.log(`[FILE] File not found on server: ${targetUrl}`);
        return new Response('File not found on server', { status: 404 });
      } else if (fileResponse.status === 403) {
        console.log(`[FILE] Access forbidden - authentication required`);
        return new Response('Authentication required', { status: 401 });
      } else {
        console.log(`[FILE] Server error: ${fileResponse.status}`);
        return new Response(`Server error: ${fileResponse.status}`, { 
          status: fileResponse.status 
        });
      }
    }

    // Get the file content as ArrayBuffer (preserves binary data)
    const fileBuffer = await fileResponse.arrayBuffer();
    console.log(`[FILE] File size received: ${fileBuffer.byteLength} bytes`);

    // Check if file is empty
    if (fileBuffer.byteLength === 0) {
      console.log('[FILE] ERROR: File is empty (0 bytes)');
      return new Response('File is empty on server', { status: 500 });
    }

    // Determine content type
    let contentType = fileResponse.headers.get('content-type');
    const filename = filePath.split('/').pop() || 'file';
    const fileExtension = filename.toLowerCase().split('.').pop();
    
    console.log(`[FILE] Original content-type: ${contentType}`);
    console.log(`[FILE] File extension: ${fileExtension}`);
    console.log(`[FILE] Filename: ${filename}`);

    // If content-type is not properly set, detect it
    if (!contentType || contentType === 'application/octet-stream' || contentType === 'text/plain') {
      const firstBytes = new Uint8Array(fileBuffer.slice(0, 8));
      const hexString = Array.from(firstBytes).map(b => b.toString(16).padStart(2, '0')).join(' ');
      console.log(`[FILE] First 8 bytes (hex): ${hexString}`);
      
      // Magic number detection for common file types
      if (firstBytes[0] === 0xFF && firstBytes[1] === 0xD8 && firstBytes[2] === 0xFF) {
        contentType = 'image/jpeg';
        console.log('[FILE] Detected: JPEG image from magic bytes');
      } else if (firstBytes[0] === 0x89 && firstBytes[1] === 0x50 && firstBytes[2] === 0x4E && firstBytes[3] === 0x47) {
        contentType = 'image/png';
        console.log('[FILE] Detected: PNG image from magic bytes');
      } else if (firstBytes[0] === 0x47 && firstBytes[1] === 0x49 && firstBytes[2] === 0x46) {
        contentType = 'image/gif';
        console.log('[FILE] Detected: GIF image from magic bytes');
      } else if (firstBytes[0] === 0x52 && firstBytes[1] === 0x49 && firstBytes[2] === 0x46 && firstBytes[3] === 0x46) {
        contentType = 'image/webp';
        console.log('[FILE] Detected: WebP image from magic bytes');
      } else if (firstBytes[0] === 0x25 && firstBytes[1] === 0x50 && firstBytes[2] === 0x44 && firstBytes[3] === 0x46) {
        contentType = 'application/pdf';
        console.log('[FILE] Detected: PDF from magic bytes');
      } else {
        // Fallback to extension-based detection
        const extensionMap = {
          'jpg': 'image/jpeg',
          'jpeg': 'image/jpeg',
          'png': 'image/png',
          'gif': 'image/gif',
          'webp': 'image/webp',
          'bmp': 'image/bmp',
          'svg': 'image/svg+xml',
          'pdf': 'application/pdf',
          'txt': 'text/plain',
          'html': 'text/html',
          'htm': 'text/html'
        };
        contentType = extensionMap[fileExtension] || 'application/octet-stream';
        console.log(`[FILE] Detected: ${contentType} from file extension`);
      }
    }

    // Check if we received HTML instead of the actual file (common auth issue)
    if (contentType.includes('text/html')) {
      const textContent = new TextDecoder().decode(fileBuffer.slice(0, 500));
      if (textContent.includes('<!DOCTYPE') || textContent.includes('<html') || textContent.includes('login')) {
        console.log('[FILE] ERROR: Received HTML instead of file - authentication issue');
        console.log('[FILE] HTML preview:', textContent.substring(0, 200));
        return new Response('Authentication required to access this file', {
          status: 401,
          headers: { 'Content-Type': 'text/plain' }
        });
      }
    }

    console.log(`[FILE] Final content-type: ${contentType}`);
    console.log(`[FILE] Successfully fetched file, returning ${fileBuffer.byteLength} bytes`);

    // Return the file with appropriate headers
    return new Response(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': fileBuffer.byteLength.toString(),
        'Content-Disposition': `inline; filename="${filename}"`,
        'Cache-Control': 'public, max-age=86400', // Cache for 1 day
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'X-Content-Type-Options': 'nosniff',
      }
    });

  } catch (error) {
    console.error('[FILE] Error:', error);
    return new Response(`File error: ${error.message}`, { 
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// CONDITIONAL HANDLER: Handle images specifically
async function handleImageRequest(requestedPath, req) {
  console.log(`[IMAGE] Handling image request: ${requestedPath}`);
  
  try {
    const decodedPath = decodeURIComponent(requestedPath);
    const pathParts = decodedPath.split('uploads/');
    const filePath = pathParts[pathParts.length - 1];
    
    const targetUrl = `${TARGET_DOMAIN}${TARGET_BASE_PATH}/uploads/${filePath}`;
    console.log(`[IMAGE] Fetching from: ${targetUrl}`);

    const targetHeaders = {
      'User-Agent': commonHeaders['User-Agent'],
      'Accept': 'image/*,*/*',
      'Cache-Control': 'no-cache',
      'Referer': `${TARGET_DOMAIN}${TARGET_BASE_PATH}/dashboard.php`,
    };

    // Forward cookies
    const cookieHeader = req.headers.get("cookie");
    if (cookieHeader) {
      targetHeaders["Cookie"] = cookieHeader;
    }

    console.log(`[IMAGE] Making direct image request...`);
    const imageResponse = await fetch(targetUrl, {
      headers: targetHeaders,
    });

    console.log(`[IMAGE] Response status: ${imageResponse.status}`);
    
    if (!imageResponse.ok) {
      console.log(`[IMAGE] Failed to fetch image: ${imageResponse.status}`);
      return new Response('Image not found', { status: imageResponse.status });
    }

    // Get image as buffer
    const imageBuffer = await imageResponse.arrayBuffer();
    console.log(`[IMAGE] Image size: ${imageBuffer.byteLength} bytes`);

    if (imageBuffer.byteLength === 0) {
      console.log('[IMAGE] ERROR: Image is empty');
      return new Response('Image is empty', { status: 500 });
    }

    // Get content type from response or detect from magic bytes
    let contentType = imageResponse.headers.get('content-type');
    const firstBytes = new Uint8Array(imageBuffer.slice(0, 4));
    
    // Magic byte detection for images
    if (!contentType || !contentType.startsWith('image/')) {
      if (firstBytes[0] === 0xFF && firstBytes[1] === 0xD8 && firstBytes[2] === 0xFF) {
        contentType = 'image/jpeg';
      } else if (firstBytes[0] === 0x89 && firstBytes[1] === 0x50 && firstBytes[2] === 0x4E && firstBytes[3] === 0x47) {
        contentType = 'image/png';
      } else if (firstBytes[0] === 0x47 && firstBytes[1] === 0x49 && firstBytes[2] === 0x46) {
        contentType = 'image/gif';
      } else if (firstBytes[0] === 0x52 && firstBytes[1] === 0x49 && firstBytes[2] === 0x46 && firstBytes[3] === 0x46) {
        contentType = 'image/webp';
      } else {
        contentType = 'image/jpeg'; // Default fallback
      }
      console.log(`[IMAGE] Detected content type: ${contentType}`);
    }

    console.log(`[IMAGE] Successfully fetched image, returning with ${contentType}`);

    return new Response(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': imageBuffer.byteLength.toString(),
        'Cache-Control': 'public, max-age=86400',
        'Access-Control-Allow-Origin': '*',
      }
    });

  } catch (error) {
    console.error('[IMAGE] Error:', error);
    return new Response(`Image error: ${error.message}`, { status: 500 });
  }
}

// CONDITIONAL HANDLER: Handle PDFs specifically
async function handlePdfRequest(requestedPath, req) {
  console.log(`[PDF] Handling PDF request: ${requestedPath}`);
  
  try {
    const decodedPath = decodeURIComponent(requestedPath);
    const pathParts = decodedPath.split('uploads/');
    const filePath = pathParts[pathParts.length - 1];
    
    const targetUrl = `${TARGET_DOMAIN}${TARGET_BASE_PATH}/uploads/${filePath}`;
    console.log(`[PDF] Fetching from: ${targetUrl}`);

    const targetHeaders = {
      'User-Agent': commonHeaders['User-Agent'],
      'Accept': 'application/pdf,*/*',
      'Cache-Control': 'no-cache',
      'Referer': `${TARGET_DOMAIN}${TARGET_BASE_PATH}/dashboard.php`,
    };

    // Forward cookies
    const cookieHeader = req.headers.get("cookie");
    if (cookieHeader) {
      targetHeaders["Cookie"] = cookieHeader;
    }

    console.log(`[PDF] Making direct PDF request...`);
    const pdfResponse = await fetch(targetUrl, {
      headers: targetHeaders,
    });

    console.log(`[PDF] Response status: ${pdfResponse.status}`);
    
    if (!pdfResponse.ok) {
      console.log(`[PDF] Failed to fetch PDF: ${pdfResponse.status}`);
      return new Response('PDF not found', { status: pdfResponse.status });
    }

    const pdfBuffer = await pdfResponse.arrayBuffer();
    console.log(`[PDF] PDF size: ${pdfBuffer.byteLength} bytes`);

    if (pdfBuffer.byteLength === 0) {
      console.log('[PDF] ERROR: PDF is empty');
      return new Response('PDF is empty', { status: 500 });
    }

    // Verify it's actually a PDF
    const firstBytes = new Uint8Array(pdfBuffer.slice(0, 4));
    const pdfMagic = String.fromCharCode(...firstBytes);
    
    if (!pdfMagic.startsWith('%PDF')) {
      console.log('[PDF] WARNING: File does not appear to be a valid PDF');
      // Still return it but log the issue
    }

    console.log(`[PDF] Successfully fetched PDF, returning with application/pdf`);

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Length': pdfBuffer.byteLength.toString(),
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*',
      }
    });

  } catch (error) {
    console.error('[PDF] Error:', error);
    return new Response(`PDF error: ${error.message}`, { status: 500 });
  }
}

// PDF generation handler - UNCHANGED
async function handlePdfGenerationRequest(requestedPath, req) {
  console.log(`[PDF-GEN] Request: ${requestedPath}`);
  
  try {
    const decodedPath = decodeURIComponent(requestedPath);
    const generatePdfMatch = decodedPath.match(/generate_pdf\.php(\?.*)?$/);
    
    if (!generatePdfMatch) {
      return new Response('Invalid PDF generation path', { status: 400 });
    }
    
    const pdfPath = `generate_pdf.php${generatePdfMatch[1] || ''}`;
    const targetUrl = `${BASE_URL}/${pdfPath}`;
    
    console.log(`[PDF-GEN] Generating from: ${targetUrl}`);
    
    const targetHeaders = {
      'User-Agent': commonHeaders['User-Agent'],
      'Accept': 'application/pdf,*/*',
      'Cache-Control': 'no-cache',
      'Referer': `${TARGET_DOMAIN}${TARGET_BASE_PATH}/dashboard.php`,
    };
    
    forwardCookies(req, targetHeaders);
    
    const pdfResponse = await fetch(targetUrl, { headers: targetHeaders });
    
    console.log(`[PDF-GEN] Response: ${pdfResponse.status}`);
    
    if (!pdfResponse.ok) {
      const errorText = await pdfResponse.text();
      console.error('[PDF-GEN] Error:', errorText.substring(0, 200));
      return new Response(`PDF generation failed: ${pdfResponse.status}`, { status: pdfResponse.status });
    }

    const pdfBuffer = await pdfResponse.arrayBuffer();
    console.log(`[PDF-GEN] Size: ${pdfBuffer.byteLength} bytes`);
    
    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="generated.pdf"',
        'Cache-Control': 'no-store',
      }
    });
    
  } catch (error) {
    console.error('[PDF-GEN] Error:', error);
    return new Response(`PDF error: ${error.message}`, { status: 500 });
  }
}

// MAIN REQUEST HANDLER with conditional routing
async function handleRequest(req, method = 'GET') {
  try {
    const { searchParams } = new URL(req.url);
    let requestedPath = searchParams.get("path") || "/";

    console.log(`\n[${method}] Path: ${requestedPath}`);
    console.log(`[${method}] Content-Type: ${req.headers.get('content-type') || 'none'}`);

    // In handleRequest function, replace the conditional routing section with:
if (method === 'GET' && isUploadedFileRequest(requestedPath)) {
  console.log(`[ROUTER] File request detected: ${requestedPath}`);
  return await handleFileRequest(requestedPath, req);
}

    // Handle PDF generation
    if (method === 'GET' && requestedPath.includes('generate_pdf.php')) {
      return handlePdfGenerationRequest(requestedPath, req);
    }

    // Handle all other requests (PHP pages, etc.)
    const targetUrl = constructTargetUrl(requestedPath);
    const targetHeaders = { ...commonHeaders };
    
    forwardCookies(req, targetHeaders);
    
    const currentRoute = getCurrentApiRoute(req);
    targetHeaders.Referer = `${TARGET_DOMAIN}${TARGET_BASE_PATH}/dashboard.php`;
    targetHeaders.Origin = TARGET_DOMAIN;
    
    if (method !== 'GET') {
      targetHeaders['X-Requested-With'] = 'XMLHttpRequest';
    }

    let body;
    const fetchOptions = {
      method,
      headers: targetHeaders,
      redirect: 'manual'
    };

    // Handle request body
    if (method !== 'GET') {
      const contentType = req.headers.get('content-type') || '';
      
      if (contentType.includes('multipart/form-data')) {
        console.log(`[${method}] Multipart form data detected (FILE UPLOAD)`);
        const rawBody = await req.arrayBuffer();
        console.log(`[${method}] Raw body size: ${rawBody.byteLength} bytes`);
        body = rawBody;
        targetHeaders['Content-Type'] = contentType;
      } else if (contentType.includes('application/json')) {
        console.log(`[${method}] JSON data detected`);
        body = await req.text();
        targetHeaders['Content-Type'] = 'application/json';
      } else {
        console.log(`[${method}] Form data detected`);
        body = await req.text();
        targetHeaders['Content-Type'] = contentType || 'application/x-www-form-urlencoded';
      }
      
      fetchOptions.body = body;
    }

    console.log(`[${method}] Fetching: ${targetUrl}`);
    const response = await fetch(targetUrl, fetchOptions);
    console.log(`[${method}] Response: ${response.status}`);

    // Handle redirects and responses (same as before)
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location');
      if (location) {
        let redirectPath = location;
        if (location.startsWith('http')) {
          const url = new URL(location);
          if (url.hostname === new URL(TARGET_DOMAIN).hostname) {
            redirectPath = url.pathname + url.search;
          } else {
            return new Response(null, { status: response.status, headers: { Location: location } });
          }
        }
        return new Response(null, {
          status: 302,
          headers: {
            Location: `/api/${currentRoute}?path=${encodeURIComponent(redirectPath)}`,
            ...Object.fromEntries(extractSetCookies(response).map(cookie => ['Set-Cookie', cookie]))
          }
        });
      }
    }

    const contentType = response.headers.get('content-type') || '';
    const responseText = await response.text();

    if (contentType.includes('application/json')) {
      return new Response(responseText, {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
          ...Object.fromEntries(extractSetCookies(response).map(cookie => ['Set-Cookie', cookie]))
        }
      });
    }

    if (contentType.includes('text/html')) {
      const modifiedHtml = modifyHtmlContent(responseText, requestedPath, currentRoute);
      return new Response(modifiedHtml, {
        status: response.status,
        headers: {
          'Content-Type': 'text/html',
          ...Object.fromEntries(extractSetCookies(response).map(cookie => ['Set-Cookie', cookie]))
        }
      });
    }

    return new Response(responseText, {
      status: response.status,
      headers: {
        'Content-Type': contentType || 'text/plain',
        ...Object.fromEntries(extractSetCookies(response).map(cookie => ['Set-Cookie', cookie]))
      }
    });
    
  } catch (error) {
    console.error(`[ERROR] ${method}:`, error);
    return new Response(`Proxy Error: ${error.message}`, { status: 500 });
  }
}

// Generic fallback handler for other file types
async function handleGenericFileRequest(requestedPath, req) {
  console.log(`[GENERIC] Handling file request: ${requestedPath}`);
  
  try {
    const decodedPath = decodeURIComponent(requestedPath);
    const pathParts = decodedPath.split('uploads/');
    const filePath = pathParts[pathParts.length - 1];
    
    const targetUrl = `${TARGET_DOMAIN}${TARGET_BASE_PATH}/uploads/${filePath}`;
    console.log(`[GENERIC] Fetching from: ${targetUrl}`);

    const targetHeaders = {
      'User-Agent': commonHeaders['User-Agent'],
      'Accept': '*/*',
      'Cache-Control': 'no-cache',
      'Referer': `${TARGET_DOMAIN}${TARGET_BASE_PATH}/dashboard.php`,
    };

    const cookieHeader = req.headers.get("cookie");
    if (cookieHeader) {
      targetHeaders["Cookie"] = cookieHeader;
    }

    const fileResponse = await fetch(targetUrl, { headers: targetHeaders });
    console.log(`[GENERIC] Response status: ${fileResponse.status}`);

    if (!fileResponse.ok) {
      return new Response('File not found', { status: fileResponse.status });
    }

    const fileBuffer = await fileResponse.arrayBuffer();
    console.log(`[GENERIC] File size: ${fileBuffer.byteLength} bytes`);

    let contentType = fileResponse.headers.get('content-type') || 'application/octet-stream';

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': fileBuffer.byteLength.toString(),
        'Cache-Control': 'public, max-age=3600',
      }
    });

  } catch (error) {
    console.error('[GENERIC] Error:', error);
    return new Response(`File error: ${error.message}`, { status: 500 });
  }
}

// Add this to your API route for testing
export async function OPTIONS(req) {
  // Handle preflight requests for file access
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, Cookie',
      'Access-Control-Allow-Credentials': 'true',
    },
  });
}

export async function GET(req) {
  return handleRequest(req, 'GET');
}

export async function POST(req) {
  return handleRequest(req, 'POST');
}

export async function PUT(req) {
  return handleRequest(req, 'PUT');
}

export async function DELETE(req) {
  return handleRequest(req, 'DELETE');
}