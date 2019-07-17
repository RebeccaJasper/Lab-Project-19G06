from flask import Flask, render_template, request
from flaskext.mysql import MySQL
app = Flask(__name__)


app.config['MYSQL_HOST'] = 'identikit-sql.database.windows.net'
app.config['MYSQL_USER'] = 'identikit-db'
app.config['MYSQL_PASSWORD'] = 'MabulaJasper2019'
app.config['MYSQL_DATABASE_PORT'] = 1433
app.config['MYSQL_DB'] = 'identikit-sql'

mysql = MySQL(app)
