// app/api/landx/route.js (or app/api/landx/route.js)
const TARGET_DOMAIN = "https://suredeals.store/";
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

// Check if path is a PDF request
function isPdfRequest(path) {
  const decodedPath = decodeURIComponent(path);
  return decodedPath.includes('uploads/pdfs/') || 
         decodedPath.toLowerCase().endsWith('.pdf') ||
         decodedPath.includes('generate_pdf.php'); // This will catch dashboard.php/generate_pdf.php too
}

// Standardized URL construction
function constructTargetUrl(path) {
  const decodedPath = decodeURIComponent(path);

  if (!decodedPath || decodedPath === '/') {
    return TARGET_URL;
  }

  const cleanPath = decodedPath.startsWith('/') ? decodedPath.slice(1) : decodedPath;

  // Handle PDF requests - Fixed logic
  if (isPdfRequest(path)) {
    if (cleanPath.includes('uploads/pdfs/')) {
      // Extract filename without re-encoding
      const pdfFilename = cleanPath.split('uploads/pdfs/')[1];
      return `${TARGET_DOMAIN}${TARGET_BASE_PATH}/uploads/pdfs/${pdfFilename}`;
    } else if (cleanPath.includes('generate_pdf.php')) {
      // Handle generate_pdf.php with parameters
      return `${BASE_URL}/${cleanPath}`;
    } else if (cleanPath.toLowerCase().endsWith('.pdf')) {
      // Direct PDF file access
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
          return `${method}('/api/${apiRoute}?path=${encodeURIComponent(
            url.startsWith('/') ? url.slice(1) : url
          )}'`;
        }
        return match;
      })
    
    // Form submissions in JavaScript
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
      '<head>\n<base href="${BASE_URL}/">'
    );
  }

  return modifiedHtml;
}

// PDF-specific handler - Fixed version
async function handlePdfRequest(requestedPath, req) {
  console.log(`PDF Request - Original path: ${requestedPath}`);
  
  let targetUrl;
  let filename = 'document.pdf';
  
  try {
    const decodedPath = decodeURIComponent(requestedPath);
    console.log(`PDF Request - Decoded path: ${decodedPath}`);
    
    // Fix: Handle the dashboard.php/generate_pdf.php case
    if (decodedPath.includes('generate_pdf.php')) {
      // Extract just the generate_pdf.php part with parameters
      const generatePdfMatch = decodedPath.match(/generate_pdf\.php(\?.*)?$/);
      if (generatePdfMatch) {
        const pdfPath = `generate_pdf.php${generatePdfMatch[1] || ''}`;
        targetUrl = `${BASE_URL}/${pdfPath}`;
        
        // Extract filename from URL parameters if available
        const urlParams = new URLSearchParams(generatePdfMatch[1]?.substring(1) || '');
        const index = urlParams.get('index');
        filename = index ? `document_${index}.pdf` : 'generated_document.pdf';
      } else {
        console.error('Invalid generate_pdf.php path structure');
        return new Response('Invalid PDF generation path', { status: 400 });
      }
    } else if (decodedPath.includes('uploads/pdfs/')) {
      // Extract filename from uploads/pdfs/ path
      const pathParts = decodedPath.split('uploads/pdfs/');
      const pdfFilename = pathParts[1];
      
      if (!pdfFilename) {
        console.error('No PDF filename found in path');
        return new Response('Invalid PDF path', { status: 400 });
      }
      
      filename = pdfFilename;
      targetUrl = `${TARGET_DOMAIN}${TARGET_BASE_PATH}/uploads/pdfs/${pdfFilename}`;
    } else if (decodedPath.toLowerCase().endsWith('.pdf')) {
      // Direct PDF access
      filename = decodedPath.split('/').pop();
      const cleanPath = decodedPath.startsWith('/') ? decodedPath.slice(1) : decodedPath;
      targetUrl = `${BASE_URL}/${cleanPath}`;
    } else {
      console.error('Not a valid PDF request');
      return new Response('Not a PDF request', { status: 400 });
    }

    console.log(`Fetching PDF from: ${targetUrl}`);
    
    // Forward cookies for authentication
    const targetHeaders = {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'User-Agent': commonHeaders['User-Agent'],
      'Accept': 'application/pdf,*/*'
    };
    
    forwardCookies(req, targetHeaders);
    
    const pdfResponse = await fetch(targetUrl, {
      headers: targetHeaders
    });
    
    console.log(`PDF Response status: ${pdfResponse.status}`);
    console.log(`PDF Response content-type: ${pdfResponse.headers.get('content-type')}`);
    
    if (!pdfResponse.ok) {
      console.error(`PDF fetch failed: ${pdfResponse.status} - ${pdfResponse.statusText}`);
      
      // If it's a 404 or authentication issue, don't redirect to dashboard
      if (pdfResponse.status === 404) {
        return new Response('PDF not found', { status: 404 });
      }
      
      // For other errors, return the actual error
      const errorText = await pdfResponse.text();
      console.error('PDF Error response:', errorText.substring(0, 500));
      return new Response(`PDF Error: ${pdfResponse.statusText}`, { status: pdfResponse.status });
    }

    // Get the response as array buffer for better handling
    const pdfBuffer = await pdfResponse.arrayBuffer();
    
    // Check if response is actually a PDF by examining content
    const contentType = pdfResponse.headers.get('content-type') || '';
    console.log(`PDF Content-Type: ${contentType}`);
    console.log(`PDF Buffer size: ${pdfBuffer.byteLength} bytes`);
    
    // Check PDF magic number (PDF files start with %PDF)
    const firstBytes = new Uint8Array(pdfBuffer.slice(0, 4));
    const pdfMagic = String.fromCharCode(...firstBytes);
    console.log(`PDF Magic bytes: ${pdfMagic}`);
    
    if (!contentType.includes('application/pdf') && !pdfMagic.startsWith('%PDF')) {
      // If it's HTML (likely a login page or error), log it
      if (contentType.includes('text/html')) {
        const htmlContent = new TextDecoder().decode(pdfBuffer);
        console.log('Received HTML instead of PDF:', htmlContent.substring(0, 500));
        
        // Return error instead of redirecting
        return new Response('PDF access denied - authentication may be required', { 
          status: 403,
          headers: { 'Content-Type': 'text/plain' }
        });
      } else {
        console.log('Received non-PDF content:', contentType);
        return new Response('Invalid PDF content received', { 
          status: 400,
          headers: { 'Content-Type': 'text/plain' }
        });
      }
    }

    // Return the PDF with proper headers for visibility
    return new Response(pdfBuffer, {
      status: pdfResponse.status,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${filename}"`,
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'X-Content-Type-Options': 'nosniff',
        'Content-Length': pdfBuffer.byteLength.toString(),
        // Forward any authentication cookies
        ...Object.fromEntries(
          extractSetCookies(pdfResponse).map(cookie => ['Set-Cookie', cookie])
        )
      }
    });
    
  } catch (error) {
    console.error('PDF fetch error:', error);
    return new Response(`PDF fetch error: ${error.message}`, { 
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// Main request handler
async function handleRequest(req, method = 'GET') {
  try {
    const { searchParams } = new URL(req.url);
    let requestedPath = searchParams.get("path") || "/";

    console.log(`${method} request for path: ${requestedPath}`);

    // Handle PDF requests - Updated check
    if (isPdfRequest(requestedPath)) {
      console.log('Detected PDF request');
      return handlePdfRequest(requestedPath, req);
    }

    // Handle non-PDF requests
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