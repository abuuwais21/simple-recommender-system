# * ---------- IMPORTS --------- *

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import numpy as np
from dotenv import load_dotenv
import pickle


load_dotenv('.env')

# * ---------- Create App --------- *
app = Flask(__name__)
#CORS(app, support_credentials=True)
CORS(app)
CURRENT_DIR=os.path.dirname(os.path.abspath(__file__))

def html(content):
    return '<html><head>Hi there...</head><body>' + content + '</body></html>'

@app.route('/api', methods=['GET'])
def test_root_api():
    return html('If you can see this, your server is running. Congrats')

with open(f"{CURRENT_DIR}/recommender_objs.pkl", "rb") as f:
    purchase_num,sparse_purchase_num,calculate_cosine_similarities = pickle.load(f)

def recommend_products(customer_id, n=5):
    customer_hist = sparse_purchase_num[customer_id].toarray().flatten()
    similar = calculate_cosine_similarities.dot(customer_hist)
    purchase_indicies = np.where(customer_hist > 0)[0]
    similar[purchase_indicies] = 0
    recommend_indices = np.argsort(similar)[::-1][:n]
    recommend_prod = list(purchase_num.columns[recommend_indices])
    purchased_prod = list(purchase_num.columns[purchase_num.loc[customer_id]])
    recommended_prod = [product for product in recommend_prod if product not in purchased_prod]

    return recommended_prod

@app.route('/api/recommender', methods=['GET'])
def recommender_cosine_similar():
    sendback_json = {}
    ret = 200
    customer_id = request.args.get('customer_id', default=-1, type=int)
    num = request.args.get('n', default=5, type=int)
    if request.method == 'GET':
        list_recommended = recommend_products(customer_id,n=num)
        # print(list_recommended)
        data = {}
        data["listproductids"] = list_recommended
        sendback_json["result"] = data
        sendback_json["return"] = 200
        ret = 200
        
    return jsonify(sendback_json), ret
 
 
 
 # * -------------------- RUN SERVER -------------------- *
if __name__ == '__main__':
    # * --- DEBUG MODE: --- *
    app.run(host='localhost', port=5000, debug=True)