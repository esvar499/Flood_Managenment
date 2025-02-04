document.getElementById("helpForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let contact = document.getElementById("contact").value;
    let location = document.getElementById("location").value;
    let message = document.getElementById("message").value;

    // Save to Firebase
    db.collection("requests").add({
        name: name,
        contact: contact,
        location: location,
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        alert("Request submitted successfully!");
        document.getElementById("helpForm").reset();
    }).catch(error => {
        console.error("Error submitting request: ", error);
    });
});

// Fetch and display requests
db.collection("requests").orderBy("timestamp", "desc").onSnapshot(snapshot => {
    let requestsList = document.getElementById("requestsList");
    requestsList.innerHTML = "";
    snapshot.forEach(doc => {
        let request = doc.data();
        requestsList.innerHTML += `
            <div class="request">
                <h3>${request.name}</h3>
                <p><strong>Contact:</strong> ${request.contact}</p>
                <p><strong>Location:</strong> ${request.location}</p>
                <p>${request.message}</p>
                <hr>
            </div>
        `;
    });
});
