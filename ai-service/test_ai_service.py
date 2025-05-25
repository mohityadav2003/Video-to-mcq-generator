import requests

file_path = 'sample.m4v'  # Change to your filename

with open(file_path, 'rb') as f:
    files = {'file': (file_path, f, 'video/mp4')}
    response = requests.post('http://127.0.0.1:8000/transcribe', files=files)

print("Status Code:", response.status_code)
print("Response JSON:")
print(response.json())
