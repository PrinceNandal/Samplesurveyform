document.getElementById('surveyform').addEventListener('submit', function(event) {
    event.preventDefault(); 

    
    const formData = new FormData(this);
    const data = {
        SurveyorId: formData.get('SurveyorId'),
        subscribe: formData.get('subscribe'),
        age: formData.get('age'),
        suburb: formData.get('suburb'),
        days: formData.get('days'),
        preferences: []
    };

    
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
        data.preferences.push(checkbox.value);
    });

    if (data.preferences.length === 0) {
        alert('Please select at least one option in the preferences section.');
        return; 
    }

    
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
