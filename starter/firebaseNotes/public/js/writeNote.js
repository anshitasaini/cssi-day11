
window.onload = event => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('Logged in as: ' + user.displayName);
            googleUser = user;
        } 
        else {
            window.location = 'index.html'; // If not logged in, navigate back to login page.
        }
    });
}

const labels = [];

const handleNoteSubmit = () => {
    const noteTitle = document.querySelector("#noteTitle");
    const noteText = document.querySelector("#noteText");
    const labelText = document.querySelector("#labelText");
    firebase.database().ref(`users/${googleUser.uid}`).push({
        title: noteTitle.value,
        text: noteText.value,
        label: labelText.value
    })
    .then(() => {
        labels.push(labelText.value)
        noteTitle.value = "";
        noteText.value = "";
        labelText.value = "";
    });
}