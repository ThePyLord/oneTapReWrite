import base64
from flask import Flask, Response, request, make_response, jsonify
from BackgroundVaporizer.remove_bg import remove_bg


app = Flask(__name__)


@app.route("/")
def hello_world():
	return "<p>Hello, World!</p>"


@app.route("/remove_bg", methods=['POST'])
def test():
	'''
	Remove background from image, image should be url/path to image
	The image should only have a single object in it
	We will receive a json object with the following format:
	 
	 {
	 		"image": "https://i.imgur.com/1ZQ3Q0l.jpg",
	 		
	 		"message": "Hello World"
	 }
	 
	'''
	try:
		data = request.get_json()
		url: str = data['url']
		# print(f"The image to be processed is: {url}")
		img = remove_bg(url)
		
		# return json response with image and message
		res = {
			"message": "success ✅💯",
			"image": base64.b64encode(img).decode('utf-8')
		}
		return make_response(jsonify(res), 200)

	except Exception as e:
		print(e)
		return Response(response=str(e), status=500, mimetype="text/plain")


if __name__ == "__main__":
	app.run(debug=True)
