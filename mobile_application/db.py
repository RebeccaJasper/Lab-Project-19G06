import os
from os.path import join, dirname
from dotenv import load_dotenv
from typing import List
from os import environ
import psycopg2
from psycopg2 import pool

dotenv_path = join(os.path.abspath(os.path.join(dirname(__file__), os.pardir)), '.env')
load_dotenv(dotenv_path)

DATABASE_URL = os.getenv('DATABASE_URL')

ps_connection = None
cursor = None

try:
    threaded_postgreSQL_pool = psycopg2.pool.ThreadedConnectionPool(5, 20, DATABASE_URL, sslmode='require')
    if(threaded_postgreSQL_pool):
        print("Connection pool created successfully using ThreadedConnectionPool")
    # # Use getconn() method to Get Connection from connection pool
    ps_connection  = threaded_postgreSQL_pool.getconn()
    if(ps_connection):
        print("successfully recived connection from connection pool ")
        cursor = ps_connection.cursor()
    
except (Exception, psycopg2.DatabaseError) as error :
    print ("Error while connecting to PostgreSQL", error)


def execute_query(query_string: str, args: tuple) -> None:
    """
    Allows SQL queries to be executed in the database

    :param query_string: query string to be inserted to the database
    :param args: Tuple of arguments for the query string
    :return: None
    """

    query = query_string % args
    print(query)
    # cursor = create_cursor()
    cursor.execute(query)


def commit_changes() -> None:
    """
    Function for ensuring persistence of alterations made to the database by previously executed queries

    :rtype: None
    """
    ps_connection.commit()


def retrieve_data() -> List:
    """
    Retrieves a row returned by the DBMS from previously executed query

    :return: Row of data retrieved from query
    rtype: List
    """
    return cursor.fetchone()

