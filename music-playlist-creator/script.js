const modal = document.getElementById("modal");
const content = document.getElementById("modal-cont");
let currentData = [];

let newPlaylistSongs = [];

function showModal(id) {
    // Given the id of the playlist we want to find the corresponding object in the data
    // and populate the modal

    let playlist = currentData.find((x) => x.playlistID === id);

    let modal_songs = playlist.songs;

    document.getElementById("modal-img").src = playlist.playlist_art;
    document.getElementById("modal-name").textContent = playlist.playlist_name;
    document.getElementById("modal-author").textContent =
        playlist.playlist_author;
    document.querySelector(".delete-btn").dataset.id = id;
    document.querySelector(".edit-btn").dataset.id = id;

    // Populate the song list
    dislaySongs(modal_songs, false);

    modal.classList.add("show-overlay");
}

function hideModal() {
    modal.classList.remove("show-overlay");

    // handle the old songs
    document.getElementById("song-list-container").innerHTML = "";
}

function addCardListeners() {
    let cards = document.getElementsByClassName("card");

    for (let item of cards) {
        // console.log(item)
        item.addEventListener("click", () => {
            showModal(parseInt(item.dataset.id));
        });
    }
}

function addModalListeners() {
    // Add modal event listeners. Be midful of ignoring clicks in content
    modal.addEventListener("click", hideModal);
    document
        .getElementById("modal-cont")
        .addEventListener("click", function (event) {
            event.stopPropagation();
        });

    document
        .querySelector("#add-modal")
        .addEventListener("click", toggleAddModal);
    document
        .getElementById("add-modal-content")
        .addEventListener("click", function (event) {
            event.stopPropagation();
        });

    document
        .querySelector("#edit-modal")
        .addEventListener("click", toggleEditModal);
    document
        .getElementById("edit-modal-cont")
        .addEventListener("click", function (event) {
            event.stopPropagation();
        });

    document.querySelector("#main-form").addEventListener("submit", (event) => {
        event.preventDefault();
        addNewPlaylist();
    });

    document.querySelector("#sub-form").addEventListener("submit", (event) => {
        event.preventDefault();
        addNewSong();
    });

    document
        .querySelector("#search-form")
        .addEventListener("submit", (event) => {
            event.preventDefault();
            search();
        });

    document
        .querySelector("#search-form")
        .addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                search();
            }
        });

    document.querySelector(".clear-btn").addEventListener("click", (event) => {
        event.preventDefault();
        clear();
    });
}

function loadPlaylists() {
    console.log("Loading Playlists");

    // Fetching playlists from our json
    fetch("./data/data.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Could not load data");
            }
            return response.json();
        })
        .then((data) => {

            currentData = data;

            // Convert each playlist into playlist card element
            displayCards(currentData);
            console.log("succeess!");
        })
        .catch((error) => {
            console.log("Caught an error: " + error);
        });
}

function createPlaylistCard(playlist) {
    let card = document.createElement("article");
    card.classList.add("card");
    card.dataset.id = playlist.playlistID;
    card.innerHTML = `<img
        src="${playlist.playlist_art}"
        width="100%"
        alt="Playlist Art"
    />
    <div class="card-info">
        <h2 class="title">${playlist.playlist_name}</h2>
        <p class="creator">${playlist.playlist_author}</p>
        <div class="like-count-container">
            <button class="heart-icon" data-isliked="false" onclick='event.stopPropagation();toggleLike(this)'>
                <img
                    src="./assets/img/heart-svgrepo-com.svg"
                    width="20px"
                    alt="Heart icon"
                />
            </button>
            <p class="like-count">${playlist.like_count}</p>
        </div>
    </div>
    `;
    return card;
}

function createSongCard(song) {
    let card = document.createElement("article");
    card.classList.add("song-card");
    let duration = song.song_duration;
    let minutes = Math.floor(duration / 60);
    let seconds = (duration % 60).toString().padStart(2, "0");
    let durationDisplay = `${minutes}:${seconds}`;

    card.innerHTML = `
    <img
        src="${song.song_img}"
        alt="Song Art"
        height="100%"
    />
    <div class="song-info">
        <h3 class="song-title">${song.song_name}</h3>
        <p class="song-artist">${song.song_artist}</p>
        <p class="song-album">${song.song_album}</p>
    </div>
    
    <div class="duration-container">
        <p class="song-duration">${durationDisplay}</p>
    </div>
    `;

    return card;
}

