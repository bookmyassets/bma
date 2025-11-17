// app/api/landx/route.js
const TARGET_DOMAIN = "https://dholeratimes.co.in/";
const TARGET_BASE_PATH = "/LandX-Beta";
const TARGET_URL = `${TARGET_DOMAIN}${TARGET_BASE_PATH}/dashboard.php`;
const BASE_URL = `${TARGET_DOMAIN}${TARGET_BASE_PATH}`;

// Get the current API route name dynamically
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

// Helper functions
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

// Check if path is a static file request
function isStaticFileRequest(path) {
  const decodedPath = decodeURIComponent(path);
  const staticFileExtensions = ['.pdf', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.css', '.js', '.woff', '.woff2', '.ttf', '.eot', '.webp'];
  const staticFilePaths = ['uploads/', 'assets/', 'css/', 'js/', 'fonts/'];
  
  // Check by file extension
  const hasStaticExtension = staticFileExtensions.some(ext => 
    decodedPath.toLowerCase().endsWith(ext)
  );
  
  // Check by path pattern
  const hasStaticPath = staticFilePaths.some(staticPath => 
    decodedPath.includes(staticPath)
  );
  
  return hasStaticExtension || hasStaticPath || decodedPath.includes('generate_pdf.php');
}

// Check if path is a binary file (images, PDFs, fonts, etc.)
function isBinaryFile(path) {
  const decodedPath = decodeURIComponent(path);
  const binaryExtensions = ['.pdf', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot'];
  return binaryExtensions.some(ext => decodedPath.toLowerCase().endsWith(ext));
}

// Standardized URL construction
function constructTargetUrl(path) {
  const decodedPath = decodeURIComponent(path);

  if (!decodedPath || decodedPath === '/') {
    return TARGET_URL;
  }

  const cleanPath = decodedPath.startsWith('/') ? decodedPath.slice(1) : decodedPath;

  // Handle static file requests
  if (isStaticFileRequest(path)) {
    if (cleanPath.includes('uploads/pdfs/')) {
      // Extract filename without re-encoding
      const filename = cleanPath.split('uploads/pdfs/')[1];
      return `${TARGET_DOMAIN}${TARGET_BASE_PATH}/uploads/pdfs/${filename}`;
    } else if (cleanPath.includes('uploads/images/')) {
      // Handle images from uploads folder
      const filename = cleanPath.split('uploads/images/')[1];
      return `${TARGET_DOMAIN}${TARGET_BASE_PATH}/uploads/images/${filename}`;
    } else if (cleanPath.includes('generate_pdf.php')) {
      // Handle generate_pdf.php with parameters
      return `${BASE_URL}/${cleanPath}`;
    } else if (isBinaryFile(cleanPath)) {
      // Direct binary file access (images, PDFs, fonts)
      return `${BASE_URL}/${cleanPath}`;
    } else if (cleanPath.includes('assets/') || cleanPath.includes('css/') || cleanPath.includes('js/') || cleanPath.includes('fonts/')) {
      // Other static assets
      return `${BASE_URL}/${cleanPath}`;
    }
  }

  // Other existing cases
  if (cleanPath === 'favicon.ico') {
    return `${TARGET_DOMAIN}/favicon.ico`;
  }
  if (cleanPath.endsWith('.php')) {
    return `${BASE_URL}/${cleanPath}`;
  }

  return `${BASE_URL}/${cleanPath}`;
}

// Enhanced static file handler for single uploads folder
async function handleStaticFileRequest(requestedPath, req) {
  console.log(`Static File Request - Original path: ${requestedPath}`);
  
  let targetUrl;
  let filename = 'file';
  let contentType = 'application/octet-stream';
  
  try {
    const decodedPath = decodeURIComponent(requestedPath);
    console.log(`Static File Request - Decoded path: ${decodedPath}`);
    
    // Determine content type based on file extension
    if (decodedPath.toLowerCase().endsWith('.png')) {
      contentType = 'image/png';
    } else if (decodedPath.toLowerCase().endsWith('.jpg') || decodedPath.toLowerCase().endsWith('.jpeg')) {
      contentType = 'image/jpeg';
    } else if (decodedPath.toLowerCase().endsWith('.gif')) {
      contentType = 'image/gif';
    } else if (decodedPath.toLowerCase().endsWith('.svg')) {
      contentType = 'image/svg+xml';
    } else if (decodedPath.toLowerCase().endsWith('.pdf')) {
      contentType = 'application/pdf';
    } else if (decodedPath.toLowerCase().endsWith('.webp')) {
      contentType = 'image/webp';
    }
    
    filename = decodedPath.split('/').pop() || filename;
    
    // Handle different types of static file requests
    if (decodedPath.includes('generate_pdf.php')) {
      // Handle PDF generation
      const generatePdfMatch = decodedPath.match(/generate_pdf\.php(\?.*)?$/);
      if (generatePdfMatch) {
        const pdfPath = `generate_pdf.php${generatePdfMatch[1] || ''}`;
        targetUrl = `${BASE_URL}/${pdfPath}`;
        
        const urlParams = new URLSearchParams(generatePdfMatch[1]?.substring(1) || '');
        const index = urlParams.get('index');
        filename = index ? `document_${index}.pdf` : 'generated_document.pdf';
        contentType = 'application/pdf';
      }
    } else if (decodedPath.includes('uploads/')) {
      // All files (PDFs and images) are in the same uploads folder
      const uploadsMatch = decodedPath.match(/uploads\/(.+)$/);
      if (uploadsMatch) {
        const filePath = uploadsMatch[1];
        targetUrl = `${TARGET_DOMAIN}${TARGET_BASE_PATH}/uploads/${filePath}`;
        
        console.log(`Uploads file - Path: ${filePath}`);
        console.log(`Uploads target URL: ${targetUrl}`);
      } else {
        // Fallback
        const pathParts = decodedPath.split('uploads/');
        const filePath = pathParts[1];
        targetUrl = `${TARGET_DOMAIN}${TARGET_BASE_PATH}/uploads/${filePath}`;
      }
    } else {
      // Direct file access
      const cleanPath = decodedPath.startsWith('/') ? decodedPath.slice(1) : decodedPath;
      targetUrl = `${BASE_URL}/${cleanPath}`;
    }

    console.log(`Fetching static file from: ${targetUrl}`);
    console.log(`Content-Type: ${contentType}, Filename: ${filename}`);
    
    // Enhanced headers for authentication
    const targetHeaders = {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'User-Agent': commonHeaders['User-Agent'],
      'Accept': '*/*' // Accept all file types
    };
    
    // Forward all cookies for authentication
    forwardCookies(req, targetHeaders);
    
    // Add referer for session continuity
    targetHeaders.Referer = `${TARGET_DOMAIN}${TARGET_BASE_PATH}/dashboard.php`;
    
    const fileResponse = await fetch(targetUrl, {
      headers: targetHeaders,
      redirect: 'manual'
    });
    
    console.log(`Static File Response status: ${fileResponse.status}`);
    
    // Handle redirects for authenticated file access
    if (fileResponse.status === 302 || fileResponse.status === 301) {
      const location = fileResponse.headers.get('location');
      if (location && location.includes('login.php')) {
        console.log('File access requires login');
        return new Response('Authentication required', { status: 401 });
      }
    }
    
    if (!fileResponse.ok) {
      console.error(`Static file fetch failed: ${fileResponse.status} - ${fileResponse.statusText}`);
      
      if (fileResponse.status === 404) {
        return new Response('File not found', { status: 404 });
      }
      
      return new Response(`File Error: ${fileResponse.statusText}`, { status: fileResponse.status });
    }

    // Get the response as array buffer for binary files
    const fileBuffer = await fileResponse.arrayBuffer();
    
    // Use the actual content type from response
    const actualContentType = fileResponse.headers.get('content-type') || contentType;
    
    console.log(`File fetched successfully - Size: ${fileBuffer.byteLength} bytes, Type: ${actualContentType}`);

    // Return the file with proper headers
    const responseHeaders = {
      'Content-Type': actualContentType,
      'Cache-Control': 'public, max-age=86400',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Cookie',
      'X-Content-Type-Options': 'nosniff',
      'Content-Length': fileBuffer.byteLength.toString(),
      'Content-Disposition': `inline; filename="${filename}"`
    };

    // Forward any authentication cookies
    const setCookies = extractSetCookies(fileResponse);
    if (setCookies.length > 0) {
      responseHeaders['Set-Cookie'] = setCookies;
    }

    return new Response(fileBuffer, {
      status: fileResponse.status,
      headers: responseHeaders
    });
    
  } catch (error) {
    console.error('Static file fetch error:', error);
    return new Response(`File fetch error: ${error.message}`, { 
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// Enhanced HTML content modifier
function modifyHtmlContent(html, currentPath = "", apiRoute = "landx") {
  // Normalize currentPath
  currentPath = currentPath.replace(/\/+$/, '');

  // all standard links and forms
  let modifiedHtml = html
    // href attributes
    .replace(/href="([^"]*?)"/gi, (match, href) => {
      if (href.startsWith('http') || href.startsWith('//') || 
          href.startsWith('#') || href.startsWith('mailto:') || 
          href.startsWith('javascript:')) {
        return match;
      }
      
      // Handle absolute paths
      if (href.startsWith('/')) {
        return `href="/api/${apiRoute}?path=${encodeURIComponent(href)}"`;
      }
      
      // Handle PHP files
      if (href.endsWith('.php')) {
        return `href="/api/${apiRoute}?path=${encodeURIComponent(href)}"`;
      }
      
      // Handle relative paths
      return `href="/api/${apiRoute}?path=${encodeURIComponent(
        currentPath ? `${currentPath}/${href}` : href
      )}"`;
    })
    
    // Form actions
    .replace(/action="([^"]*?)"/gi, (match, action) => {
      if (action.startsWith('http') || !action) return match;
      
      // Handle absolute paths
      if (action.startsWith('/')) {
        return `action="/api/${apiRoute}?path=${encodeURIComponent(action)}"`;
      }
      
      // Handle relative paths
      return `action="/api/${apiRoute}?path=${encodeURIComponent(
        currentPath ? `${currentPath}/${action}` : action
      )}"`;
    })
    
    // src attributes - FIXED: Don't proxy images and other static assets
    .replace(/src="([^"]*?)"/g, (match, src) => {
      if (src.startsWith('http') || src.startsWith('data:') || src.startsWith('//')) {
        return match;
      }
      
      // Check if it's a static file (image, etc.)
      const fullSrc = src.startsWith('/') ? src.slice(1) : (currentPath ? `${currentPath}/${src}` : src);
      if (isStaticFileRequest(fullSrc)) {
        // Direct link to static file
        return `src="${BASE_URL}/${fullSrc}"`;
      }
      
      // Proxy other src files
      return `src="/api/${apiRoute}?path=${encodeURIComponent(fullSrc)}"`;
    })
    
    // CSS url() references - FIXED: Don't proxy static assets in CSS
    .replace(/url\(["']?([^"')]*?)["']?\)/g, (match, url) => {
      if (url.startsWith('http') || url.startsWith('data:') || url.startsWith('//')) {
        return match;
      }
      
      // Check if it's a static file
      const fullUrl = url.startsWith('/') ? url.slice(1) : (currentPath ? `${currentPath}/${url}` : url);
      if (isStaticFileRequest(fullUrl)) {
        // Direct link to static file in CSS
        return `url("${BASE_URL}/${fullUrl}")`;
      }
      
      // Proxy other URLs
      return `url("/api/${apiRoute}?path=${encodeURIComponent(fullUrl)}")`;
    });

  // JavaScript modifications (keep as before)
  modifiedHtml = modifiedHtml
    .replace(/(fetch|axios|jQuery\.ajax|XMLHttpRequest|\.post|\.get)\(['"]([^'"]*?)['"]/g, 
      (match, method, url) => {
        if (url.startsWith('http') || url.startsWith('//')) return match;
        
        if (url.includes('.php') || url.startsWith('/api/')) {
          return `${method}('/api/${apiRoute}?path=${encodeURIComponent(
            url.startsWith('/') ? url.slice(1) : url
          )}'`;
        }
        return match;
      })
    
    .replace(/(\.action|formAction|\.submit|\.url)\s*=\s*['"]([^'"]*?)['"]/g,
      (match, prop, url) => {
        if (url.startsWith('http') || url.startsWith('//')) return match;
        return `${prop} = '/api/${apiRoute}?path=${encodeURIComponent(
          url.startsWith('/') ? url.slice(1) : url
        )}'`;
      });

  // Add base tag if missing
  if (!modifiedHtml.includes('<base href="')) {
    modifiedHtml = modifiedHtml.replace(
      /<head>/i, 
      `<head>\n<base href="${BASE_URL}/">`
    );
  }

  return modifiedHtml;
}

