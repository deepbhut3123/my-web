$files = @("index.html","about.html","product.html","team.html","contact.html")
foreach ($f in $files) {
    $c = Get-Content $f -Raw -Encoding UTF8
    # Fix absolute Windows paths to relative paths
    $c = $c -replace 'D:/My Web/img/','img/'
    $c = $c -replace 'D:\\My Web\\img\\','img/'
    Set-Content $f $c -Encoding UTF8
    Write-Host ("Fixed paths: " + $f)
}
