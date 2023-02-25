FROM python:3.8-slim

RUN pip install -r requirements.txt

WORKDIR /api
COPY . ./api

EXPOSE 80

CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]