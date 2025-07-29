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

// Standardized URL construction
function constructTargetUrl(path) {
  const decodedPath = decodeURIComponent(path);

  if (!decodedPath || decodedPath === '/') {
    return TARGET_URL;
  }

  const cleanPath = decodedPath.startsWith('/') ? decodedPath.slice(1) : decodedPath;

  // Handle PDF requests differently
  if (cleanPath.includes('uploads/pdfs/')) {
    const pdfFilename = cleanPath.split('uploads/pdfs/')[1];
    return `${TARGET_DOMAIN}${TARGET_BASE_PATH}/uploads/pdfs/${pdfFilename}`;
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

// PDF-specific handler
async function handlePdfRequest(requestedPath) {
  const pdfFilename = decodeURIComponent(requestedPath.split('uploads/pdfs/')[1]);
  const targetUrl = `${TARGET_DOMAIN}${TARGET_BASE_PATH}/uploads/pdfs/${encodeURIComponent(pdfFilename)}?t=${Date.now()}`;

  console.log(`Fetching PDF from: ${targetUrl}`);
  
  try {
    const pdfResponse = await fetch(targetUrl, {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    
    if (!pdfResponse.ok) {
      console.error(`PDF fetch failed: ${pdfResponse.status}`);
      return new Response('PDF not found', { status: 404 });
    }

    // Get the response as a ReadableStream
    const pdfStream = pdfResponse.body;
    
    return new Response(pdfStream, {
      status: pdfResponse.status,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${pdfFilename}"`,
        'Cache-Control': 'no-store, max-age=0',
        'Access-Control-Allow-Origin': '*',
        ...Object.fromEntries(pdfResponse.headers.entries())
      }
    });
  } catch (error) {
    console.error('PDF fetch error:', error);
    return new Response('PDF fetch error', { status: 500 });
  }
}

// Main request handler
async function handleRequest(req, method = 'GET') {
  try {
    const { searchParams } = new URL(req.url);
    let requestedPath = searchParams.get("path") || "/";

    // Handle PDF requests
    if (requestedPath.includes('uploads/pdfs/')) {
      return handlePdfRequest(requestedPath);
    }

    // Handle non-PDF requests
    const targetUrl = constructTargetUrl(requestedPath);
    const targetHeaders = { ...commonHeaders };
    
    forwardCookies(req, targetHeaders);
    
    const refererUrl = new URL(req.url);
    targetHeaders.Referer = `${refererUrl.origin}/api/landx`;
    if (method !== 'GET') {
      targetHeaders.Origin = refererUrl.origin;
      targetHeaders['X-Requested-With'] = 'XMLHttpRequest';
    }

    const body = method !== 'GET' ? await req.text() : undefined;
    if (body && method !== 'GET') {
      targetHeaders['Content-Type'] = req.headers.get('content-type') || 'application/x-www-form-urlencoded';
      targetHeaders['Content-Length'] = Buffer.byteLength(body).toString();
    }

    const response = await fetch(targetUrl, {
      method,
      headers: targetHeaders,
      body,
      redirect: 'manual'
    });

    // Handle redirects
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
            Location: `/api/landx?path=${encodeURIComponent(redirectPath)}`,
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
      const modifiedHtml = modifyHtmlContent(responseText, requestedPath);
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