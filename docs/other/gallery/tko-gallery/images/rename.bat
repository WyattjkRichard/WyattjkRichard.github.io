@echo off
setlocal enabledelayedexpansion

rem === Step 1: Find highest index among existing image-*.png ===
set max=0
for %%f in (image-*.png) do (
    set "name=%%~nf"
    for /f "tokens=2 delims=-" %%a in ("!name!") do (
        if %%a gtr !max! set /a max=%%a
    )
)

echo Highest image index found: %max%

rem === Step 2: Rename download*.png files ===
set /a counter=max+1
for %%f in (download*.png) do (
    echo Renaming "%%f" to "image-!counter!.png"
    ren "%%f" "image-!counter!.png"
    set /a counter+=1
)

echo.
echo Done!
pause
