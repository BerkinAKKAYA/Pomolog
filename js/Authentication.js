(function() {

    const authProvider = new firebase.auth.GoogleAuthProvider();

    const SignIn  = () => firebase.auth().signInWithPopup(authProvider);
    const SignOut = () => firebase.auth().signOut();
    
    document.getElementById("sign-in-button").addEventListener("click", SignIn);
    document.getElementById("sign-out")      .addEventListener("click", SignOut);

    UpdateAuthPanels();
    firebase.auth().onAuthStateChanged(UpdateAuthPanels);
    
    function UpdateAuthPanels()
    {
        const signInPanel = document.getElementById("log-in-screen");
        const mainPanel = document.querySelector("main");
    
        if (firebase.auth().currentUser) {
    
            signInPanel.style.display = "none";
            mainPanel.style.display = "block";
    
        } else {
    
            signInPanel.style.display = "flex";
            mainPanel.style.display = "none";
    
        }
    }

})();