// Main request handler
async function handleRequest(req, method = 'GET') {
  try {
    const { searchParams } = new URL(req.url);
    let requestedPath = searchParams.get("path") || "/";

    console.log(`${method} request for path: ${requestedPath}`);

    // Handle static file requests (PDFs, images, CSS, JS, fonts)
    if (isStaticFileRequest(requestedPath)) {
      console.log('Detected static file request');
      return handleStaticFileRequest(requestedPath, req);
    }

    // Handle non-static requests (HTML, PHP, etc.)
    const targetUrl = constructTargetUrl(requestedPath);
    const targetHeaders = { ...commonHeaders };
    
    forwardCookies(req, targetHeaders);
    
    const refererUrl = new URL(req.url);
    const currentRoute = getCurrentApiRoute(req);
    targetHeaders.Referer = `${refererUrl.origin}/api/${currentRoute}`;
    if (method !== 'GET') {
      targetHeaders.Origin = refererUrl.origin;
      targetHeaders['X-Requested-With'] = 'XMLHttpRequest';
    }

    const body = method !== 'GET' ? await req.text() : undefined;
    if (body && method !== 'GET') {
      targetHeaders['Content-Type'] = req.headers.get('content-type') || 'application/x-www-form-urlencoded';
      targetHeaders['Content-Length'] = Buffer.byteLength(body).toString();
    }

    console.log(`Fetching: ${targetUrl}`);
    
    const response = await fetch(targetUrl, {
      method,
      headers: targetHeaders,
      body,
      redirect: 'manual'
    });

    // Handle redirects (same as before)
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location');
      if (location) {
        let redirectPath = location;
        if (location.startsWith('http')) {
          const url = new URL(location);
          if (url.hostname === new URL(TARGET_DOMAIN).hostname) {
            redirectPath = url.pathname;
          } else {
            return new Response(null, {
              status: response.status,
              headers: {
                Location: location,
                'Set-Cookie': extractSetCookies(response),
                'Cache-Control': 'no-cache, no-store, must-revalidate'
              }
            });
          }
        }
        return new Response(null, {
          status: 302,
          headers: {
            Location: `/api/${getCurrentApiRoute(req)}?path=${encodeURIComponent(redirectPath)}`,
            'Set-Cookie': extractSetCookies(response),
            'Cache-Control': 'no-cache, no-store, must-revalidate'
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
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Set-Cookie': extractSetCookies(response)
        }
      });
    }

    if (contentType.includes('text/html')) {
      const currentRoute = getCurrentApiRoute(req);
      const modifiedHtml = modifyHtmlContent(responseText, requestedPath, currentRoute);
      return new Response(modifiedHtml, {
        status: response.status,
        headers: {
          'Content-Type': 'text/html',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Set-Cookie': extractSetCookies(response)
        }
      });
    }

    return new Response(responseText, {
      status: response.status,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Set-Cookie': extractSetCookies(response)
      }
    });
  } catch (error) {
    console.error(`Proxy Error:`, error);
    return new Response(`Proxy Error: ${error.message}`, { 
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// Export HTTP methods
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