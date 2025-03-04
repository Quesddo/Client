#!/bin/sh
cd ../
mkdir output
cp -R ./Client/* ./Client/.[!.]* ./output 2>/dev/null 
cp -R ./output ./Client/