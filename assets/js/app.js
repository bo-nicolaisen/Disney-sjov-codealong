//
let myPage = 1;
const myAppElement = document.getElementById('myApp');

// entry point
loadingScreen();
setUpShowAllButton();
setupSearchForm();
fetchOneCharacter(4703);



function fetchOneCharacter(myId) {
    let URI = `https://api.disneyapi.dev/characters/${myId}`

    fetch(URI).then((response) => {
        //console.log(response);

        if (response.ok) {
            return response.json();
        } else {
            alert("api error du får lige mickey mouse");
            fetchOneCharacter(4703);

        }



    }).then((data) => {

        //console.log(data);
        showCharacter(data);

    }).catch((err) => {

        console.error(err.message);

    }



    );

}

function showCharacter(myData) {
    //  myAppElement
    console.log(myData.name);

    let myFilms = '<h3>Films:</h3>';
    myData.films.map((film) => {
        myFilms += `${film}, `
    }
    );


    let myTvShows = '<h3>TV Shows:</h3>';
    myData.tvShows.map((show) => {
        myTvShows += `${show}, `
    }
    );



    let myHTML = `<h2>${myData.name}</h2><img src="${myData.imageUrl}"><p>${myFilms}</p><p>${myTvShows}</p>`;
    myAppElement.innerHTML = myHTML;

}

// loading screen  kaldes når vi henter data
function loadingScreen() {
    myAppElement.innerHTML = "<h2>Loading...</h2>";
}


function setUpShowAllButton() {

    let showAllButton = document.getElementById('showAllButton');
    showAllButton.addEventListener('click', (e) => {
        myPage = 1;
        fetchAllCharacters();
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
            fetchSearch(myValue);
        }
        else {
            alert('indtast i søge felt.');
        }

    });

}



function fetchCaracterPage() {
    console.log('fetchCaracterPage');
}



function fetchSearch(myName) {


    let URI = `https://api.disneyapi.dev/character?name=${myName}`


    fetch(URI).then((response) => {
        //console.log(response);

        if (response.ok) {
            return response.json();
        } else {
            alert("api error du får lige mickey mouse");
            fetchOneCharacter(4703);

        }



    }).then((data) => {

        console.log(data);
        showSearch(data.data);

    }).catch((err) => {

        console.error(err.message);

    }



    );

}


function showSearch(myData) {

    let myHTML = '';

    myData.map((myCharacter) => {
        myHTML += `<h3>${myCharacter.name}</h3><img src="${myCharacter.imageUrl}"></br>`;

    });

    myAppElement.innerHTML = myHTML;
}



function fetchAllCharacters() {

    let URI = `https://api.disneyapi.dev/characters?page=${myPage}`

    fetch(URI).then((response) => {
        //console.log(response);

        if (response.ok) {
            return response.json();
        } else {
            alert("api error du får lige mickey mouse");
            fetchOneCharacter(4703);

        }

    }).then((data) => {

        console.log(data);

        showAll(data.data);

    }).catch((err) => {
        console.error(err.message);

    });


}

function showAll(myData) {

    myAppElement.innerHTML = "";
    makePageButtons();

    let myHTML = '';

    myData.map((myCharacter) => {
        myHTML += `<h3>${myCharacter.name}</h3><img src="${myCharacter.imageUrl}"></br>`;

    });

    myAppElement.innerHTML += myHTML;
    makePageButtons();
}

function makePageButtons() {

    let prevButton = document.createElement('button');
    prevButton.innerText = 'prev';
    prevButton.addEventListener('click', (e) => {
        myPage--;
        if (myPage < 1) {
            myPage = 1;
        }
        fetchAllCharacters();
    });

    let nextButton = document.createElement('button');
    nextButton.innerText = 'next';
    nextButton.addEventListener('click', (e) => {
        myPage++;
        if (myPage >= 149) {
            myPage = 149;
        }
        fetchAllCharacters();
    });
    myAppElement.appendChild(prevButton);
    myAppElement.appendChild(nextButton);

}