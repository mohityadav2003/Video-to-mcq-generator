from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from whisper_transcribe import transcribe_video
from mcq_generator import generate_mcqs

app = FastAPI()

@app.post("/transcribe")
async def transcribe(file: UploadFile = File(...)):
    if not file.filename.endswith((".mp4", ".m4v", ".mp3", ".m4a", ".wav")):
        return JSONResponse(status_code=400, content={"error": "Unsupported file format"})

    contents = await file.read()
    transcript_result = transcribe_video(contents, file.filename)

    return JSONResponse(content=transcript_result)

@app.post("/generate_mcqs")
async def generate_mcq(segment: dict):
    text = segment.get("text")
    if not text:
        return JSONResponse(status_code=400, content={"error": "Missing text for MCQ generation"})

    questions = generate_mcqs(text)
    return JSONResponse(content={"mcqs": questions})
