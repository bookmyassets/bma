// app/api/landx/route.js

const TARGET_DOMAIN = "https://bigbucket.online";
const TARGET_BASE_PATH = "/LandX-Beta";
const TARGET_URL = `${TARGET_DOMAIN}${TARGET_BASE_PATH}/dashboard.php`;
const BASE_URL = `${TARGET_DOMAIN}${TARGET_BASE_PATH}`;

const commonHeaders = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
  "Accept-Encoding": "gzip, deflate, br",
  Connection: "keep-alive",
  "Upgrade-Insecure-Requests": "1",
};

// Helper function to forward cookies
function forwardCookies(clientRequest, targetHeaders) {
  const cookies = clientRequest.headers.get("cookie");
  if (cookies) {
    targetHeaders["Cookie"] = cookies;
  }
}

// Robust cookie extraction
function extractSetCookies(response) {
  const setCookieHeaders = [];
  
  // Standard way to get Set-Cookie header
  const setCookieHeader = response.headers.get('set-cookie');
  if (setCookieHeader) {
    // Handle multiple cookies in one header
    const cookies = setCookieHeader.split(/\s*,\s*(?=[^;]+;)/);
    setCookieHeaders.push(...cookies);
  }
  
  // Try raw headers if available
  if (typeof response.headers.raw === 'function') {
    const rawSetCookies = response.headers.raw()['set-cookie'] || [];
    setCookieHeaders.push(...rawSetCookies);
  }
  
  return setCookieHeaders;
}

// Standardized URL construction
function constructTargetUrl(path) {
  // Handle empty/root path
  if (!path || path === '/' || path === '') {
    return TARGET_URL;
  }

  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Special cases
  if (cleanPath === 'favicon.ico') {
    return `${TARGET_DOMAIN}/favicon.ico`;
  }

  // All PHP files should use the base URL pattern
  if (cleanPath.endsWith('.php')) {
    return `${BASE_URL}/${cleanPath}`;
  }

  // PDF files should go in /uploads/pdfs/
  if (cleanPath.endsWith('.pdf')) {
    // Extract just the filename part in case there are path segments
    const pdfFilename = cleanPath.split('/').pop();
    return `${BASE_URL}/uploads/pdfs/${pdfFilename}`;
  }

  // All other cases
  return `${BASE_URL}/${cleanPath}`;
}

// Enhanced HTML content modifier
function modifyHtmlContent(html, currentPath = "") {
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
        return `href="/api/landx?path=${encodeURIComponent(href)}"`;
      }
      
      // Handle PHP files
      if (href.endsWith('.php')) {
        return `href="/api/landx?path=${encodeURIComponent(href)}"`;
      }
      
      // Handle relative paths
      return `href="/api/landx?path=${encodeURIComponent(
        currentPath ? `${currentPath}/${href}` : href
      )}"`;
    })
    
    // Form actions
    .replace(/action="([^"]*?)"/gi, (match, action) => {
      if (action.startsWith('http') || !action) return match;
      
      // Handle absolute paths
      if (action.startsWith('/')) {
        return `action="/api/landx?path=${encodeURIComponent(action)}"`;
      }
      
      // Handle relative paths
      return `action="/api/landx?path=${encodeURIComponent(
        currentPath ? `${currentPath}/${action}` : action
      )}"`;
    })
    

    .replace(/src="([^"]*?)"/g, (match, src) => {
      if (src.startsWith('http') || src.startsWith('data:') || src.startsWith('//')) {
        return match;
      }
      return `src="${BASE_URL}/${src.startsWith('/') ? src.slice(1) : src}"`;
    })
    
    .replace(/url\(["']?([^"')]*?)["']?\)/g, (match, url) => {
      if (url.startsWith('http') || url.startsWith('data:') || url.startsWith('//')) {
        return match;
      }
      return `url("${BASE_URL}/${url.startsWith('/') ? url.slice(1) : url}")`;
    });

  modifiedHtml = modifiedHtml
    //fetch/XHR requests in JavaScript
    .replace(/(fetch|axios|jQuery\.ajax|XMLHttpRequest|\.post|\.get)\(['"]([^'"]*?)['"]/g, 
      (match, method, url) => {
        if (url.startsWith('http') || url.startsWith('//')) return match;
        
        if (url.includes('.php') || url.startsWith('/api/')) {
          return `${method}('/api/landx?path=${encodeURIComponent(
            url.startsWith('/') ? url.slice(1) : url
          )}'`;
        }
        return match;
      })
    
    // Form submissions in JavaScript
    .replace(/(\.action|formAction|\.submit|\.url)\s*=\s*['"]([^'"]*?)['"]/g,
      (match, prop, url) => {
        if (url.startsWith('http') || url.startsWith('//')) return match;
        return `${prop} = '/api/landx?path=${encodeURIComponent(
          url.startsWith('/') ? url.slice(1) : url
        )}'`;
      });

  // Add base tag if missing
  if (!modifiedHtml.includes('<base href="')) {
    modifiedHtml = modifiedHtml.replace(
      /<head>/i, 
      '<head>\n<base href="${BASE_URL}/">'
    );
  }

  return modifiedHtml;
}

