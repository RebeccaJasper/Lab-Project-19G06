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


def execute_query(query_string: str, args: tuple) -> None:
    """
    Allows SQL queries to be executed in the database

    :param query_string: query string to be inserted to the database
    :param args: Tuple of arguments for the query string
    :return: None
    """

    query = query_string % args
    print(query)
    cursor.execute(query)
    conn.commit()
