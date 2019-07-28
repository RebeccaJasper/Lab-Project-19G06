import os
from os.path import join, dirname
from dotenv import load_dotenv
import pymssql

dotenv_path = join(os.path.abspath(os.path.join(dirname(__file__), os.pardir)), '.env')
load_dotenv(dotenv_path)

SERVER_NAME = os.getenv('SERVER_NAME')
USER_NAME = os.getenv('USER_NAME')
PASSWORD = os.getenv('PASSWORD')
DATABASE = os.getenv('DATABASE')

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

conn = pymssql.connect(server=SERVER_NAME, user=USER_NAME, password=PASSWORD, database=DATABASE)

cursor = conn.cursor()

cursor.execute("""
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='users' and xtype='U')
          CREATE TABLE id_photos (
          photo_id int IDENTITY(1,1) PRIMARY KEY,
          photo varbinary
          )
""")

cursor.execute("""
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='users' and xtype='U')
          CREATE TABLE feature_vectors (
          photo_id int IDENTITY(1,1) PRIMARY KEY,
          feature_vector varbinary
          )
""")

conn.commit()
conn.close()