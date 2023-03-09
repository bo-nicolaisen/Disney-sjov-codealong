//
let myPage = 1;
const myAppElement = document.getElementById('myApp');

// entry point
loadingScreen();
setUpShowAllButton();
setupSearchForm();

// loading screen  kaldes når vi henter data
function loadingScreen() {
    myAppElement.innerHTML = "<h2>Loading...</h2>";
}


function setUpShowAllButton() {

    let showAllButton = document.getElementById('showAllButton');
    showAllButton.addEventListener('click', (e) => {
        myPage = 1;
        fetchCaracterPage();
    });
}



function setupSearchForm() {

    let searchButton = document.getElementById('searchButton');

    searchButton.addEventListener('click', (e) => {
        e.preventDefault();

        let searchInput = document.getElementById('searchInput');
        let myValue = searchInput.value;

        if (myValue) {
            console.log(' vi har string ' + myValue);
        }
        else {
            alert('indtast i søge felt.');
        }

    });

}



function fetchCaracterPage() {
    console.log('fetchCaracterPage');
}