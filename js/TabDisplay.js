(function() {
    const tabButtons = document.querySelectorAll("#tab-buttons .tab-button");
    const tabs = document.querySelectorAll("#tabs .tab");

    ActivateTab(0);

    for (let i=0; i<tabButtons.length; i++)
    {
        tabButtons[i].addEventListener("click", () => {
            ActivateTab(i);
        });
    }

    function ActivateTab(index)
    {
        for (const tabButton of tabButtons) {
            tabButton.className = "tab-button";
        }
        for (const tab of tabs) {
            tab.className = "tab";
        }
    
        tabButtons[index].className += " active";
        tabs[index].className += " active";
    }
})();
