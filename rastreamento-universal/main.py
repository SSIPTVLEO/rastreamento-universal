from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Simulação de banco de dados em memória
localizacoes = []

@app.route('/')
def home():
    return jsonify({"mensagem": "API online!"})

@app.route('/enviar', methods=['POST'])
def enviar_localizacao():
    dados = request.get_json()
    if not dados or 'lat' not in dados or 'lng' not in dados:
        return jsonify({"erro": "Dados inválidos!"}), 400

    localizacoes.append(dados)
    return jsonify({"mensagem": "Localização recebida!"})

@app.route('/localizacoes', methods=['GET'])
def listar_localizacoes():
    return jsonify(localizacoes)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)
