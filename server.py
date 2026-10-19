from whitenoise import WhiteNoise

def dummy_404_app(environ, start_response):
    start_response('404 Not Found', [('Content-Type', 'text/plain')])
    return [b"404 Not Found"]

application = WhiteNoise(dummy_404_app, root="./dist", autorefresh=True)