function createEditSongCard(song) {
    let card = document.createElement("article");
    card.classList.add("song-card");
    let duration = song.song_duration;

    card.innerHTML = `
    <img
        src="${song.song_img}"
        alt="Song Art"
        height="100%"
    />
    <div class="song-info">
        <input form='edit-form' class="edit-song-name" type="text" value="${song.song_name}">
        <input form='edit-form' class="edit-song-artist" type="text" value="${song.song_artist}">
        <input form='edit-form' class="edit-song-album" type="text" value="${song.song_album}">
    </div>
    
    <div class="duration-container">
        <input form='edit-form' class="edit-song-duration" type="text" value="${duration}">
    </div>
    `;

    return card;
}

function toggleLike(btn) {
    console.log("Like button clicked");
    let count = btn.parentElement.querySelector(".like-count");
    let newCount;

    if (btn.dataset.isliked === "false") {
        newCount = parseInt(count.textContent) + 1;
        btn.dataset.isliked = "true";
        btn.querySelector("img").classList.add("liked");
    } else {
        newCount = parseInt(count.textContent) - 1;
        btn.dataset.isliked = "false";
        btn.querySelector("img").classList.remove("liked");
    }

    count.textContent = newCount;
}

function dislaySongs(songs) {
    songs.forEach((song) => {
        // console.log(song)
        let newSong = createSongCard(song);
        document.getElementById("song-list-container").appendChild(newSong);
    });
}

function shuffle(btn) {
    let container = btn.parentElement.querySelector("#song-list-container");

    let newSongArray = [];
    let songs = container.children;
    for (let i = 0; i < songs.length; i++) {
        newSongArray.push(songs[i]);
    }

    newSongArray = shuffleArray(newSongArray);
    container.innerHTML = "";

    for (let i = 0; i < newSongArray.length; i++) {
        //console.log(i, newSongArray[i])
        container.appendChild(newSongArray[i]);
    }
}

function shuffleArray(array) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
}

function populateFeaturedPlaylist() {
    fetch("./data/data.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Could not load data");
            }
            return response.json();
        })
        .then((data) => {
            currentData = data;

            let randomPlaylist = data[Math.floor(Math.random() * data.length)];
            //console.log(randomPlaylist)

            document.querySelector(".featured-playlist-image").src =
                randomPlaylist.playlist_art;
            document.querySelector(".featured-playlist-name").textContent =
                randomPlaylist.playlist_name;
            document.querySelector(".featured-playlist-author").textContent =
                randomPlaylist.playlist_author;

            displayFeaturedSongs(randomPlaylist.songs);
        })
        .catch((error) => {
            console.log("Caught an error: " + error);
        });
}

function displayFeaturedSongs(songs) {
    songs.forEach((song) => {
        let newCard = createSongCard(song);
        document.querySelector(".featured-song-container").appendChild(newCard);
    });
}

function del_playlist(btn) {
    hideModal();
    let id = parseInt(btn.dataset.id);
    let filteredData = currentData.filter((x) => x.playlistID !== id);
    currentData = filteredData;
    displayCards(currentData);
}

function displayCards(data) {
    document.querySelector(".playlist-cards").innerHTML = "";

    if (data.length === 0) {
        let container = document.getElementById("playlist-container");
        container.classList.add("container-no-data");

        let notification = document.createElement("div");
        notification.innerHTML = "<h2>No playlists to show</h2>";
        container.appendChild(notification);

        return;
    }

    data.forEach((playlist) => {
        //console.log('Creating playlist card for ' + playlist)
        let newCard = createPlaylistCard(playlist);
        //console.log(newCard);
        document.getElementById("playlist-container").appendChild(newCard);
        //console.log("Card added!")
    });

    // Don't forget to re-add the event listeners!
    addCardListeners();
}

function toggleMenu() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function sortAlphabetically() {
    let sortedData = currentData.sort((a, b) =>
        a.playlist_name.localeCompare(b.playlist_name)
    );
    currentData = sortedData;
    displayCards(currentData);
}

function sortLikes() {
    let sortedData = currentData.sort(
        (a, b) => -parseInt(a.like_count) + parseInt(b.like_count)
    );
    currentData = sortedData;
    displayCards(currentData);
}

function sortDates() {
    let sortedData = currentData.sort((a, b) => {
        let res = new Date(a.date_added) - new Date(b.date_added);
        return res;
    });
    currentData = sortedData;
    displayCards(currentData);
}

function toggleAddModal() {
    let addModal = document.querySelector("#add-modal");

    if (addModal.classList.contains("show-overlay")) {
        addModal.classList.remove("show-overlay");
        // handle forms
        newPlaylistSongs = [];
        document.querySelector(".add-song-list").innerHTML = "";
        document.querySelector("#main-form").reset();
        document.querySelector("#sub-form").reset();
    } else {
        addModal.classList.add("show-overlay");
    }
}

