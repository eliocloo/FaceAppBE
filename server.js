const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')

const app = express()

app.use(express.json());
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'Ryan',
            email: 'ryan@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sisyn',
            email: 'sisyn@gmail.com',
            password: 'orange',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [{
        id: '987',
        hash: '',
        email: 'ryan@gmail.com'
    }]
}
app.get('/', (req, res) => {
    res.send(database.users)
})

/* signin */
app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
        res.json(database.users[0]);
    } else {
        res.status(400).json('error logging in')
    }

})

app.post('/register', (req, res) => {
    const { name, email, password } = req.body
    bcrypt.hash("bacon", null, null, function (err, hash) {
        console.log(hash)
    });

    database.users.push({
        id: '127',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1])
})


app.get('/profile/:id', (req, res) => {
    const { id } = req.params
    let found = false
    database.users.forEach(user => {
        if (user.id === id) {
            found = true
            return res.json(user)
        }
    })
    if (!found) {
        res.status(404).json('not found')
    }
})

app.put('/image', (req, res) => {
    const { id } = req.body
    let found = false
    database.users.forEach(user => {
        if (user.id === id) {
            found = true
            user.entries++
            return res.json(user.entries)
        }
    })
    if (!found) {
        res.status(404).json('not found')
    }
})


/*
// Load hash from your password DB.
bcrypt.compare("bacon", hash, function (err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function (err, res) {
    // res = false
});

*/

app.listen(3000, () => {
    console.log('app is running on post 3000')
})



/* Endpoints to build
/ --> res = this is working
/signin --> POST = siccess/fail
/profile/userID --> GET = user
/image --> PUT --> user
*/