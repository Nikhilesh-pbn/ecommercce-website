from flask import Flask, request, render_template, redirect, url_for, jsonify, session, make_response
import mysql.connector
import re

app = Flask(__name__, static_folder='static')
app.secret_key = "2203031260174@Nikhi"


db_config = {
    'user': 'root',
    'password': 'root',
    'host': 'localhost',
    'database': 'ecom_db'
}

@app.route('/')
def home():
    response = make_response(render_template('ecom-homepage.html')) 
    if 'logged_in' in session:
        response.headers['Cache-Control'] = 'private, max-age=3600'
    else:
        response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0'
        response.headers['Pragma'] = 'no-cache'
        response.headers['Expires'] = '0'
    return response

@app.route('/loginpage')
def loginpage(): 
    if session.get('logged_in') == True:  
        return redirect(url_for('home'))
    response = make_response(render_template('ecom-signin.html'))
    response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0'
    response.headers['Pragma'] = 'no-cache'  
    response.headers['Expires'] = '0'
    return response

@app.route('/signupPage')
def signupPage():
    if session.get('logged_in') == True:
        return redirect(url_for('home'))
    response = make_response(render_template('ecom-signup.html'))
    response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'
    return response

@app.route('/register', methods=['POST'])
def register():
    register_data = request.get_json()
    fullname = register_data.get('registerFullname')
    email = register_data.get('registerEmail')
    password = register_data.get('registerPassword')

    if not fullname or len(fullname) < 1:
        return jsonify({"statusCode": 400, "success": False, "status": "Full name is required"}), 400

    if not email or not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return jsonify({"statusCode": 400, "success": False, "status": "Valid email is required"}), 400

    if not password or len(password) < 6:
        return jsonify({"statusCode": 400, "success": False, "status": "Password must be at least 6 characters long"}), 400

    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE user_email = %s", (email,))
    if cursor.fetchone():
        cursor.close()
        conn.close()
        return jsonify({"statusCode": 409, "success": False, "status": "Email already exists"}), 409

    cursor.execute("INSERT INTO users (user_fullname, user_email, user_password) VALUES (%s, %s, %s)", (fullname, email, password))
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({
        "statusCode": 200,
        "success": True,
        "redirect_url": url_for('loginpage')
    }), 200

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    login_username = data.get('login_username')
    login_password = data.get('login_password')

    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE user_email = %s OR user_fullname = %s", (login_username, login_username))
    user = cursor.fetchone()

    if user:
        stored_password = user[3]  
        if login_password == stored_password:
            session['logged_in'] = True
            session['username'] = user[1]  
            cursor.close()
            conn.close()
            return jsonify({
                "statusCode": 200,
                "session": True,
                "username": user[1],
                "redirect_url": url_for('home')
            })
        cursor.close()
        conn.close()
        return jsonify({
            "statusCode": 401,
            "session": False,
            "username": False,
            "status": "Invalid email/username or password"
        })
    else:
        cursor.close()
        conn.close()
        return jsonify({
            "statusCode": 401,
            "session": False,
            "username": False,
            "status": "Invalid email/username or password"
        })
    

@app.route('/accountPage')
def accountpage():
    if 'logged_in' not in session:
        return redirect(url_for('loginpage'))

    response = make_response(render_template('ecom-account.html'))
    response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'
    return response

@app.route('/cartpage')
def cartpage():
    return render_template('ecom-cart.html')

@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    return redirect(url_for('loginpage'))

@app.route('/mobiles')
def mobiles():
    return render_template('ecom-mobiles.html')

@app.route('/laptops')
def laptops():
    return render_template('ecom-laptops.html')

if __name__ == '__main__':
    app.run(debug=True)
