from flask import Flask, render_template 

app = Flask(main.py)

@app.route("/")
def home():
    return render_template("index.html")
    
if main.py == "__main__":
    app.run(debug=True

    