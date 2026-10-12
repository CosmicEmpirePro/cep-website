# Concurrent static file server with HTTP Range support for large WAV playback.
# Double-click START-PREVIEW.bat, or run: powershell -File start-preview.ps1

$root = $PSScriptRoot
$port = 8770

$code = @"
using System;
using System.IO;
using System.Net;
using System.Text;
using System.Threading;

public class CepStaticServer {
  private readonly string root;
  private readonly HttpListener listener;
  private volatile bool running;

  public CepStaticServer(string root, int port) {
    this.root = Path.GetFullPath(root);
    listener = new HttpListener();
    listener.Prefixes.Add("http://127.0.0.1:" + port + "/");
  }

  public void Start() {
    listener.Start();
    running = true;
    listener.BeginGetContext(OnContext, null);
  }

  public void Stop() {
    running = false;
    try { listener.Stop(); } catch {}
    try { listener.Close(); } catch {}
  }

  private void OnContext(IAsyncResult ar) {
    if (!running) return;
    HttpListenerContext ctx = null;
    try { ctx = listener.EndGetContext(ar); } catch { return; }
    finally {
      if (running) {
        try { listener.BeginGetContext(OnContext, null); } catch {}
      }
    }
    ThreadPool.QueueUserWorkItem(_ => Handle(ctx));
  }

  private static string ContentType(string ext) {
    switch (ext.ToLowerInvariant()) {
      case ".html": return "text/html; charset=utf-8";
      case ".css": return "text/css; charset=utf-8";
      case ".js": return "application/javascript; charset=utf-8";
      case ".svg": return "image/svg+xml";
      case ".woff2": return "font/woff2";
      case ".wav": return "audio/wav";
      case ".mp3": return "audio/mpeg";
      case ".ogg": return "audio/ogg";
      default: return "application/octet-stream";
    }
  }

  private void Handle(HttpListenerContext ctx) {
    try {
      string path = Uri.UnescapeDataString(ctx.Request.Url.LocalPath.TrimStart('/'));
      if (string.IsNullOrWhiteSpace(path)) path = "index.html";
      path = path.Replace('/', Path.DirectorySeparatorChar);
      string full = Path.GetFullPath(Path.Combine(root, path));

      if (!full.StartsWith(root, StringComparison.OrdinalIgnoreCase) ||
          !File.Exists(full)) {
        ctx.Response.StatusCode = 404;
        byte[] msg = Encoding.UTF8.GetBytes("Not found");
        ctx.Response.ContentType = "text/plain; charset=utf-8";
        ctx.Response.OutputStream.Write(msg, 0, msg.Length);
        ctx.Response.Close();
        return;
      }

      var info = new FileInfo(full);
      long length = info.Length;
      ctx.Response.Headers["Accept-Ranges"] = "bytes";
      ctx.Response.Headers["Cache-Control"] = "no-cache";
      ctx.Response.ContentType = ContentType(info.Extension);

      long start = 0;
      long end = length - 1;
      string range = ctx.Request.Headers["Range"];
      if (!string.IsNullOrEmpty(range) && range.StartsWith("bytes=")) {
        string spec = range.Substring(6);
        int dash = spec.IndexOf('-');
        if (dash >= 0) {
          string a = spec.Substring(0, dash);
          string b = spec.Substring(dash + 1);
          if (a.Length > 0) start = long.Parse(a);
          if (b.Length > 0) end = long.Parse(b);
          if (end >= length) end = length - 1;
          if (start < 0) start = 0;
          if (start > end) {
            ctx.Response.StatusCode = 416;
            ctx.Response.AddHeader("Content-Range", "bytes */" + length);
            ctx.Response.Close();
            return;
          }
          ctx.Response.StatusCode = 206;
          ctx.Response.AddHeader("Content-Range", "bytes " + start + "-" + end + "/" + length);
        }
      } else {
        ctx.Response.StatusCode = 200;
      }

      long contentLength = end - start + 1;
      ctx.Response.ContentLength64 = contentLength;

      if (ctx.Request.HttpMethod == "HEAD") {
        ctx.Response.Close();
        return;
      }

      using (var fs = new FileStream(full, FileMode.Open, FileAccess.Read, FileShare.Read)) {
        fs.Seek(start, SeekOrigin.Begin);
        byte[] buffer = new byte[64 * 1024];
        long remaining = contentLength;
        while (remaining > 0) {
          int toRead = (int)Math.Min(buffer.Length, remaining);
          int read = fs.Read(buffer, 0, toRead);
          if (read <= 0) break;
          ctx.Response.OutputStream.Write(buffer, 0, read);
          remaining -= read;
        }
      }
      ctx.Response.OutputStream.Close();
      ctx.Response.Close();
    } catch {
      try { ctx.Response.StatusCode = 500; ctx.Response.Close(); } catch {}
    }
  }
}
"@

Add-Type -TypeDefinition $code -Language CSharp

$server = New-Object CepStaticServer($root, $port)
$server.Start()

Write-Host ""
Write-Host " Cosmic Empire preview server (WAV-friendly)"
Write-Host " Serving: $root"
Write-Host " Open:    http://127.0.0.1:$port/portfolio.html"
Write-Host " Press Ctrl+C to stop"
Write-Host ""

try {
  while ($true) { Start-Sleep -Seconds 1 }
} finally {
  $server.Stop()
}
