FROM python:3.8-slim

RUN echo $(ls)

WORKDIR /api
COPY . /api
WORKDIR /api

RUN echo $(ls)

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE=1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED=1

RUN pip install uvicorn fastapi tensorflow-cpu tensorflow-hub opencv-python-headless numpy 

EXPOSE 8000

CMD ["echo $(ls)"]

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"] 

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
# sudo docker run -p 8000:8000 api

# # uvicorn api:app --host 0.0.0.0 --port 80


# # sudo docker run --name test -dit busybox
# # sudo docker exec test command

# # danks

# IMPORTANT NOTES:
#  - Congratulations! Your certificate and chain have been saved at:
#    /etc/letsencrypt/live/birds.lakkapragada.com/fullchain.pem
#    Your key file has been saved at:
#    /etc/letsencrypt/live/birds.lakkapragada.com/privkey.pem
#    Your certificate will expire on 2023-05-29. To obtain a new or
#    tweaked version of this certificate in the future, simply run
#    certbot again with the "certonly" option. To non-interactively
#    renew *all* of your certificates, run "certbot renew"
#  - If you like Certbot, please consider supporting our work by:

#    Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
#    Donating to EFF:                    https://eff.org/donate-le
