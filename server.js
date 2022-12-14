let express = require('express');

let app = express();

app.use(express.static(__dirname+'/dist/assignment6'));

app.get('/*', (req, resp) => {
    resp.sendFile(__dirname+'/dist/assignment6/index.html');
});

app.listen(process.env.PORT || 4200);