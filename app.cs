# Setup
express = require('express')
app = express();

app.get '/', (req, res) ->
	res.send('Welcome to the LitFinder')
	
# Listen
app.listen 8080, -> 
    console.log('Server listing on 8080')