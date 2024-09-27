// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCZpkfoDiM2FB8idmi8-MSTLbWJbI3KyrA",
    authDomain: "supportivetransit.firebaseapp.com",
    databaseURL: "https://supportivetransit-default-rtdb.firebaseio.com",
    projectId: "supportivetransit",
    storageBucket: "supportivetransit.appspot.com",
    messagingSenderId: "811254520584",
    appId: "1:811254520584:web:63aea690ac3169a4a8eabd",
    measurementId: "G-V13D6DGDRW"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

// Function to register a new lawyer
function register(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Get form values
    const name = document.getElementById('name').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const barNumber = document.getElementById('barNumber').value;
    const specialty = document.getElementById('specialty').value;
    const state = document.getElementById('states').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Perform validations
    if (!validateEmail(email) || !validatePassword(password)) {
        alert('Invalid Email or Password');
        return;
    }

    if (!validateField(name) || !validateField(phoneNumber) || !validateField(barNumber) || !validateField(specialty) || !validateField(state)) {
        alert('One or more fields are empty');
        return;
    }

    // Register user with Firebase Authentication
    auth.createUserWithEmailAndPassword(email, password)
        .then(function () {
            const user = auth.currentUser;
            const lawyerData = {
                name: name,
                phoneNumber: phoneNumber,
                barNumber: barNumber,
                specialty: specialty,
                state: state,
                email: email,
                last_login: Date.now()
            };

            // Save lawyer data to Firebase Realtime Database
            database.ref('lawyers/' + user.uid).set(lawyerData)
                .then(() => {
                    console.log('Lawyer data saved successfully');
                    alert('Lawyer Registered Successfully');
                    localStorage.setItem('lawyerName', name);
                    window.location.href = 'bids.html'; // Redirect to the main page
                })
                .catch(function (error) {
                    console.error('Error saving lawyer data:', error);
                    alert('Failed to save lawyer data.');
                });
        })
        .catch(function (error) {
            const errorMessage = error.message;
            alert(errorMessage);
        });
}

// Validation functions
function validateEmail(email) {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/;
    return expression.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function validateField(field) {
    return field != null && field.length > 0;
}
