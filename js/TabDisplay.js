(function() {
    const tabButtons = document.querySelectorAll("#tab-buttons .tab-button");
    const tabs = document.querySelectorAll("#tabs .tab");

    ActivateTab(0);

    // Add Event Listeners to activate the tab on click
    for (let i=0; i<tabButtons.length; i++){
        tabButtons[i].addEventListener("click", () => {
            ActivateTab(i);
        });
    }

    // Activate the tab on "index", deactivate others.
    function ActivateTab(index)
    {
        // RESET ALL
        for (const tabButton of tabButtons) {
            tabButton.className = "tab-button";
        }
        for (const tab of tabs) {
            tab.className = "tab";
        }
    
        // ACTIVATE INDEX
        tabButtons[index].className += " active";
        tabs[index].className += " active";
    }
})();
