# from models import create_classes
# import os
import subprocess
import sys
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
try:
    import pandas as pd
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pandas"])
finally:
    import pandas as pd
# #################################################
# # Flask Setup
# #################################################
app = Flask(__name__)
# #################################################
# # Database Setup
# #################################################
# # from flask_sqlalchemy import SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///happiness.sqlite/happiness_df_3"
# # Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func , desc

import sqlite3
from sqlite3 import Error

engine = create_engine("sqlite:///happiness.sqlite") 

Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

Base.classes.keys() 

session = Session(engine) 

conn=sqlite3.connect('happiness.sqlite')
# print(session.query(*sel).all())
#happiness_df.to_sql('happiness_df',conn)

happiness_rank=pd.read_sql('SELECT * FROM happiness_df_3',conn)
# print(happiness_rank.to_json())
happiness_data = []

for index, row in happiness_rank.iterrows():
    
    current_row ={}
    current_row["Country"]= row.Country
    current_row["Freedom"]= row.Freedom
    current_row["Year"]=row.Year
    current_row['Generosity'] = row.Generosity
    current_row['Happiness Rank'] = row.Happiness_Rank
    current_row['Happiness Score'] = row.Happiness_Score
    current_row['Economy'] = row.Economy
    current_row['Health'] = row.Health
    # current_row['Trust'] = row.Trust

    happiness_data.append(current_row)


    # data:{   
    # "Country":row["Country"] 
    # }    
    # print(row['Country'])                    
# "Happiness Rank"                           
# "Happiness Score"                     
# "Economy (GDP per Capita) "              
# "Health (Life Expectancy)"              
# "Freedom"                              
# "Trust (Government Corruption)"      
# "Generosity"                            
# "Year"                                    
# "Name":
    # }
    # happy_list.append(data)


@app.route("/")
def home():
    return render_template("index.html")
@app.route("/db")
def db():
    return jsonify(happiness_data)

if __name__ == "__main__":
    app.run()












