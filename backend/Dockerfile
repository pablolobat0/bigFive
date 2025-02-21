FROM python:3.13-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev 

ENV PIPENV_VENV_IN_PROJECT=1 

COPY Pipfile Pipfile.lock ./

RUN pip install pipenv && pipenv install 

COPY . .

EXPOSE 8000

CMD ["pipenv", "run", "start"]

