const cors = (res) => {
    res.headers['Access-Control-Allow-Origin'] = '*';
    res.headers['Access-Control-Allow-Methods'] = 'GET,POST,OPTIONS,DELETE,UPDATE,PATCH';
    res.headers['Access-Control-Allow-Headers'] = 'X-Requested-With, Content-Type';
}

module.exports = cors;