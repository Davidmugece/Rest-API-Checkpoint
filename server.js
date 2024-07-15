const express = require('express');
const morgan = require('morgan');
const User = require('./models/user');

const PORT = process.env.PORT || 5000;

const app = express(); // express instance

//database configuration
const  connect_database  = require('./db/connect')
connect_database();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//base route
app.get('/', (req, res) => {
res.send({"message": "Server is running"}).status(200);
});

//ROUTES
// GET :  RETURN ALL USERS 
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// POST : CREATE A NEW USER
    app.post('/users', async (req, res) => {
        const { name, email, phone_number } = req.body;

        try {
            const newUser = new User({
                name,
                email,
                phone_number
            });

            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

// PUT : EDIT A USER BY ID
app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone_number } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email, phone_number },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// DELETE : DELETE A USER BY ID
app.delete('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        // Find and remove the user
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



//start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})