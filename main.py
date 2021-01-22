
import datetime as dt
import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import sqlite3

from flask import Flask, jsonify

# Database Setup
#################################################
engine = create_engine("sqlite:///happiness.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save references to each table
Base.classes.keys()

# Create our session (link) from Python to the DB
session = Session(engine)

conn = sqlite3.connect('happiness.sqlite')

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


@app.route('/', methods=['GET'])
def api_all():
    conn.row_factory = dict_factory
    cur = conn.cursor()
    all_data = cur.execute('SELECT * FROM db_file;').fetchall()

    return jsonify(all_data)

if __name__ == '__main__':
    app.run()