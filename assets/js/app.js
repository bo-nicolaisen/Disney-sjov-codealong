//
let myPage = 1;
let searchString = "";
const myAppElement = document.getElementById('myApp');



// entry point
loadingScreen();
setUpShowAllButton();
setupSearchForm();
fetchOneCharacter(4703);



function fetchOneCharacter(myId, mySender) {

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
        showCharacter(data, mySender);



    }).catch((err) => {

        console.error(err.message);

    }



    );

}

function showCharacter(myData, mySender) {



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


    switch (mySender) {
        case "showAll":
            let myReturnButton = document.createElement('button');
            myReturnButton.innerText = 'tilbage';

            myReturnButton.addEventListener('click', (e) => {
                fetchAllCharacters();

            });
            myAppElement.appendChild(myReturnButton);
            break;

        case "searchResult":
            let myreturnSearch = document.createElement('button');
            myreturnSearch.innerText = 'tilbage';

            myreturnSearch.addEventListener('click', (e) => {
                fetchSearch(searchString);

            });
            myAppElement.appendChild(myreturnSearch);


            break;

        default:

            break;
    }


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

            searchString = myValue;
            fetchSearch(myValue);
        }
        else {
            alert('indtast i søge felt.');
        }

    });

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


    myAppElement.innerHTML = "";



    myData.map(

        (myCharacter) => {

            //console.log('id: ' + myCharacter._id);

            let myCard = document.createElement('article');

            let myHTML = `<h3>${myCharacter.name}</h3><img src="${myCharacter.imageUrl}">`;
            myCard.innerHTML = myHTML;

            myCard.addEventListener('click', (e) => {

                //console.log('klik: ' + e.currentTarget);
                //console.log('id: ' + myCharacter._id);
                fetchOneCharacter(myCharacter._id, "searchResult");


            });



            myAppElement.appendChild(myCard);
        }
    );


}



function fetchAllCharacters() {

    let URI = `https://api.disneyapi.dev/characters?page=${myPage}`




    fetch(URI).then(
        (response) => {

            console.log(response);


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


    myData.map(

        (myCharacter) => {

            //console.log('id: ' + myCharacter._id);

            let myCard = document.createElement('article');

            let myHTML = `<h3>${myCharacter.name}</h3><img src="${myCharacter.imageUrl}">`;
            myCard.innerHTML = myHTML;

            myCard.addEventListener('click', (e) => {

                //console.log('klik: ' + e.currentTarget);
                //console.log('id: ' + myCharacter._id);
                fetchOneCharacter(myCharacter._id, "showAll");


            });



            myAppElement.appendChild(myCard);
        }
    );





    makePageButtons();

}




function makePageButtons() {


    let myNav = document.createElement('nav');

    let prevButton = document.createElement('button');
    prevButton.innerText = 'prev';


    prevButton.addEventListener('click', (e) => {
        myPage--;

        if (myPage < 1) {
            myPage = 1;
        }
        else {

            fetchAllCharacters();
        }

    }
    );


    let nextButton = document.createElement('button');
    nextButton.innerText = 'next';

    nextButton.addEventListener('click', (e) => {

        myPage++;
        if (myPage > 149) {
            myPage = 149;
        }
        else {

            fetchAllCharacters();
        }


    });


    myNav.appendChild(prevButton);
    myNav.appendChild(nextButton);

    myAppElement.appendChild(myNav);


}