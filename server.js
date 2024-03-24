var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var cors = require('cors');

// Import your models
var { Userdata, Staffdata, Admindata, Reservations } = require('./model.js');

app.use(cors({
    origin: '*'
}));

// use * to allow all origins
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Connection string for MongoDB Atlas
var connectionString = 'mongodb+srv://kalvaprasannareddy:vH0QPTNoiasI4GHN@cluster0.jbwc4vx.mongodb.net/';

// Connect to MongoDB Atlas
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

app.post("/registerUser", async (req, res) => {
    try {
        // Check if the user with the given email already exists
        const existingUser = await Userdata.findOne({ email: req.body.email });
        if (existingUser) {
            return res.send("User Already Exists");
        }

        // Create a new user if the email is not found
        var user = new Userdata(req.body);
        console.log(req.body);
        await user.save();
        res.send("User Registered Successfully");
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send("An error occurred while registering user");
    }
})


app.post("/registerStaff", async (req, res) => {
    try {
        // Check if the staff with the given email already exists
        const existingStaff = await Staffdata.findOne
            ({ email: req.body.email });
        if (existingStaff) {
            return res.send("Staff Already Exists");
        }

        // Create a new staff if the email is not found
        var staff = new Staffdata(req.body);
        await staff.save();
        res.send("Staff Registered Successfully");
    } catch (error) {
        console.error('Error registering staff:', error);
        res.status(500).send("An error occurred while registering staff");
    }
}
)

app.post("/registerAdmin", async (req, res) => {
    try {
        // Check if the admin with the given email already exists
        const existingAdmin = await Admindata.findOne
            ({ email: req.body.email });
        if (existingAdmin) {
            return res.send("Admin Already Exists");
        }

        // Create a new admin if the email is not found
        var admin = new Admindata(req.body);
        await admin.save();
        res.send("Admin Registered Successfully");
    } catch (error) {
        console.error('Error registering admin:', error);

        res.status(500).send("An error occurred while registering admin");
    }
})


app.post("/loginUser", async (req, res) => {
    try {
        // Find the user with the given email and password
        const user = await Userdata.findOne
            ({ email: req.body.email, password: req.body.password });
        if (user) {
            return res.send("User Login Successful");
        }

        res.send("Invalid Credentials");
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send("An error occurred while logging in user");
    }
})

app.post("/loginStaff", async (req, res) => {
    try {
        // Find the staff with the given email and password
        const staff = await Staffdata.findOne
            ({ email: req.body.email, password: req.body.password });
        if (staff) {
            return res.send("Staff Login Successful");
        }

        res.send("Invalid Credentials");
    } catch (error) {
        console.error('Error logging in staff:', error);
        res.status(500).send("An error occurred while logging in staff");
    }
})

app.post("/loginAdmin", async (req, res) => {
    try {
        // Find the admin with the given email and password
        const admin = await Admindata.findOne
            ({ email: req.body.email, password: req.body.password });
        if (admin) {
            return res.send("Admin Login Successful");
        }

        res.send("Invalid Credentials");
    } catch (error) {
        console.error('Error logging in admin:', error);
        res.status(500).send("An error occurred while logging in admin");
    }
})

app.post("/reservations", async (req, res) => {
    try {
        var reservation = new Reservations(req.body);
        const user=await Userdata.findOne({"email":req.body.email});
        if(!user)
        {
            return res.send("User not found");
        }

        user.reservations.push(reservation._id);
        await user.save();
        await reservation.save();
        res.send("Reservation Successful");
    } catch (error) {
        console.error('Error making reservation:', error);
        res.status(500).send("An error occurred while making reservation");
    }
})

app.get('/reservations', async (req, res) => {
    var email = req.query.email; // Get email from query parameters
    console.log(email);
    if (!email) {
        return res.status(400).send("Email is required");
    }

    try {
        const user = await Userdata.findOne({ "email": email });
        if (!user) {
            return res.status(404).send("User not found");
        }

        var reservations = [];
        for (var i = 0; i < user.reservations.length; i++) {
            var reservation = await Reservations.findOne({ "_id": user.reservations[i] });
            reservations.push(reservation);
        }

        res.send(reservations);
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/getAllReservations', async (req, res) => {
    try {
        var reservations = await Reservations.find();
        res.send(reservations);
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).send("Internal Server Error");
    }
});

app.put("/updateReservationStatus/:id", async (req, res) => {
    try {
        var id = req.params.id;
        var reservation = await Reservations.findOne({ "_id": id });
        if (!reservation) {
            return res.status(404).send("Reservation not found");
        }

        reservation.isCompleted = req.body.isCompleted;
        await reservation.save();
        res.send("Reservation status updated successfully");
    } catch (error) {
        console.error('Error updating reservation status:', error);
        res.status(500).send("Internal Server Error");
    }
});




// Start the server
var PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
    console.log('Server running on port ' + PORT);
});
