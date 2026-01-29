from fastapi import FastAPI
import openai

app = FastAPI()
openai.api_key = "YOUR_API_KEY"  # 환경변수로 관리 권장

@app.post("/generate")
def generate_text(prompt: str):
    response = openai.ChatCompletion.create(
        model="gpt-5.2",   # 최신 모델 선택 가능
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ]
    )
    return {"response": response["choices"][0]["message"]["content"]}
