from fastapi import FastAPI
import uvicorn

app = FastAPI()

@app.get('/health')
def health():
    return {'status': 'healthy'}

@app.post('/predict')
def predict():
    return {'prediction': 'result'}

if __name__ == '__main__':
    print("Hello from ml-service!")
    uvicorn.run(app, host='0.0.0.0', port=5000)
