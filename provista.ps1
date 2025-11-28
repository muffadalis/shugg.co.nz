# List of all img URLs (paste yours here)
$imgUrls = @(
"https://provista.co.nz/wp-content/uploads/2022/09/provista-new-logo_2022-72dpi.png",
"https://provista.co.nz/wp-content/uploads/2018/08/Villa1as2.jpg",
"https://provista.co.nz/wp-content/uploads/2018/07/colour-chart.jpg",
"https://provista.co.nz/wp-content/uploads/2018/08/aaa111-1.jpg",
"https://provista.co.nz/wp-content/uploads/2018/08/facebook-icon2.png",
"https://provista.co.nz/wp-content/uploads/2018/08/instagram-icon2.png",
"https://provista.co.nz/wp-content/themes/dt-the7/images/the7-chevron-down.svg",
"https://provista.co.nz/wp-content/plugins/js_composer/assets/lib/vendor/dist/lightbox2/dist/images/prev.png",
"https://provista.co.nz/wp-content/plugins/js_composer/assets/lib/vendor/dist/lightbox2/dist/images/next.png",
"https://provista.co.nz/wp-content/plugins/js_composer/assets/lib/vendor/dist/lightbox2/dist/images/loading.gif",
"https://provista.co.nz/wp-content/plugins/js_composer/assets/lib/vendor/dist/lightbox2/dist/images/close.png",
"data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
"https://provista.co.nz/wp-content/uploads/2018/08/Villa1cb.jpg",
"https://provista.co.nz/wp-content/uploads/2018/08/aaa111-1024x605.jpg",
"https://provista.co.nz/wp-content/uploads/2018/08/Aluminum-baluster-and-euro-slat-1024x683.jpg",
"https://provista.co.nz/wp-content/uploads/2018/08/Aluminum-baluster-and-euro-slat1-1024x683.jpg",
"https://provista.co.nz/wp-content/uploads/2018/08/Aluminum-baluster-and-euro-slat2-1024x683.jpg",
"https://provista.co.nz/wp-content/uploads/2018/08/Baluster1-1024x651.jpg",
"https://provista.co.nz/wp-content/uploads/2018/08/Euro-Slat-Stairs-a-1024x618.jpg",
"https://provista.co.nz/wp-content/uploads/2018/08/Euro-Slat-Stairs-b-1024x683.jpg",
"https://provista.co.nz/wp-content/uploads/2018/08/Marina3-1024x768.jpg",
"https://provista.co.nz/wp-content/uploads/2018/08/Side-fixed-Aluminum-baluster-Villa-1024x667.jpg",
"https://provista.co.nz/wp-content/uploads/2018/08/Villa-euro-1024x768.jpg",
"https://provista.co.nz/wp-content/uploads/2018/08/villa-face-fixedas-1024x626.jpg",
"https://provista.co.nz/wp-content/uploads/2018/08/Villa-side-fixed-4-1024x768.jpg",
"https://provista.co.nz/wp-content/uploads/2018/08/Villa-stairs2-1024x768.jpg",
"https://provista.co.nz/wp-content/uploads/2018/08/Villa-stairs2a-1024x768.jpg",
"https://provista.co.nz/wp-content/uploads/2018/08/Villa1-1024x576.jpg",
"https://provista.co.nz/wp-content/uploads/2018/08/Villa1as-1024x693.jpg",
"https://provista.co.nz/wp-content/uploads/2018/08/Villa1cb-1024x683.jpg",
"https://provista.co.nz/wp-content/uploads/2018/08/Villa2-1024x576.jpg",
"https://provista.co.nz/wp-content/uploads/2018/08/Villa5-1024x681.jpg",
"https://provista.co.nz/wp-content/uploads/2018/08/Villatop-fixed-4-1024x637.jpg"
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
$folder = "provista-product-images"
New-Item -ItemType Directory -Force -Path $folder | Out-Null

# YAML OUTPUT HEADER
Write-Host ""
Write-Host "image:"

foreach ($url in $filtered) {
    $fileName = Split-Path $url -Leaf
    $dest = Join-Path $folder $fileName

    # Download file
    # Write-Host "Downloading $fileName"
    # Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing

    # YAML FORMATTED LINE
    Write-Host "  - "/assets/img/balustrades/aluminium/$fileName""
}

Write-Host ""
Write-Host "Done. Saved to $folder"
