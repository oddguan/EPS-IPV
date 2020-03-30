FROM python:3.7
RUN pip install pipenv

WORKDIR /app/backend
COPY Pipfile* ./
RUN pipenv lock --requirements > requirements.txt && pip install -r requirements.txt

COPY . /app/backend

EXPOSE 8000

CMD python3 manage.py runserver 0.0.0.0:8000