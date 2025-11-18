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

  // Handle all uploads (both PDFs and images)
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
function modifyHtmlContent(html, currentPath = "", apiRoute = "landx") {
  currentPath = currentPath.replace(/\/+$/, '');
  
  console.log(`[HTML Modifier] Processing HTML for path: ${currentPath}, route: ${apiRoute}`);

  let modifiedHtml = html;

  // Fix href attributes
  modifiedHtml = modifiedHtml.replace(/href=["']([^"']*?)["']/gi, (match, href) => {
    if (href.startsWith('http') || href.startsWith('//') || 
        href.startsWith('#') || href.startsWith('mailto:') || 
        href.startsWith('javascript:') || href.startsWith('/api/')) {
      return match;
    }
    
    const cleanHref = href.startsWith('/') ? href.slice(1) : href;
    const newHref = `/api/${apiRoute}?path=${encodeURIComponent(cleanHref)}`;
    console.log(`[HREF] ${href} → ${newHref}`);
    return `href="${newHref}"`;
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

  // Fix file/image src - CRITICAL: Handle all uploads through proxy
  modifiedHtml = modifiedHtml.replace(/src=["']([^"']*?)["']/g, (match, src) => {
    if (src.startsWith('http') || src.startsWith('data:') || src.startsWith('//') || src.startsWith('/api/')) {
      return match;
    }
    
    if (src.includes('uploads/')) {
      const cleanSrc = src.startsWith('/') ? src.slice(1) : src;
      const newSrc = `/api/${apiRoute}?path=${encodeURIComponent(cleanSrc)}`;
      console.log(`[IMG-UPLOAD] ${src} → ${newSrc}`);
      return `src="${newSrc}"`;
    }
    
    const cleanSrc = src.startsWith('/') ? src.slice(1) : src;
    return `src="${BASE_URL}/${cleanSrc}"`;
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

  return modifiedHtml;
}

// ENHANCED: File viewing handler for BOTH PDFs and images
async function handleUploadedFileRequest(requestedPath, req) {
  console.log(`[FILE] Request for: ${requestedPath}`);
  
  try {
    const decodedPath = decodeURIComponent(requestedPath);
    
    if (!decodedPath.includes('uploads/')) {
      return new Response('Not a valid uploaded file request', { status: 400 });
    }
    
    // Extract the full path after uploads/
    const pathParts = decodedPath.split('uploads/');
    const filePath = pathParts[pathParts.length - 1];
    
    if (!filePath || filePath.trim() === '') {
      return new Response('No file path found', { status: 400 });
    }
    
    const targetUrl = `${TARGET_DOMAIN}${TARGET_BASE_PATH}/uploads/${filePath}`;
    console.log(`[FILE] Fetching: ${targetUrl}`);

    const targetHeaders = {
      'User-Agent': commonHeaders['User-Agent'],
      'Accept': '*/*',
      'Cache-Control': 'no-cache',
      'Referer': `${TARGET_DOMAIN}${TARGET_BASE_PATH}/dashboard.php`,
      'Origin': TARGET_DOMAIN,
    };

    // CRITICAL: Forward all cookies for authentication
    const cookieHeader = req.headers.get("cookie");
    if (cookieHeader) {
      targetHeaders["Cookie"] = cookieHeader;
      console.log('[FILE] Cookies forwarded');
    } else {
      console.log('[FILE] WARNING: No cookies found');
      return new Response('Authentication required', { status: 401 });
    }

    // Fetch the file with NO encoding handling - get raw bytes
    const fileResponse = await fetch(targetUrl, {
      headers: targetHeaders,
      redirect: 'follow',
    });

    console.log(`[FILE] Response: ${fileResponse.status}`);
    console.log(`[FILE] Content-Type: ${fileResponse.headers.get('content-type')}`);
    
    if (!fileResponse.ok) {
      console.log(`[FILE] File not found: ${fileResponse.status}`);
      return new Response(`File not found: ${fileResponse.status}`, { status: fileResponse.status });
    }

    // Get the file as ArrayBuffer to preserve binary data
    const fileBuffer = await fileResponse.arrayBuffer();
    console.log(`[FILE] Size: ${fileBuffer.byteLength} bytes`);

    if (fileBuffer.byteLength === 0) {
      console.log('[FILE] ERROR: File is empty (0 bytes)');
      return new Response('File is empty', { status: 500 });
    }

    // Determine content type
    let contentType = fileResponse.headers.get('content-type');
    const filename = filePath.split('/').pop() || 'file';
    
    // If content-type is not properly set, detect from filename and magic bytes
    if (!contentType || contentType === 'application/octet-stream' || contentType === 'text/html') {
      const firstBytes = new Uint8Array(fileBuffer.slice(0, 4));
      
      // Check magic bytes for common file types
      if (firstBytes[0] === 0x25 && firstBytes[1] === 0x50 && firstBytes[2] === 0x44 && firstBytes[3] === 0x46) {
        contentType = 'application/pdf';
        console.log('[FILE] Detected: PDF from magic bytes');
      } else if (firstBytes[0] === 0xFF && firstBytes[1] === 0xD8 && firstBytes[2] === 0xFF) {
        contentType = 'image/jpeg';
        console.log('[FILE] Detected: JPEG from magic bytes');
      } else if (firstBytes[0] === 0x89 && firstBytes[1] === 0x50 && firstBytes[2] === 0x4E && firstBytes[3] === 0x47) {
        contentType = 'image/png';
        console.log('[FILE] Detected: PNG from magic bytes');
      } else if (firstBytes[0] === 0x47 && firstBytes[1] === 0x49 && firstBytes[2] === 0x46) {
        contentType = 'image/gif';
        console.log('[FILE] Detected: GIF from magic bytes');
      } else if (firstBytes[0] === 0x52 && firstBytes[1] === 0x49 && firstBytes[2] === 0x46 && firstBytes[3] === 0x46) {
        contentType = 'image/webp';
        console.log('[FILE] Detected: WebP from magic bytes');
      } else {
        // Fallback to extension-based detection
        const ext = filename.toLowerCase().split('.').pop();
        const extMap = {
          'pdf': 'application/pdf',
          'jpg': 'image/jpeg',
          'jpeg': 'image/jpeg',
          'png': 'image/png',
          'gif': 'image/gif',
          'webp': 'image/webp',
          'bmp': 'image/bmp',
          'svg': 'image/svg+xml'
        };
        contentType = extMap[ext] || 'application/octet-stream';
        console.log(`[FILE] Detected: ${contentType} from extension .${ext}`);
      }
    }

    console.log(`[FILE] Final Content-Type: ${contentType}`);
    console.log(`[FILE] Filename: ${filename}`);

    // Return the file with proper headers
    return new Response(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': fileBuffer.byteLength.toString(),
        'Content-Disposition': `inline; filename="${filename}"`,
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*',
        'X-Content-Type-Options': 'nosniff',
      }
    });

  } catch (error) {
    console.error('[FILE] Error:', error);
    return new Response(`File error: ${error.message}`, { status: 500 });
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

// ENHANCED: Main request handler with better file upload support
async function handleRequest(req, method = 'GET') {
  try {
    const { searchParams } = new URL(req.url);
    let requestedPath = searchParams.get("path") || "/";

    console.log(`\n[${method}] Path: ${requestedPath}`);
    console.log(`[${method}] Content-Type: ${req.headers.get('content-type') || 'none'}`);

    // Handle file viewing (GET only) - for BOTH PDFs and images
    if (method === 'GET' && isUploadedFileRequest(requestedPath)) {
      return handleUploadedFileRequest(requestedPath, req);
    }

    // Handle PDF generation (GET only)
    if (method === 'GET' && requestedPath.includes('generate_pdf.php')) {
      return handlePdfGenerationRequest(requestedPath, req);
    }

    // Handle all other requests
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

    // Handle request body - CRITICAL for file uploads
    if (method !== 'GET') {
      const contentType = req.headers.get('content-type') || '';
      
      if (contentType.includes('multipart/form-data')) {
        console.log(`[${method}] Multipart form data detected (FILE UPLOAD)`);
        
        // Get the raw body as buffer for multipart forms
        const rawBody = await req.arrayBuffer();
        console.log(`[${method}] Raw body size: ${rawBody.byteLength} bytes`);
        
        // For multipart, forward the raw body with the correct content-type
        body = rawBody;
        
        // Keep the original content-type with boundary
        targetHeaders['Content-Type'] = contentType;
        
      } else if (contentType.includes('application/json')) {
        console.log(`[${method}] JSON data detected`);
        body = await req.text();
        targetHeaders['Content-Type'] = 'application/json';
      } else {
        console.log(`[${method}] Form data detected`);
        body = await req.text();
        console.log(`[${method}] Body preview: ${body.substring(0, 200)}`);
        targetHeaders['Content-Type'] = contentType || 'application/x-www-form-urlencoded';
      }
      
      fetchOptions.body = body;
    }

    console.log(`[${method}] Fetching: ${targetUrl}`);
    
    const response = await fetch(targetUrl, fetchOptions);
    
    console.log(`[${method}] Response: ${response.status}`);

    // Handle redirects
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location');
      if (location) {
        console.log(`[${method}] Redirect to: ${location}`);
        let redirectPath = location;
        
        if (location.startsWith('http')) {
          const url = new URL(location);
          if (url.hostname === new URL(TARGET_DOMAIN).hostname) {
            redirectPath = url.pathname + url.search;
          } else {
            return new Response(null, {
              status: response.status,
              headers: { Location: location }
            });
          }
        }
        
        return new Response(null, {
          status: 302,
          headers: {
            Location: `/api/${currentRoute}?path=${encodeURIComponent(redirectPath)}`,
            ...Object.fromEntries(
              extractSetCookies(response).map(cookie => ['Set-Cookie', cookie])
            )
          }
        });
      }
    }

    const contentType = response.headers.get('content-type') || '';
    const responseText = await response.text();

    // Handle JSON responses
    if (contentType.includes('application/json')) {
      console.log(`[${method}] JSON response`);
      return new Response(responseText, {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
          ...Object.fromEntries(
            extractSetCookies(response).map(cookie => ['Set-Cookie', cookie])
          )
        }
      });
    }

    // Handle HTML
    if (contentType.includes('text/html')) {
      console.log(`[${method}] HTML response - modifying`);
      const modifiedHtml = modifyHtmlContent(responseText, requestedPath, currentRoute);
      return new Response(modifiedHtml, {
        status: response.status,
        headers: {
          'Content-Type': 'text/html',
          ...Object.fromEntries(
            extractSetCookies(response).map(cookie => ['Set-Cookie', cookie])
          )
        }
      });
    }

    // Handle other content types
    return new Response(responseText, {
      status: response.status,
      headers: {
        'Content-Type': contentType || 'text/plain',
        ...Object.fromEntries(
          extractSetCookies(response).map(cookie => ['Set-Cookie', cookie])
        )
      }
    });
    
  } catch (error) {
    console.error(`[ERROR] ${method}:`, error);
    return new Response(`Proxy Error: ${error.message}`, { status: 500 });
  }
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