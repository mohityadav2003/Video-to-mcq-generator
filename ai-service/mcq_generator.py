import requests
import json

OLLAMA_API_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "llama3" 

def generate_mcqs(segment_text):
    prompt = f"""
Generate 1 multiple choice question from the following lecture segment.
Return the response in JSON format with the following structure:
{{
    "question": "The question text",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": "The correct option (A, B, C, or D)"
}}

Segment:
\"\"\"
{segment_text}
\"\"\"
"""

    response = requests.post(OLLAMA_API_URL, json={
        "model": "llama3",
        "prompt": prompt,
        "stream": False
    })

    if response.status_code == 200:
        try:
            # Try to parse the response as JSON
            mcq_data = json.loads(response.json()["response"])
            return [mcq_data]  # Return as array since schema expects array of questions
        except json.JSONDecodeError:
            # If parsing fails, return a default format
            return [{
                "question": "Failed to generate question",
                "options": ["A", "B", "C", "D"],
                "answer": "A"
            }]
    else:
        return [{
            "question": "LLM generation failed",
            "options": ["A", "B", "C", "D"],
            "answer": "A"
        }]
