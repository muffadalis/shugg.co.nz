# List of all img URLs (paste yours here)
$imgUrls = @(
"https://provista.co.nz/wp-content/uploads/2022/09/provista-new-logo_2022.png"
"https://provista.co.nz/wp-content/uploads/2022/09/provista-new-logo_2022-72dpi.png"
"https://provista.co.nz/wp-content/uploads/2018/07/framed-square.jpg"
"https://provista.co.nz/wp-content/uploads/2018/07/colour-chart.jpg"
"https://provista.co.nz/wp-content/uploads/2018/07/Manor-top-fixed1.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/facebook-icon2.png"
"https://provista.co.nz/wp-content/uploads/2018/08/instagram-icon2.png"
"https://provista.co.nz/wp-content/uploads/2022/09/provista-new-logo_2022.png"
"https://provista.co.nz/wp-content/uploads/2022/09/provista-new-logo_2022-72dpi.png"
"https://provista.co.nz/wp-content/themes/dt-the7/images/the7-chevron-down.svg"
"https://provista.co.nz/wp-content/plugins/js_composer/assets/lib/vendor/dist/lightbox2/dist/images/prev.png"
"https://provista.co.nz/wp-content/plugins/js_composer/assets/lib/vendor/dist/lightbox2/dist/images/next.png"
"https://provista.co.nz/wp-content/plugins/js_composer/assets/lib/vendor/dist/lightbox2/dist/images/loading.gif"
"https://provista.co.nz/wp-content/plugins/js_composer/assets/lib/vendor/dist/lightbox2/dist/images/close.png"
"https://provista.co.nz/wp-content/uploads/2018/08/specifier.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/100AA.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/100AA1.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/100AA2.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/100AA3.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/100aa4.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/100cc.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/100ff.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/100gg.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/100hh.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/20180704_122919.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Decor-glazed1-1024x706.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/DSCF0071-1024x768.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/100AA.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/EuroManor.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/FramedDeck1a.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/FramedTint.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Gills10a.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Gills10b.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/home1.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Manor-top-airo-1024x769.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Manor-with-Airo-handrail.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Manor-Euro-Slat.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Manor9-1024x551.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Picture-063-1024x761.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Stairs-manor-hiti.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Stairs-manor-hiti1.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Stmaroun23.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Top-fixed-Manor.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/top-fixed.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/top-fixed2.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Vistaside-fixed200-1024x541.jpg"
"https://www.gstatic.com/recaptcha/api2/logo_48.png"
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
$folder = "static\assets\img\balustrades\framed-glass"
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
    Write-Host "  - "/assets/img/balustrades/framed-glass/$fileName""
}

Write-Host ""
Write-Host "Done. Saved to $folder"
