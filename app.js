const { app } = require('./api');

app.listen(process.env.PORT, ()=> console.log(`Listening on port ${process.env.PORT}`))