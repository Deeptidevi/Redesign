$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add('http://localhost:8080/')
$listener.Start()
Write-Host "Server listening on http://localhost:8080/"

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $reqPath = $context.Request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrEmpty($reqPath)) {
            $reqPath = 'index.html'
        }
        
        $filePath = Join-Path "d:\Desktop\NewYoutube" $reqPath
        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            if ($filePath.EndsWith('.css')) {
                $context.Response.ContentType = 'text/css'
            } elseif ($filePath.EndsWith('.js')) {
                $context.Response.ContentType = 'application/javascript'
            } elseif ($filePath.EndsWith('.html')) {
                $context.Response.ContentType = 'text/html'
            }
            $context.Response.ContentLength64 = $bytes.Length
            $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $context.Response.StatusCode = 404
        }
        $context.Response.OutputStream.Close()
    } catch {
        # continue loop
    }
}