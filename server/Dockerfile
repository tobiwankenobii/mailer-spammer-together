FROM python:3.8-slim

WORKDIR /app

RUN apt-get update && apt-get install -y gcc libpq-dev make
RUN pip install --upgrade pip

ADD requirements.txt .
RUN pip install -r requirements.txt

COPY . /app/

ENTRYPOINT ["bash" ,"/app/docker-entrypoint.sh"]
