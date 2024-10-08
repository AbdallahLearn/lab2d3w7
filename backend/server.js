

import express from 'express'
const app = express()
const port = 9000

app.use(express.json()) 

const users = []
const userData=[]
// مسار GET لاسترجاع جميع المستخدمين
app.get('/users', (req, res) => {
    res.json(users); // إعادة جميع المستخدمين
});
app.post('/users', (req, res) => {
    console.log(req.body); // Log incoming request body

    const { username, title, description } = req.body;

    // Validate input
    if (!username || !title || !description) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newUser = { id: users.length + 1, username, title, description };
    users.push(newUser);
    res.status(201).json(newUser); // Respond with 201 Created status
});
// مسار PUT لتعديل بيانات المستخدم
app.patch('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { username, title, description } = req.body;
    const user = users.find(u => u.id === userId);

    if (user) {
        user.username = username || user.username;
        user.title = title || user.title;
        user.description = description || user.description;
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// DELETE endpoint to remove a user by ID
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === userId);

    if (index === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    users.splice(index, 1); // Remove the user from the array
    res.status(204).send(); // Respond with a 204 No Content status
});






app.post('/signup',(req,res)=>{
    const { fname,lname, email, password } = req.body;
    const newUser = { id: userData.length + 1, fname,lname, email, password };
    userData.push(newUser);
    res.json(newUser);

})

app.get('/signup', (req,res)=>{
    res.json(userData); // إعادة جميع المستخدمين
})

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = userData.find(u => u.email === email);

    // Check if user exists and password matches
    if (user && user.password === password) {
        return res.json({ message: 'Login success' });
    }

    // If user doesn't exist or password is incorrect
    res.status(401).json({ message: 'Invalid email or password' });
});

app.listen(port, () => {

    console.log(`Example app listening on port ${port}`)
})