# Installation

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

# Project Structure

## Architecture

## Schema

### User

User has following fields : 
- `id`: Unique identifier for the user.
- `name`: Name for the user.
- `department`: Department of the user.
- `rating`: Rating earned by the user.

### Match

Match has following fields :
- `id`: Unique identifier for the match.
- `winner`: Winner of the match.
- `loser`: Loser of the match.
- `date-time`: Date and Time of the match.

### UserMatch 

UserMatch is a join table that connects User and Match. It has the following fields:
- `id`: Unique identifier for the UserMatch.
- `user_id`: Foreign key referencing the User.
- `match_id`: Foreign key referencing the Match.
- `score`: Score of the user in the match.


┌─────────┐       ┌────────────┐       ┌─────────┐
│  User   │1     N│  UserMatch │N     1│  Match  │
└─────────┘       └────────────┘       └─────────┘
   id  ◄──────────  user_id
                    match_id ─────────► id


