FROM python:3.8-slim

RUN pip install -r requirements.txt

WORKDIR /api
COPY . ./api

EXPOSE 80

CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]

# to clean: 
# sudo docker system prune
# sudo docker image prune -a
# sudo docker container prune
# sudo docker volume prune
# or run this: sudo docker system prune && sudo docker image prune -a && sudo docker container prune && sudo docker volume prune

# docker daemon not working?
# sudo service docker stop
# sudo service docker start

# build:
# sudo docker build -t api .

# run:
# redis-server
# celery -A tasks worker --pool=solo --loglevel=info
# sudo docker run -p 443:443 --env-file=.env api

# uvicorn api:app --host 0.0.0.0 --port 80


# sudo docker run --name test -dit busybox
# sudo docker exec test command

