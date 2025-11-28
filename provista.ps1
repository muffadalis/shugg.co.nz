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
"https://provista.co.nz/wp-content/uploads/2018/08/pool3.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/facebook-icon2.png"
"https://provista.co.nz/wp-content/uploads/2018/08/instagram-icon2.png"
"https://provista.co.nz/wp-content/uploads/2022/09/provista-new-logo_2022-72dpi.png"
"https://provista.co.nz/wp-content/plugins/js_composer/assets/lib/vendor/dist/lightbox2/dist/images/prev.png"
"https://provista.co.nz/wp-content/plugins/js_composer/assets/lib/vendor/dist/lightbox2/dist/images/next.png"
"https://provista.co.nz/wp-content/plugins/js_composer/assets/lib/vendor/dist/lightbox2/dist/images/loading.gif"
"https://provista.co.nz/wp-content/plugins/js_composer/assets/lib/vendor/dist/lightbox2/dist/images/close.png"
"https://provista.co.nz/wp-content/uploads/2018/07/111b.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/111.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/111a.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/111b.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/111c.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/111c1.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/111d.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/111e.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/111f.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/20170502_102541.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/20170502_102556.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/20171222_095733.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/20171222_095733a.jpg"
"https://www.gstatic.com/recaptcha/api2/logo_48.png"
"https://provista.co.nz/wp-content/uploads/2018/08/111.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/111a.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/111b.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/111c.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/111c1.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/111d.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/111e.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/111f.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/20170502_102541.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/20170502_102556.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/20171222_095733.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/20171222_095733a.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/ALaker4.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/ALaker5.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/aluminum-6mm-glass-1024x621.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Boord214-002.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Boord214-003.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Boord214-007.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Euro-Slat-and-vista-pool-fence.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/EuroPool2.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Euroslatvistapool.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/FF33-Okura-003.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/FF69new-018.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/FF69new-023.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/FlessGateVistaSPG2.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/FlessSpigPool.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Framed-123c-1024x605.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Frameless-glass-clamp.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Frameless-Ultimate-Spigot12.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Freshfields69-001.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/IMG_1444.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/IMG_2591-Copy.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/IMG_2593.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/IMG_2594.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/IMG_2595.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Jan27th-021.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/NewSpig1-1024x768.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Oakford9Reva.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/OldNth338Spigot-013.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/pool-spigots-framless-glass.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/PoolBroc.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Reva-spa-1024x768.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Reva12-1024x578.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Reva12cJPG-1024x606.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Reva121-1024x512.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Reva1112-1024x739.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/reva1203-1024x705.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Reva1211-1024x659.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Side-fixed-frameless-glass-pool-fence.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/SPG-Gate1.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Spig-Pool.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/SpigotPool2.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/SS-Spigot-Pool.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/swim-pool-fence.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Tudor-pool-1024x682.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Vetro-framed-gate-1024x682.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/vista-euroslat1.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Vista-pool-3-1024x682.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/Vista-side402-1024x921.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/VistaEuroSPG3.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/VistaPoolFramedGate.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/VistaPoolFramedhheee-1024x689.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/VistaPoolFramedhhee-1024x678.jpg"
"https://provista.co.nz/wp-content/uploads/2018/08/VistaPoolFramedhhe-1024x682.jpg"
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
$folder = "static\assets\img\balustrades\pool-fences"
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
    Write-Host "  - "$(Convert-PathFormat -Path $dest)""
}

Write-Host ""
Write-Host "Done. Saved to $folder"

