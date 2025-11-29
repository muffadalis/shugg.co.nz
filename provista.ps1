function Convert-PathFormat {
    param(
        [Parameter(Mandatory=$true)]
        [string]$Path
    )
    
    # Remove "static\" from the beginning if it exists
    $path = $path -replace '^static\\', ''
    
    # Replace all backslashes with forward slashes
    $path = $path -replace '\\', '/'
    
    # Add leading forward slash if not present
    if (-not $path.StartsWith('/')) {
        $path = '/' + $path
    }
    
    return $path
}

# List of all img URLs (paste yours here)
$imgUrls = @(
"https://provista.co.nz/wp-content/uploads/2022/09/provista-new-logo_2022-72dpi.png"
"https://provista.co.nz/wp-content/uploads/2018/07/Mask-Group-8-1.png"
"https://provista.co.nz/wp-content/uploads/2018/07/colour-chart.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/euro3.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/facebook-icon2.png"
"https://provista.co.nz/wp-content/uploads/2018/08/instagram-icon2.png"
"https://provista.co.nz/wp-content/uploads/2022/09/provista-new-logo_2022-72dpi.png"
"https://provista.co.nz/wp-content/plugins/js_composer/assets/lib/vendor/dist/lightbox2/dist/images/prev.png"
"https://provista.co.nz/wp-content/plugins/js_composer/assets/lib/vendor/dist/lightbox2/dist/images/next.png"
"https://provista.co.nz/wp-content/plugins/js_composer/assets/lib/vendor/dist/lightbox2/dist/images/close.png"
"https://provista.co.nz/wp-content/uploads/2018/07/aaaeee-e1533277998222.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/aaabbb.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/aaaccc.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/aaaddd.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/aaaeee.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/aaafff.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Euro-70mm.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Euro-slat-1000mm-high-side-fixed.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Euro-Slat-Apmt.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Euro-Slat-Stairs.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Euro-Slat2.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Euro1.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Eurogate.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/aaabbb.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/aaaccc.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/aaaddd.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/aaaeee.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/aaafff.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Euro-70mm.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Euro-slat-1000mm-high-side-fixed.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Euro-Slat-Apmt.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Euro-Slat-Stairs.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Euro-Slat2.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Euro1.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Eurogate.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/EuroManor-1.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Euroslat-balustrade.3.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Euroslat-fence-and-frameless-channel.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Euroslat-fence.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/euroslat-side-fixed.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Euroslat1.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Euroslat1b.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Euroslat3.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Euroslat31.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/euroslatbalustrade1.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/IMG_0528.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/IMG_0984.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/IMG_1747-1.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Manor-Euro-Slat-2.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Manor-Euro-Slat-3.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Manor-Euro-Slat-4.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Manor-Euro-Slat-1.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Manoreuro10-1024x706.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Manoreuro11-1024x768.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Manoreuro12.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/NSGC-etc-007.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/NSGC-etc-011.jpg"
)

# Filter only REAL product images
$filtered = $imgUrls |
    Where-Object {
        $_ -like "https://provista.co.nz/wp-content/uploads/*" -and
        $_ -notlike "*logo*" -and
        $_ -notlike "*icon*" -and
        $_ -notlike "*.svg" -and
        $_ -notlike "*base64*" -and
        $_ -notmatch "colour-chart"
    } |
    Sort-Object -Unique

Write-Host "Filtered image count:" $filtered.Count

# Save folder
$folder = "static\assets\img\balustrades\euro-slat-privacy-fence"
New-Item -ItemType Directory -Force -Path $folder | Out-Null

# YAML OUTPUT HEADER
Write-Host ""
Write-Host "image:"

foreach ($url in $filtered) {
    $fileName = Split-Path $url -Leaf
    $dest = Join-Path $folder $fileName

    # Download file
    # Write-Host "Downloading $fileName"
    Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing

    # YAML FORMATTED LINE
    Write-Host "  - "$(Convert-PathFormat -Path $dest)""
}

Write-Host ""
Write-Host "Done. Saved to $folder"

