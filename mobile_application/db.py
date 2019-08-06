import os
from os.path import join, dirname
from dotenv import load_dotenv
from typing import List
import pyodbc

dotenv_path = join(os.path.abspath(os.path.join(dirname(__file__), os.pardir)), '.env')
load_dotenv(dotenv_path)

server = os.getenv('SERVER_NAME')
username = os.getenv('USER_NAME')
password = os.getenv('PASSWORD')
database = os.getenv('DATABASE')
driver = '{ODBC Driver 17 for SQL Server}'

# dotenv_path = join(dirname(__file__), '.env')
# load_dotenv(dotenv_path)

conn = pyodbc.connect('DRIVER='+driver+';SERVER='+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password)

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


def commit_changes() -> None:
    """
    Function for ensuring persistence of alterations made to the database by previously executed queries

    :rtype: None
    """
    conn.commit()


def retrieve_data() -> List:
    """
    Retrieves a row returned by the DBMS from previously executed query

    :return: Row of data retrieved from query
    rtype: List
    """
    return cursor.fetchone()

