from fastapi import FastAPI

app = FastAPI(title="Paper Trading API")

@app.get("/health")
def health():
    return {"ok": True}
