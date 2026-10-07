# TypeSetu 1-Click Push & Deployment Script for kumaranand2506
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   TypeSetu (टाइपसेतु) - Push to GitHub & Deploy" -ForegroundColor Green
Write-Host "   Account: https://github.com/kumaranand2506" -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Check if git repository is ready
Set-Location -Path "D:\typing"

Write-Host "`n[1/3] Checking Git Status and Branch..." -ForegroundColor White
git branch -M main
git remote set-url origin "https://github.com/kumaranand2506/typesetu.git"

Write-Host "`n[2/3] IMPORTANT STEP:" -ForegroundColor Yellow
Write-Host "If you have not created the 'typesetu' repository on GitHub yet:" -ForegroundColor White
Write-Host "1. Open: https://github.com/new" -ForegroundColor Cyan
Write-Host "2. Repository name: typesetu" -ForegroundColor Cyan
Write-Host "3. Keep it 'Public' and DO NOT check 'Add a README'" -ForegroundColor Cyan
Write-Host "4. Click 'Create repository'" -ForegroundColor Cyan
Write-Host ""
$confirm = Read-Host "Have you created the 'typesetu' repository on GitHub? (y/n)"

if ($confirm -eq 'y' -or $confirm -eq 'Y') {
    Write-Host "`n[3/3] Pushing to GitHub (Sign in with your browser if prompted)..." -ForegroundColor Green
    git push -u origin main

    if ($LASTEXITCODE -eq 0) {
        Write-Host "`nSUCCESS! Your code is now live on GitHub:" -ForegroundColor Green
        Write-Host "👉 https://github.com/kumaranand2506/typesetu" -ForegroundColor Cyan
        Write-Host "`nAutomatic deployment to GitHub Pages has started via GitHub Actions!" -ForegroundColor Green
        Write-Host "In 2 minutes, your website will be live at:" -ForegroundColor White
        Write-Host "🌐 https://kumaranand2506.github.io/typesetu/" -ForegroundColor Yellow
    } else {
        Write-Host "`nPush encountered an issue. Please verify your GitHub login or token." -ForegroundColor Red
    }
} else {
    Write-Host "Please create the repository first at https://github.com/new and rerun this script!" -ForegroundColor Yellow
}
