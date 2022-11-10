import urllib.request
import cv2
import numpy as np


def url_to_image(url: str) -> np.ndarray:
	# download the image, convert it to a NumPy array, and then read
	# it into OpenCV format
	resp = urllib.request.urlopen(url)
	# nparr = np.fromstring(resp.read(), np.uint8)
	nparr = np.frombuffer(resp.read(), np.uint8)
	image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
	# return the image
	return image


def remove_bg(img: str) -> np.ndarray:
	'''
	Remove background from image, image should be url/path to image
	got this method from stackoverflow
	:param img: url/path to image
	:return: image with background removed
	'''
	img = url_to_image(img)
	# convert to graky
	gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
	
	# threshold input image as mask
	mask = cv2.threshold(gray, 250, 255, cv2.THRESH_BINARY)[1]
	
	# negate mask
	mask = 255 - mask
	
	# apply morphology to remove isolated extraneous noise
	# use borderconstant of black since foreground touches the edges
	kernel = np.ones((3, 3), np.uint8)
	mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)
	mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)
	
	# anti-alias the mask -- blur then stretch
	# blur alpha channel
	mask = cv2.GaussianBlur(mask, (0, 0), sigmaX=2, sigmaY=2, borderType=cv2.BORDER_DEFAULT)
	
	# linear stretch so that 127.5 goes to 0, but 255 stays 255
	mask = (2 * (mask.astype(np.float32)) - 255.0).clip(0, 255).astype(np.uint8)
	
	# put mask into alpha channel
	result = img.copy()
	result = cv2.cvtColor(result, cv2.COLOR_BGR2BGRA)
	result[:, :, 3] = mask

	_, img_encoded = cv2.imencode('.png', result)
	return img_encoded

