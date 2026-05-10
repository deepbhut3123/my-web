$logoHtml = '<a href="index.html"><div class="logo-text"><span class="logo-ae">AE</span><span class="logo-company">Amee Extrusion LLP</span></div></a>'

# The SVG logo starts with <a href="#"> and contains the svg with specific path
# We target the pattern: <a href="#">\s*<svg ... </svg>\s*</a>
$svgPattern = '(?s)<a href="#">\s*<svg\s+width="136"\s+height="37"[\s\S]*?</svg>\s*</a>'

$files = @("index.html","about.html","product.html","team.html","contact.html")
foreach ($f in $files) {
    $c = Get-Content $f -Raw -Encoding UTF8
    $c = [regex]::Replace($c, $svgPattern, $logoHtml)
    Set-Content $f $c -Encoding UTF8
    Write-Host ("Logo replaced: " + $f)
}
