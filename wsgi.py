# wsgi.py

# We make this file when we're deploying to Render
# (or to production at all).
# Flask is a very simple development web framework,
# while gunicorn is a production web server.
# So when we go to take the site live, we need to use gunicorn.

# To make that possible, we just add this file to our project.
# Then, the start command (instead of python3 app.py) is:
# gunicorn wsgi:application

from app import app as application

if __name__ == "__main__":
    application.run()