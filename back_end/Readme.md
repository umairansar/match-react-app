## Installation

### Create a virtual env

```python3.13 -m venv venv-tournamentor```

### Activate the venv

```source ./venv-tournamentor/bin/activate```

### Install the dependencies

```pip3 install -r requirements.txt```

## Run

### FASTAPI

To run with FASTAPI, go to src folder and run: 

```fastapi dev main.py```

### Docker 

To run the backend with docker: 

```docker build . -t backend```
```docker run -d --name backend -p 8080:8000 backend```




