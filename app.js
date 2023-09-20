const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// MongoDB Atlas Configuration
const mongoURI = 'mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connection to MongoDB Atlas successful'))
    .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Data Model Definition
const UserSchema = new mongoose.Schema({
    _id: String,
    actions: [{
        action: String,
        timeSpent: Number
    }]
});

const User = mongoose.model('User', UserSchema);

// Middleware to parse JSON
app.use(bodyParser.json());

// Middleware to enable CORS
app.use(cors());

// Route to register actions in the database
app.post('/register-action', async (req, res) => {
    console.log('Request received at /register-action:', req.body);

    // Get username from the request body
    const username = req.body.username;
    if (!username) {
        console.error('Enter a username');
        res.status(400).json({ message: 'Enter a username' });
        return;
    }

    try {
        // Find or create the user in the database
        let user = await User.findById(username);
        if (!user) {
            user = new User({ _id: username });
        }

        // Add the current action to the user's actions array
        user.actions.push({
            action: req.body.action,
            timeSpent: req.body.timeSpent
        });

        // Save the user to the database
        await user.save();

        console.log('Action registered in the database:', user);
        res.json({ message: 'Action registered successfully' });
    } catch (error) {
        console.error('Error saving the action:', error);
        res.status(500).json({ message: 'Error saving the action' });
    }
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server started at http://localhost:3000');
});
