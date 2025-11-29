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
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5210-optimised.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/facebook-icon2.png"
"https://provista.co.nz/wp-content/uploads/2018/08/instagram-icon2.png"
"https://provista.co.nz/wp-content/uploads/2022/09/provista-new-logo_2022-72dpi.png"
"https://provista.co.nz/wp-content/plugins/js_composer/assets/lib/vendor/dist/lightbox2/dist/images/prev.png"
"https://provista.co.nz/wp-content/plugins/js_composer/assets/lib/vendor/dist/lightbox2/dist/images/next.png"
"https://provista.co.nz/wp-content/plugins/js_composer/assets/lib/vendor/dist/lightbox2/dist/images/close.png"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5225-optimised.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5236.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5235.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5233.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5232.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5231.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5224.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5223.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5222.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5221.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5205.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5204.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5203.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5236.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5235.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5233.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5232.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5231.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5221.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5205.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5204.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5203.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5224.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5223.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5222.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5202.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5201.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5195.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5194.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5193.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5190.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5189.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5188.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5187.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5186.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5185.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5184.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5240.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5241.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5243.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5245.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5246.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5248.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5254.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5257.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5260.jpg"
"https://provista.co.nz/wp-content/uploads/2020/11/IMG_5239.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/20230830_102322-edited-scaled.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/20230830_102030-edited-scaled.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/20230830_102441-scaled.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/20230830_102119-scaled.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/IMG_6559-scaled.jpeg"
"https://provista.co.nz/wp-content/uploads/2024/08/IMG_7470-scaled.jpeg"
"https://provista.co.nz/wp-content/uploads/2024/08/IMG_6558-scaled.jpeg"
"https://provista.co.nz/wp-content/uploads/2024/08/IMG_7481-scaled.jpeg"
"https://provista.co.nz/wp-content/uploads/2024/08/IMG_7485-scaled.jpeg"
"https://provista.co.nz/wp-content/uploads/2024/08/WH11-scaled.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/WH12-scaled.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/Fin-50-Full-height-internal.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/2.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/1.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/3.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/Eurofin-Bayview1.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/156-Blenheim-2.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/156-Blenheim-1.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/1000002216.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/1000002213.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/1000002211.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/1000002206.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/1000002203.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/1000002202.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/1000002197.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/5-Dellwood-4.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/5-Dellwood-3.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/5-Dellwood-2.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/5-Dellwood-1.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/IMG_4148-scaled.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/IMG_4147-scaled.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/Fin-50-Stairs-full-height.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/IMG_4180-scaled.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/IMG_4177-scaled.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/IMG_4178-scaled.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/IMG_4176-scaled.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/WH12-1-scaled.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/WH11-1-scaled.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/WH10-scaled.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/WH9-scaled.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/WH8-scaled.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/WH6-scaled.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/WH4-scaled.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/WH7-scaled.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/WH5-scaled.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/WH3-scaled.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/WH2-scaled.jpg"
"https://provista.co.nz/wp-content/uploads/2024/08/WH1-scaled.jpg"
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
$folder = "static\assets\img\balustrades\euro-fin-balustrade"
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

