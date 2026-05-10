$files = @("index.html","about.html","product.html","team.html","contact.html")
foreach ($f in $files) {
    $c = Get-Content $f -Raw -Encoding UTF8
    $c = $c -replace 'EdgeKart','Amee Extrusion LLP'
    $c = $c -replace 'Swati Industries','Amee Extrusion LLP'
    $c = $c -replace 'Demo Industries','Amee Extrusion LLP'
    $c = $c -replace 'DemoTech Pvt Ltd','Amee Extrusion LLP'
    $c = $c -replace 'sales@eyewear\.in','amee.extrusion@gmail.com'
    $c = $c -replace 'sales@swatindustries\.com','amee.extrusion@gmail.com'
    Set-Content $f $c -Encoding UTF8
    Write-Host ("Done: " + $f)
}
