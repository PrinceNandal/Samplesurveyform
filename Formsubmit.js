document.getElementById('surveyform').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const formData = new FormData(this);
    const data = {
        SurveyorId: formData.get('SurveyorId'),
        subscribe: formData.get('subscribe'),
        age: formData.get('age'),
        suburb: formData.get('suburb'),
        days: formData.get('days'),
        preferences: []
    };

    // Collect checkbox values
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
        data.preferences.push(checkbox.value);
    });

    // Send data to the API
    fetch('https://formspree.io/f/xovayerb', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert('Survey submitted successfully!');
        console.log('Success:', data);
    })
    .catch((error) => {
        alert('There was an error submitting the survey.');
        console.error('Error:', error);
    });
});