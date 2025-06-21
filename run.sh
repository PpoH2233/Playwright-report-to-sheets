#!/bin/bash

# don't forgot to chmod +x this file 

npx playwright test
cd ./google_sheets_api
python3 main.py
