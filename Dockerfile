# This is the production build Dockerfile for the project
FROM python:3.7

WORKDIR /app/server

# Install Python dependencies
COPY ./server/Pipfile* /app/server/
RUN pip install pipenv && \
    pipenv lock --requirements > requirements.txt && \
    pip install -r requirements.txt

# Install JS dependencies
WORKDIR /app/client

# Install curl and node
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_13.x | bash -
RUN apt-get update && apt-get install -y nodejs

COPY ./client/package*.json /app/client/
RUN npm install -qy

# Add the rest of the code
COPY . /app/

RUN npm run build

WORKDIR /app

EXPOSE 8000

CMD python3 server/manage.py runserver 0.0.0.0:8000
