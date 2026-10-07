@echo off
title TypeSetu - Push to GitHub
color 0b
echo ================================================================
echo    TypeSetu (टाइपसेतु) - 1-Click Push to GitHub
echo    GitHub Account: kumaranand2506
echo    Project Folder: D:\typing
echo ================================================================
echo.

cd /d "D:\typing"

echo [Step 1] Opening GitHub in your browser to create the repository...
start https://github.com/new
echo.
echo Please create the repository on GitHub:
echo   - Repository name: typesetu
echo   - Keep it Public
echo   - DO NOT check "Add a README"
echo   - Click "Create repository"
echo.
echo ================================================================
pause
echo.
echo [Step 2] Pushing your project to GitHub...
echo.

git branch -M main
git remote set-url origin https://github.com/kumaranand2506/typesetu.git
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ================================================================
    echo    SUCCESS! Project pushed to GitHub successfully!
    echo    Link: https://github.com/kumaranand2506/typesetu
    echo.
    echo    GitHub Actions is now deploying it to GitHub Pages!
    echo    Your site will be live at:
    echo    https://kumaranand2506.github.io/typesetu/
    echo ================================================================
) else (
    echo.
    echo [Notice] If a browser popup appeared, please sign in with GitHub.
    echo If push failed, make sure you created the 'typesetu' repo on GitHub first.
)

echo.
pause