function addNewSong() {
    const song = {
        song_img: "./assets/img/song.png",
        song_name: document.querySelector("#song-name-input").value,
        song_artist: document.querySelector("#song-name-artist").value,
        song_album: document.querySelector("#song-name-album").value,
        song_duration: document.querySelector("#song-name-duration").value,
    };

    newPlaylistSongs.push(song);

    let card = createSongCard(song);

    document.querySelector(".add-song-list").appendChild(card);

    document.querySelector("#sub-form").reset();
}

function addNewPlaylist() {
    let playlist = {
        playlistID: Date.now(),
        playlist_name: document.querySelector("#main-form-name").value,
        playlist_author: document.querySelector("#main-form-author").value,
        playlist_art: document.querySelector("#main-form-art").value,
        date_added: Date.now().toString(),
        songs: newPlaylistSongs,
        like_count: 0,
    };

    currentData.push(playlist);
    displayCards(currentData);

    document.querySelector("#main-form").reset();
    newPlaylistSongs = [];
    document.querySelector(".add-song-list").innerHTML = "";
}

function search() {
    let query = document.querySelector("#search-text").value;
    let newData;

    if (document.querySelector("#radio1").checked) {
        newData = currentData.filter((x) =>
            x.playlist_name.toLowerCase().includes(query.toLowerCase())
        );
    } else {
        newData = currentData.filter((x) =>
            x.playlist_author.toLowerCase().includes(query.toLowerCase())
        );
    }

    displayCards(newData);

    document.querySelector("#search-form").reset();
}

function clear() {
    displayCards(currentData);
    document.querySelector("#search-form").reset();
}

function toggleEditModal() {
    let editModal = document.querySelector("#edit-modal");

    if (editModal.classList.contains("show-overlay")) {
        editModal.classList.remove("show-overlay");
        editPlaylist();
        document.querySelector("#edit-song-list-container").innerHTML = "";
    } else {
        editModal.classList.add("show-overlay");
    }
}

function edit(btn) {
    let id = parseInt(btn.dataset.id);
    let playlist = currentData.find((x) => x.playlistID === id);
    document.querySelector("#edit-modal-img").src = playlist.playlist_art;
    document.querySelector(".edit-name").value = playlist.playlist_name;
    document.querySelector(".edit-author").value = playlist.playlist_author;

    playlist.songs.forEach((song) => {
        let card = createEditSongCard(song);

        document.querySelector("#edit-song-list-container").appendChild(card);
    });

    toggleEditModal();
}

function editPlaylist() {
    let id = parseInt(document.querySelector(".edit-btn").dataset.id);

    let oldPlaylist = currentData.find((x) => x.playlistID === id);

    let filteredData = currentData.filter((x) => x.playlistID !== id);

    let newPlaylist = {
        playlistID: oldPlaylist.playlistID,
        playlist_name: document.querySelector(".edit-name").value,
        playlist_author: document.querySelector(".edit-author").value,
        playlist_art: oldPlaylist.playlist_art,
        date_added: oldPlaylist.date_added,
        songs: [],
        like_count: oldPlaylist.like_count,
    };

    let songs = document.querySelector("#edit-song-list-container").children;
    for (let i = 0; i < songs.length; i++) {
        song = songs[i];
        let songName = song.children[1].children[0].value;
        let songArtist = song.children[1].children[1].value;
        let songAlbum = song.children[1].children[2].value;
        let songDuration = song.children[2].children[0].value;

        let newSong = {
            song_img: "./assets/img/song.png",
            song_name: songName,
            song_artist: songArtist,
            song_album: songAlbum,
            song_duration: songDuration,
        };

        newPlaylist.songs.push(newSong);
    }

    filteredData.push(newPlaylist);

    currentData = filteredData;

    hideModal();
    displayCards(currentData);
}

function addDropDownListeners() {
    window.onclick = function (event) {
        if (!event.target.matches(".dropbtn")) {
            if (
                document
                    .querySelector(".dropdown-content")
                    .classList.contains("show")
            ) {
                document
                    .querySelector(".dropdown-content")
                    .classList.remove("show");
            }
        }
    };
}

// call functions depending on page
if (
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname === "/"
) {
    console.log("This code is running inside index.html");
    loadPlaylists();
    addModalListeners();
    addDropDownListeners();
} else if (window.location.pathname.endsWith("featured.html")) {
    console.log("Running featured page code");
    populateFeaturedPlaylist();
}
