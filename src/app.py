from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI()

# Serve static files, such as HTML and JSON data
app.mount("/static", StaticFiles(directory="static"), name="static")
app.mount("/src/js", StaticFiles(directory="src/js"), name="js")

@app.get("/")
def read_root():
    # Serve your main HTML file when the root is accessed
    return FileResponse('static/index.html')
