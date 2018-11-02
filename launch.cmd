@echo off
color 02
:start
set /p FILENAME= What file would you like to run with node?  
cls
set OLDD=%CD%
set COMM=%CD%\NodeJS\node.exe
cd %COMM%
cls
%COMM% %OLDD%\%FILENAME%
echo.
echo.
echo Finished running that py document
goto start