function populateCountries() {
    var countries = ["India", "China", "US", "UK", "Australia"];
    var select = document.getElementById("country");

    for (var i = 0; i < countries.length; i++) {
        var option = document.createElement("option");
        option.text = countries[i];
        option.value = countries[i];
        select.appendChild(option);
    }
}
populateCountries();

function validateForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var jobTitle = document.getElementById("jobTitle").value;
    var companyName = document.getElementById("companyName").value;
    var country = document.getElementById("country").value;
    var workshops = document.querySelectorAll('input[name="workshop"]:checked').length;
    var terms = document.getElementById("terms").checked;

    if (name === '' || email === '' || jobTitle === '' || companyName === '' || country === '' || workshops === 0 || !terms) {
        alert("All fields are required.");
        return false;
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    return true;
}

document.getElementById("submit").addEventListener("click", function(event) {
    event.preventDefault();
    if (validateForm()) {
        alert("Form submitted successfully!");
        document.getElementById("registrationForm").reset();
    }
});

