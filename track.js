let workouts = []; 
let totalCalories = 0; 
let totalWorkouts = 0; 
let progressChart = null; 

// Check if there is any stored data in localStorage and load that data
if (localStorage.getItem('workouts')) {
    workouts = JSON.parse(localStorage.getItem('workouts')); // Retrieve and parse saved workouts
    updateDashboard(); // Update total calories and workout count on the page when you opened
    updateChart(); // Display the chart with existing data means past data
}

// Function to add a new workout
function addWorkout() {
    // Get input values from the form
    const name = document.getElementById('workout-name').value;
    const calories = parseFloat(document.getElementById('calories-burned').value);
    const type = document.getElementById('workout-type').value;

    
    if (name && !isNaN(calories)) {
        // Create a workout object with the entered details
        const workout = {
            name,
            calories,
            type,
            date: new Date().toLocaleDateString() // Store the current date
        };

        workouts.push(workout); // Add the workout to the array
        localStorage.setItem('workouts', JSON.stringify(workouts)); // Save the updated array to localStorage

        updateDashboard(); // Update the totals on the dashboard
        updateChart(); // Update the progress chart

        // Clear input fields for next entry
        document.getElementById('workout-name').value = '';
        document.getElementById('calories-burned').value = '';
        document.getElementById('workout-type').value = 'running';
    } else {
        alert("Please enter valid workout details."); 
    }
}

// Function to clear all workout data
function clearData() {
    // Confirm the user's action before clearing
    if (confirm("Are you sure you want to clear all workout data?")) {
        localStorage.removeItem('workouts'); // Remove data from localStorage
        workouts = []; // Clear the local array
        updateDashboard(); // Reset the dashboard display
        updateChart(); // Reset the chart
        alert("Data cleared successfully!");
    }
}

// Function to update the dashboard values (total calories and workouts)
function updateDashboard() {
    // Calculate total calories burned
    totalCalories = workouts.reduce((total, workout) => total + workout.calories, 0);
    // Get total number of workouts
    totalWorkouts = workouts.length;

    // Update the HTML elements with new values
    document.getElementById('total-calories').innerText = totalCalories;
    document.getElementById('total-workouts').innerText = totalWorkouts;
}

// Function to create or update the progress chart
function updateChart() {
    const ctx = document.getElementById('progressChart').getContext('2d');

    // Destroy the previous chart if it exists to avoid overlapping
    if (progressChart) {
        progressChart.destroy();
    }

    // Prepare data for the chart
    const labels = workouts.map(workout => workout.date); // Dates as X-axis labels
    const data = workouts.map(workout => workout.calories); // Calories burned as Y-axis data

    // Create a new Chart.js line chart
    progressChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Calories Burned',
                data: data,
                borderColor: '#FF6347', // Line color
                fill: false // Do not fill under the line
            }]
        },
        options: {
            responsive: true, // Make the chart responsive
            plugins: {
                legend: {
                    position: 'top' // Place legend at the top
                }
            },
            aspectRatio: 1.5 // Maintain aspect ratio
        }
    });
}
