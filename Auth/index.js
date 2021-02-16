const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const mariadb = require('mariadb');

const PORT = 5000;

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
const pool = mariadb.createPool({
    host: '192.168.1.100',
    user: 'wecode',
    password: 'wecode2020',
    database: '2fa',
    port: 3307
});

async function addNewClient(id, secret) {
    let conn;
    try {
        conn = await pool.getConnection();
        const res = await conn.query("INSERT INTO users value (?, ?)", [id, secret]);
        console.log(res)
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.end();
    }
}

async function checkClientExist(id) {
    let conn;
    try {
        conn = await pool.getConnection();
        const res = await conn.query("SELECT * FROM users WHERE id = ?", [id]);
        if (res[0] === undefined) {
            return false;
        }
        else {
            return res[0];
        }
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.end();
    }
}

app.get('/api/:name/:id', (req, res) => {
    let exist = checkClientExist(req.params.id)
        .then(exist => {
            if (exist) {
                let secret = JSON.parse(exist.secret);

                qrcode.toDataURL(secret.otpauth_url, (err, data) => {
                    if (err) {
                        throw err
                    }
                    else {
                        res.status(200);
                        res.json({
                            "secret": secret.ascii,
                            "qrcode": data
                        });
                    }
                })
            }
            else {
                let secret = speakeasy.generateSecret({
                    name: req.params.name
                });

                addNewClient(req.params.id, secret);

                qrcode.toDataURL(secret.otpauth_url, (err, data) => {
                    if (err) {
                        throw err
                    }
                    else {
                        res.status(200);
                        res.json({
                            "secret": secret.ascii,
                            "qrcode": data
                        });
                    }
                })
            }
        });
});

app.post('/api/verify', (req, res) => {
    let secret = req.body.secret;
    let token = req.body.token;

    let verified = speakeasy.totp.verify({
        secret: secret,
        encoding: "ascii",
        token: token
    });

    if (verified) {
        res.status(200);
        res.json(true);
    } else {
        res.status(401);
        res.json(false);
    }
})

app.listen(PORT, () => console.log("server listen to http://localhost:" + PORT));