// request handler
async function handleRequest(req, method = 'GET') {
 /*  console.log(`🚀 ${method} Request started`);
  console.log(`🚀 Request URL:`, req.url); */

  try {
    const { searchParams } = new URL(req.url);
    let requestedPath = searchParams.get("path") || "/";
    
    // Special case for root proxy URL
    if (req.url.endsWith('/api/landx') && requestedPath === '/') {
      requestedPath = 'dashboard.php';
    }

    const targetUrl = constructTargetUrl(requestedPath);
    //console.log(`🎯 ${method} - Final Target URL:`, targetUrl);

    const targetHeaders = { ...commonHeaders };
    
    // Forward cookies
    forwardCookies(req, targetHeaders);
    
    // Add referer and origin
    const refererUrl = new URL(req.url);
    targetHeaders.Referer = `${refererUrl.origin}/api/landx`;
    if (method !== 'GET') {
      targetHeaders.Origin = refererUrl.origin;
      targetHeaders['X-Requested-With'] = 'XMLHttpRequest';
    }

    // Handle request body
    const body = method !== 'GET' ? await req.text() : undefined;
    if (body && method !== 'GET') {
      targetHeaders['Content-Type'] = req.headers.get('content-type') || 'application/x-www-form-urlencoded';
      targetHeaders['Content-Length'] = Buffer.byteLength(body).toString();
    }

    //console.log(`📤 ${method} Headers:`, targetHeaders);
    if (body) console.log(`📤 ${method} Body:`, body.substring(0, 200));

    const res = await fetch(targetUrl, {
      method,
      headers: targetHeaders,
      body,
      redirect: 'manual'
    });

    //console.log(`📥 Response status:`, res.status);
    //console.log(`📥 Response headers:`, Object.fromEntries(res.headers.entries()));

    // Handle redirects
    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get('location');
      if (location) {
        let redirectPath = location;
        
        // Convert full URLs to paths
        if (location.startsWith('http')) {
          const url = new URL(location);
          if (url.hostname === new URL(TARGET_DOMAIN).hostname) {
            redirectPath = url.pathname;
          } else {
            // External redirect - pass through
            return new Response(null, {
              status: res.status,
              headers: {
                Location: location,
                'Set-Cookie': extractSetCookies(res),
                'Cache-Control': 'no-cache, no-store, must-revalidate'
              }
            });
          }
        }
        
        return new Response(null, {
          status: 302,
          headers: {
            Location: `/api/landx?path=${encodeURIComponent(redirectPath)}`,
            'Set-Cookie': extractSetCookies(res),
            'Cache-Control': 'no-cache, no-store, must-revalidate'
          }
        });
      }
    }

    // Handle API responses differently
    const contentType = res.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');
    const isHtml = contentType.includes('text/html');

    const responseText = await res.text();

    if (isJson) {
      // Directly return JSON responses without modification
      //console.log('📦 JSON Response:', responseText.substring(0, 200));
      return new Response(responseText, {
        status: res.status,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Set-Cookie': extractSetCookies(res)
        }
      });
    }

    if (isHtml) {
      // Modify HTML content
      const modifiedHtml = modifyHtmlContent(responseText, requestedPath);
      //console.log('📦 Modified HTML length:', modifiedHtml.length);
      
      return new Response(modifiedHtml, {
        status: res.status,
        headers: {
          'Content-Type': 'text/html',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Set-Cookie': extractSetCookies(res)
        }
      });
    }

    // For all other content types, return as-is
    return new Response(responseText, {
      status: res.status,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Set-Cookie': extractSetCookies(res)
      }
    });
  } catch (error) {
    console.error(`💥 ${method} Proxy Error:`, error);
    console.error(`💥 Error stack:`, error.stack);
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