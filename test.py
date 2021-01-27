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
<<<<<<< HEAD
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///happiness.sqlite/happiness_df_3"
# # Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
=======
<<<<<<< HEAD
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///happiness.sqlite/happiness_df_3"
# # Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
=======
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///happiness.sqlite/happiness_df"
# # Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# db = SQLAlchemy(app)
# # #def create_classes(db):
# #     class Happy(db.model):
# #         __tablename__= "happiness_df"
# #         grin = db.Column(db.Integer, primary_key = True)
# #         teethcolor = db.Column(db.String(20))
# #         def __repr__(self):
# #             return '<Happy %r>' % (self.name)
# #     return Happy
# #Happiness = create_classes(db)
# # create route that renders index.html template
# @app.route("/")
# def home():
#     return render_template("index.html")
# # # Query the database and send the jsonified results
# # @app.route("/send", methods=["GET", "POST"])
# # def send():
# #     if request.method == "POST":
# #         name = request.form["petName"]
# #         lat = request.form["petLat"]
# #         lon = request.form["petLon"]
# #         pet = Pet(name=name, lat=lat, lon=lon)
# #         db.session.add(pet)
# #         db.session.commit()
# #         return redirect("/", code=302)
# #     return render_template("form.html")
# # @app.route("/api/pals")
# # def pals():
# #     results = db.session.query(Pet.name, Pet.lat, Pet.lon).all()
# #     hover_text = [result[0] for result in results]
# #     lat = [result[1] for result in results]
# #     lon = [result[2] for result in results]
# #     pet_data = [{
# #         "type": "scattergeo",
# #         "locationmode": "USA-states",
# #         "lat": lat,
# #         "lon": lon,
# #         "text": hover_text,
# #         "hoverinfo": "text",
# #         "marker": {
# #             "size": 50,
# #             "line": {
# #                 "color": "rgb(8,8,8)",
# #                 "width": 1
# #             },
# #         }
# #     }]
# #     return jsonify(pet_data)
# @app.route("/db")
# def dostuff():
#     results = db.session.query().all()
#     for result in results:
#         print(result)
>>>>>>> cfa035123ef2498d53765ac61350da7e66815875
>>>>>>> 6129489e77f72022534396f98ed10f7260176109


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

<<<<<<< HEAD
happiness_rank=pd.read_sql('SELECT * FROM happiness_df_3',conn)
=======
<<<<<<< HEAD
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
=======
happiness_rank=pd.read_sql('SELECT * FROM happiness_df',conn)
>>>>>>> 6129489e77f72022534396f98ed10f7260176109
# print(happiness_rank.to_json())
happiness_data = []

for index, row in happiness_rank.iterrows():
    
    current_row ={}
    current_row["Country"]= row.Country
    current_row["Freedom"]= row.Freedom
<<<<<<< HEAD
    current_row["Year"]=row.Year
    current_row['Generosity'] = row.Generosity
    current_row['Happiness Rank'] = row.Happiness_Rank
    current_row['Happiness Score'] = row.Happiness_Score
    current_row['Economy'] = row.Economy
    current_row['Health'] = row.Health
    # current_row['Trust'] = row.Trust

    happiness_data.append(current_row)
=======
    happiness_data.append (current_row)
>>>>>>> cfa035123ef2498d53765ac61350da7e66815875
>>>>>>> 6129489e77f72022534396f98ed10f7260176109


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












