import gspread
from google.oauth2.service_account import Credentials
import os
import json

alphaInt = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

def mapCell(code: str):  # code like A44 -> ['A', '44']
    alpha_part = ''
    num_part = ''
    
    for char in code:
        if char.isalpha():
            alpha_part += char
        elif char in alphaInt:
            num_part += char
            
    return [alpha_part, num_part] 

def toTextCell(status: str):
    if status == 'passed':
        return 'Pass'
    elif status == 'failed':
        return 'Fail'
    else:
        return '❓'  # Unknown status

scopes = [
    "https://www.googleapis.com/auth/spreadsheets"
]

try:

    creds = Credentials.from_service_account_file(
        "credentials.json",
        scopes=scopes
    )
    
    client = gspread.authorize(creds)
    sheet_id = "1gipNMIg7XRkDlsEb7FsmCHNNcOmlxzLKTCVoYq_eQuY"
    sheet = client.open_by_key(sheet_id)

    # access json fle
    with open('cell-data.json', 'r') as file:
        cell_data = json.load(file)

    with open('../test-results.json', 'r') as file:
        test_results = json.load(file)

    
    # Define 'suites' as a key or list of keys to iterate over test_results
    for suite in test_results.get('suites', []):
        for spec in suite.get('specs', []):
            for test in spec.get('tests', []):
                codeTCList = test.get('annotations')
                codeTC = codeTCList[0]['description'] if codeTCList else None
                cellSheets = cell_data[codeTC]
                col, row = mapCell(cellSheets)
                
                resultsList = test.get('results')
                status = resultsList[0]['status'] if resultsList else None
                
                dateTime = resultsList[0]['startTime'] if resultsList else None
                cellDateTime = cellSheets.replace('I', 'J')

                status = toTextCell(status) if status else '❓'

                # print(f"Updating cell {col}{row} with status '{status}' and dateTime '{dateTime}'")
                # print(f"Cell Sheets: {cellSheets}, Cell DateTime: {cellDateTime}")

                # Set value in the cell as value from test_results
                sheet.values_update(
                    f"{col}{row}",
                    params={'valueInputOption': 'USER_ENTERED'},
                    body={'values': [[status]]}
                )

                # Set date and time in the adjacent cell
                sheet.values_update(
                    f"{cellDateTime}",
                    params={'valueInputOption': 'USER_ENTERED'},
                    body={'values': [[dateTime]]}
                )

    print("Data successfully updated in Google Sheets.")


except FileNotFoundError:
    print("Error: Cannot find the credentials file. Make sure it exists in:", os.getcwd())
except json.JSONDecodeError:
    print("Error: Credential file is not valid JSON")
except Exception as e:
    print(f"Error: {str(e)}")
    print(f"Error type: {type(e).__name__}")
