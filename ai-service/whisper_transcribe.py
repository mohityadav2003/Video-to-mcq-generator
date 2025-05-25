import whisper
import os
import tempfile
from datetime import timedelta

model = whisper.load_model("small")

def format_timestamp(seconds: float):
    return str(timedelta(seconds=int(seconds)))

def transcribe_video(file_bytes: bytes, filename: str):
    # Save uploaded file to a temp file
    with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(filename)[1]) as tmp:
        tmp.write(file_bytes)
        tmp_path = tmp.name

    result = model.transcribe(tmp_path)
    full_text = result["text"]
    segments = result.get("segments", [])

    # Segment into 5-minute intervals
    segmented = []
    current_chunk = ""
    current_start = 0

    for seg in segments:
        if seg["start"] >= current_start + 300:
            segmented.append({
                "start_time": format_timestamp(current_start),
                "end_time": format_timestamp(seg["start"]),
                "text": current_chunk.strip()
            })
            current_start = seg["start"]
            current_chunk = ""

        current_chunk += seg["text"] + " "

    # Append remaining text
    if current_chunk.strip():
        segmented.append({
            "start_time": format_timestamp(current_start),
            "end_time": format_timestamp(segments[-1]["end"]),
            "text": current_chunk.strip()
        })

    os.remove(tmp_path)

    return {
        "full_transcript": full_text.strip(),
        "segments": segmented
    }
