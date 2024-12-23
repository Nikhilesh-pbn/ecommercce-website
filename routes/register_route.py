from flask import Blueprint,render_template,jsonify,request,url_for
import mysql.connector

register_bp=Blueprint('register',__name__)

db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'root',
    'database': 'ecom_db'
}

@register_bp.route('signupPage')
def signupPage():
    return render_template('ecom-signup.html')


@register_bp.route('/register',methods='POST')
def register():
    data=request.get_json()
    fullname = data.get('register_fullname')
    email = data.get('register_email')
    password = data.get('register_password')

    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        cursor.execute("SELECT user_email from users WHERE user_email=%s",(email))
        if cursor.fetchone():
            return jsonify({
                "statusCode": 409,
                "success":False,
                "status": "Email already exists"
            })
        
        query="INSERT INTO users (user_fullname,user_email,user_password) VALUES (%s,%s,%s)"
        cursor.execute(query,(fullname,email,password))
        conn.commit()
        
        return jsonify({
            "statusCode":200,
            "success":True,
            "redirect_url":url_for('loginpage')
        })


    
    except mysql.connector.Error as err:
        return f"Error:{err}" , 500
    
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()