// // Simulated data for nearby lawyers and insurance companies
// // Simulated data for nearby lawyers and insurance companies
// const lawyers = [
//     { name: "Lawyer A", location: "Nearby", minBid: 100 },
//     { name: "Lawyer B", location: "Nearby", minBid: 150 },
//     { name: "Lawyer C", location: "Nearby", minBid: 200 }
//   ];
  
//   const insuranceCompanies = [
//     { name: "Insurance Co. A", location: "Nearby", minBid: 120 },
//     { name: "Insurance Co. B", location: "Nearby", minBid: 180 }
//   ];
  
//   // Event listener for form submission
//   document.getElementById('biddingForm').addEventListener('submit', function (e) {
//     e.preventDefault();
  
//     // Collect input values from the form
//     const clientName = document.getElementById('clientName').value;
//     const location = document.getElementById('location').value;
//     const accidentDetails = document.getElementById('accidentDetails').value;
//     const initialBid = parseFloat(document.getElementById('initialBid').value);
  
//     let responseList = document.getElementById('responseList');
//     responseList.innerHTML = ''; // Clear previous responses
  
//     // Combine lawyers and insurance companies into one list
//     const providers = [...lawyers, ...insuranceCompanies];
  
//     // Function to process bids
//     const processBids = (initialBid) => {
//       const responses = providers.map(provider => {
//         if (initialBid >= provider.minBid) {
//           return <p><strong>${provider.name}</strong> from ${provider.location} accepted your bid at $${initialBid}.</p>;
//         } else {
//           return <p><strong>${provider.name}</strong> from ${provider.location} rejected your bid. Minimum acceptable bid is $${provider.minBid}.</p>;
//         }
//       });
  
//       return responses;
//     };
  
//     // Generate and display the responses based on the initial bid
//     const responses = processBids(initialBid);
//     document.getElementById('bidResponses').style.display = 'block';
//     responseList.innerHTML = responses.join('');
  
//     // Check if any bids were rejected, and allow a counter-offer
//     if (responses.some(response => response.includes('rejected'))) {
//       let counterOfferButton = document.createElement('button');
//       counterOfferButton.textContent = 'Increase Bid and Resubmit';
//       counterOfferButton.classList.add('btn', 'btn-warning', 'mt-3');
//       counterOfferButton.addEventListener('click', function () {
//         const newBid = parseFloat(document.getElementById('initialBid').value) + 50; // Increase the bid by $50
//         document.getElementById('initialBid').value = newBid;
  
//         // Regenerate the bid responses based on the increased bid
//         const updatedResponses = processBids(newBid);
//         responseList.innerHTML = updatedResponses.join('');
  
//         // Check again if any bid was rejected and offer another chance to resubmit
//         if (updatedResponses.some(response => response.includes('rejected'))) {
//           responseList.appendChild(counterOfferButton); // Add the counter-offer button again
//         }
//       });
  
//       // Append the counter-offer button to the response list
//       responseList.appendChild(counterOfferButton);
//     }
//   });
//   // bidding.js

// // Function to initialize event listeners
// function init() {
//     // Get the See Responses button
//     const seeResponsesButton = document.querySelector('#bidResponses .btn-primary');

//     // Add a click event listener to the button
//     seeResponsesButton.addEventListener('click', function() {
//         // Redirect to the lawyer list page
//         window.location.href = 'lawyerList.html';
//     });

//     // Add any other initializations or event listeners here
// }

// // Call the init function when the document is ready
// document.addEventListener('DOMContentLoaded', init);
// // insurance.js

// // Function to fetch insurance companies
// async function fetchInsuranceCompanies() {
//     try {
//         const response = await fetch('https://api.example.com/insurance-companies'); // Update with the actual API endpoint
//         const data = await response.json();

//         // Assuming 'data' is an array of insurance companies
//         const insuranceList = document.getElementById('insuranceList');

//         if (data.length === 0) {
//             insuranceList.innerHTML = '<p>No insurance companies available.</p>';
//             return;
//         }

//         // Populate the insurance list
//         data.forEach(company => {
//             const companyDiv = document.createElement('div');
//             companyDiv.className = 'insurance-company';
//             companyDiv.innerHTML = `
//                 <h3>${company.name}</h3>
//                 <p>${company.description}</p>
//                 <p>Contact: ${company.contact}</p>
//                 <button type="button" class="btn btn-primary" onclick="selectCompany('${company.id}')">Select Company</button>
//             `;
//             insuranceList.appendChild(companyDiv);
//         });
//     } catch (error) {
//         console.error('Error fetching insurance companies:', error);
//     }
// }
// // Event listener for the "See Responses" button
// document.querySelector("#bidResponses button[type='response']").addEventListener("click", function() {
//     // Fetch lawyers and insurance companies
//     // For the sake of example, we will simulate this with a static response
//     const lawyers = [
//         { name: "Lawyer Name 1", specialization: "Road Accident" },
//         { name: "Lawyer Name 2", specialization: "Speeding, Drink and Drive" },
//         { name: "Lawyer Name 3", specialization: "Road Rash Driving" }
//     ];
//     const insuranceCompanies = [
//         { name: "Insurance Company 1" },
//         { name: "Insurance Company 2" },
//         { name: "Insurance Company 3" }
//     ];
    
//     let responseHTML = '<h3>Lawyers Who Accepted Your Bid!</h3>';
//     lawyers.forEach(lawyer => {
//         responseHTML += `
//             <div class="lawyer-card">
//                 <h4>${lawyer.name}</h4>
//                 <p>Specialization: ${lawyer.specialization}</p>
//                 <button class="btn btn-primary lawyer-button" data-type="lawyer" data-name="${lawyer.name}">Select Lawyer</button>
//             </div>`;
//     });

//     responseHTML += '<h3>Insurance Companies Who Accepted Your Bid!</h3>';
//     insuranceCompanies.forEach(company => {
//         responseHTML += `
//             <div class="insurance-card">
//                 <h4>${company.name}</h4>
//                 <button class="btn btn-primary insurance-button" data-type="insurance" data-name="${company.name}">Select Insurance</button>
//             </div>`;
//     });

//     document.getElementById("responseList").innerHTML = responseHTML;

//     // Add event listeners for newly created buttons
//     addButtonListeners();
// });

// // Function to add event listeners to newly created buttons
// function addButtonListeners() {
//     // Listener for selecting a lawyer
//     document.querySelectorAll('.lawyer-button').forEach(button => {
//         button.addEventListener('click', function() {
//             const lawyerName = this.getAttribute('data-name');
//             alert(You have selected ${lawyerName}.);
//             window.location.href = "paymentOptions.html"; // Redirect to payment options
//         });
//     });

//     // Listener for selecting an insurance company
//     document.querySelectorAll('.insurance-button').forEach(button => {
//         button.addEventListener('click', function() {
//             const companyName = this.getAttribute('data-name');
//             alert(You have selected ${companyName}.);
//             window.location.href = "paymentOptions.html"; // Redirect to payment options
//         });
//     });
// }