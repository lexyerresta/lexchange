# Auto commit and push script for Lexchange (Windows)

Write-Host "Adding all changes..." -ForegroundColor Green
git add .

$commitMsg = Read-Host "Enter commit message (or press Enter for default)"

if ([string]::IsNullOrWhiteSpace($commitMsg)) {
    $commitMsg = "Update: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
}

Write-Host "Committing with message: $commitMsg" -ForegroundColor Yellow
git commit -m $commitMsg

Write-Host "Pushing to origin main..." -ForegroundColor Cyan
git push origin main

Write-Host "Done!" -ForegroundColor Green
