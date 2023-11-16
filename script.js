// Simulate sending a message and getting a response from Python script
function sendMessage(message) {
    fetch('http://127.0.0.1:5000/send_message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
    })
    .then(response => response.json())
    .then(data => {
        receiveMessage(data.response); // Handle the response from the server
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Simulate receiving a message from Python script
function receiveMessage(message) {
    const messagesContainer = document.querySelector('.chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.className = 'message received';
    messagesContainer.appendChild(messageDiv);
}

// Event listener for the send button
document.querySelector('.chat-input button').addEventListener('click', () => {
    const inputElement = document.querySelector('.chat-input input');
    const message = inputElement.value.trim();
    
    if(message) {
        // Display the sent message in the chat
        const messagesContainer = document.querySelector('.chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.className = 'message sent';
        messagesContainer.appendChild(messageDiv);

        // Send the message to the Python script
        sendMessage(message);

        // Clear the input field
        inputElement.value = '';
    }
});

// Function to toggle the course dropdown visibility
function toggleDropdown(courseBlockElement) {
    // Get the dropdown element within the clicked course block
    const dropdown = courseBlockElement.querySelector('.course-dropdown');
    
    // Toggle the display of the dropdown
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    
    // Assuming you will fetch course data from Python, you might call it here
    // fetchCourseData();
}

// Placeholder function to mimic fetching course data
function fetchCourseData() {
    // Mock data - replace this with your fetch call to the Python script
    const courses = ['Algebra', 'Biology', 'Chemistry', 'Data Science', 'Economics'];

    // Find all dropdowns and populate them with the courses
    document.querySelectorAll('.course-dropdown').forEach(dropdown => {
        // Clear existing dropdown content
        dropdown.innerHTML = '';
        
        // Add courses to the dropdown
        courses.forEach(course => {
            const courseOption = document.createElement('div');
            courseOption.textContent = course;
            courseOption.classList.add('dropdown-option');
            courseOption.onclick = function() { selectCourse(course); }; // Add click handler to select a course
            dropdown.appendChild(courseOption);
        });
    });
}

// Function to handle course selection
function selectCourse(course) {
    console.log(`Course selected: ${course}`);
    // You can add more functionality here such as updating the course block title, etc.
}

// Call fetchCourseData on page load to populate dropdowns
document.addEventListener('DOMContentLoaded', fetchCourseData);