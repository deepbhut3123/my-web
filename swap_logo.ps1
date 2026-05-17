$logoNew = '<a href="index.html"><img src="img/amee_logo.jpeg" alt="Amee Extrusion LLP" class="logo-img"></a>'

$files = @("index.html","about.html","product.html","team.html","contact.html")
foreach ($f in $files) {
    $c = Get-Content $f -Raw -Encoding UTF8
    # Replace the logo-text div pattern (with any href)
    $pattern = '(?s)<a[^>]*href="[^"]*"[^>]*>\s*<div class="logo-text">[\s\S]*?</div>\s*</a>'
    $c = [regex]::Replace($c, $pattern, $logoNew)
    Set-Content $f $c -Encoding UTF8
    Write-Host ("Logo img set: " + $f)
}
