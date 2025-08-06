FROM python:3.13

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip3 install --no-cache-dir --upgrade -r /code/requirements.txt

COPY . /code/back_end

EXPOSE 8000

CMD ["uvicorn", "back_end.application.main:app","--host", "0.0.0.0","--port", "8000"]