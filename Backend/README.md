# Recall

## How to run
1. Clone the repository
```
git clone https://github.com/jayantkhanna1/Recall-Nova-Hackathon.git
```

2. Create a virtual environment
```
python3 -m venv venv
```

3. Activate the virtual environment
```
source venv/bin/activate
```

4. Install the requirements
```
pip install -r requirements.txt
```

5. Create a .env file in the root directory and add the following variables
```
DJANGO_SECRET_KEY = 'django-insecure-mh5_+t3-dpzb2qf!@48ak951h&@u(2hyc@gai)hr^!u!o))ff-'
EMAIL = ''
PASSWORD = ''
SALT = "recallapp"
DB_NAME = ""
DB_USER = ""
DB_PASSWORD = ""
DB_HOST = ""
DB_PORT = ""
```
6. Create a database in PostgreSQL and add the credentials to the .env file

7. Make Migrations and Migrate
```
python manage.py makemigrations
python manage.py migrate
```

7. Run the server
```
python manage.py runserver
```


## Backend Documentation
https://documenter.getpostman.com/view/22854679/2s93RL1bSN