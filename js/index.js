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

// Function to register a new user
function register(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Get form values
    const name = document.getElementById('name').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const state = document.getElementById('states').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Perform validations
    if (!validate_email(email) || !validate_password(password)) {
        alert('Invalid Email or Password');
        return;
    }

    if (!validate_field(name) || !validate_field(phoneNumber) || !validate_field(state)) {
        alert('One or more fields are empty');
        return;
    }

    // Register user with Firebase Authentication
    auth.createUserWithEmailAndPassword(email, password)
        .then(function () {
            const user = auth.currentUser;
            const user_data = {
                name: name,
                phoneNumber: phoneNumber,
                state: state,
                email: email,
                last_login: Date.now()
            };

            // Save user data to Firebase Realtime Database
            database.ref('users/' + user.uid).set(user_data);

            // Save the same user data in localStorage
            localStorage.setItem('name', name);
            localStorage.setItem('phoneNumber', phoneNumber);
            localStorage.setItem('state', state);
            localStorage.setItem('email', email);
            localStorage.setItem('userId', user.uid);
            
            console.log(user.uid);
            alert('User Registered Successfully');

            // Redirect to the next page (index.html)
            window.location.href = 'index.html';    
        })
        .catch(function (error) {
            const errorMessage = error.message;
            alert(errorMessage);
        });
}


// Function to handle geolocation
function saveLocation() {
    // Check if Geolocation is supported
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Get currently logged-in user
            const user = firebase.auth().currentUser;

            if (user) {
                // Save the location data to Firebase Realtime Database
                firebase.database().ref('users/' + user.uid + '/location').set({
                    latitude: latitude,
                    longitude: longitude
                }).then(() => {
                    alert('Location saved successfully!');
                }).catch(error => {
                    console.error('Error saving location:', error);
                    alert('Failed to save location.');
                });
            } else {
                alert('User not logged in.');
            }

        }, error => {
            console.error('Error retrieving location:', error);
            alert('Unable to retrieve location.');
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}

function autofillForm() {
    const name = localStorage.getItem('name');
    const location = `${state}, ${phoneNumber}`; // Combine state and phone number for location field

    // Autofill form fields
    document.getElementById('clientName').value = name || '';  // If data is unavailable, keep empty
    document.getElementById('location').value = location || '';
}

        // Redirect functions
        function seekLawyers() {
            window.location.href = 'lawyer.html';
        }

        function seekInsurance() {
            window.location.href = 'insurance.html';
        }