## Unit Assignment: Music Playlist Explorer

Submitted by: **Javier Carrillo Zamora**

Estimated time spent: **15** hours spent in total

Deployed Application: [Music Playlist Explorer Deployed Site](https://codepath-proj-1.onrender.com)

### Application Features

#### CORE FEATURES

-   [x] **Display Playlists**

    -   [x] Dynamically render playlists on the homepage using JavaScript.
        -   [x] Playlists should be shown in grid view.
        -   [x] Playlist images should be reasonably sized (at least 6 playlists on your laptop when full screen; large enough that the playlist components detailed in the next feature are legible).
    -   [x] Fetch data from a provided Javascript file and use it to create interactive playlist tiles.

-   [x] **Playlist Components**

    -   [x] Each tile should display the playlist's:
        -   [x] Cover image
        -   [x] Name
        -   [x] Author
        -   [x] Like count

-   [x] **Playlist Details**

    -   [x] Create a modal pop-up view that displays detailed information about a playlist when a user clicks on a playlist tile.
    -   [x] The modal should show the playlist's:
        -   [x] Cover image
        -   [x] Name
        -   [x] Author
        -   [x] List of songs, including each song's:
            -   [x] Title
            -   [x] Artist
            -   [x] Duration
    -   [x] The modal itself should:
        -   [x] Not occupy the entire screen.
        -   [x] Have a shadow to show that it is a pop-up.
        -   [x] Appear floating on the screen.
        -   [x] The backdrop should appear darker or in a different shade.

-   [x] **Like Playlists**

    -   [x] Implement functionality to allow users to like playlists by clicking a heart icon on each playlist tile.
    -   [x] When the heart icon is clicked:
        -   [x] If previously unliked:
            -   [x] The like count on the playlist tile should increase by 1.
            -   [x] There should be visual feedback (such as the heart turning a different color) to show that the playlist has been liked by the user.
        -   [x] If previously liked:
            -   [x] The like count on the playlist tile should decrease by 1.
            -   [x] There should be visual feedback (such as the heart turning a different color) to show that the playlist has been unliked by the user.
        -   [x] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS:** In addition to showcasing the above features, for ease of grading, please film yourself liking and unliking:
            -   [x] a playlist with a like count of 0
            -   [x] a playlist with a non-zero like count

-   [x] **Shuffle Songs**
    -   [x] Enable users to shuffle the songs within a playlist using a shuffle button in the playlist's detail modal.
    -   [x] When the shuffle button is clicked, the playlist's songs should display in a different order.
    -   [x] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS:** In addition to showcasing the above features, for ease of grading, please show yourself shuffling the same playlist more than once.
-   [x] **Featured Page**
    -   [x] Application includes a dedicated page that randomly selects and displays a playlist, showing the playlist’s:
        -   [x] Playlist Image
        -   [x] Playlist Name
        -   [x] List of songs, including each song's:
            -   [x] Title
            -   [x] Artist
            -   [x] Duration
    -   [x] When the page is refreshed or reloaded, a new random playlist is displayed
        -   For example, navigating to the all playlists page and then back to the featured playlist page should result in a new random playlist being displayed
        -   Note that because your algorithm will not be truly random, it is possible that the same playlist will feature twice in a row.
        -   [x] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS:** In addition to showcasing the above features, for ease of grading, please show yourself refreshing the featured page more than once.
    -   [x] Application includes a navigation bar or some other mechanism such that users can navigate to the page with all playlists from the featured page and vice versa without using the browser's back and forward buttons.

#### STRETCH FEATURES

-   [x] **Add New Playlists**

    -   [x] Allow users to create new playlists.
    -   [x] Using a form, users can input playlist:
        -   [x] Name
        -   [x] Author
        -   [x] Cover image
        -   [x] Add one or more songs to the playlist, specifying the song's:
            -   [x] Title
            -   [x] Artist
    -   [x] The resulting playlist should display in the grid view.
    -   [x] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS:** For ease of grading, please show yourself adding at least two songs to the playlist.

-   [x] **Edit Existing Playlists**

    -   [x] Enable users to modify the details of existing playlists.
    -   [x] Add an edit button to each playlist tile.
    -   [x] Users can update the playlist:
        -   [x] Name
        -   [x] Author
        -   [x] Songs
    -   [x] The playlist grid view and playlist detail modal should update to display any changes (see Required Features, Criterion 1 & 2).
    -   [x] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS:** For ease of grading, please show yourself:
        -   [x] Editing all of a playlist's features (name, creator, AND songs)
        -   [x] Editing some of a playlist's features (name, creator, OR songs)

-   [x] **Delete Playlists**

    -   [x] Add a delete button to each playlist tile within the grid view.
    -   [x] When clicked, the playlist is removed from the playlist grid view.

-   [x] **Search Functionality**

    -   [x] Implement a search bar that allows users to filter playlists by:
        -   [x] Name
        -   [x] Author
    -   [x] The search bar should include:
        -   [x] Text input field
        -   [x] Submit/Search Button
        -   [x] Clear Button
    -   [x] Playlists matching the search query in the text input are displayed in a grid view when the user:
        -   [x] Presses the Enter Key
        -   [x] Clicks the Submit/Search Button
    -   [x] User can click the clear button. When clicked:
        -   [x] All text in the text input field is deleted
        -   [x] All playlists in the `data.json` file are displayed in a grid view
        -   [x] **Optional:** If the Add Playlist, Edit Existing Playlist, or Delete Playlist stretch features were implemented:
            -   [x] If users can add a playlist, added playlists should be included in search results.
            -   [x] If users can edit a playlist, search results should reflect the latest edits to each playlist.
            -   [x] If users can delete a playlist, deleted playlists should no longer be included in search results.
            -   **Note:** You will not be graded on the implementation of this optional subfeature to keep your grade of this stretch feature independent of your implementation of other stretch features. However, we highly suggest including this in your implementation to model realistic behavior of real applications.

-   [x] **Sorting Options**
    -   [x] Implement a drop-down or button options that allow users to sort the playlist by:
        -   [x] Name (A-Z alphabetically)
        -   [x] Number of likes (descending order)
        -   [x] Date added (most recent to oldest, chronologically)
    -   [x] Selecting a sort option should result in a reordering based on the selected sort while maintaining a grid view.

### Walkthrough Video

https://www.loom.com/share/64de726a05d2425690b82a7af8be73c2?sid=fae11dcf-b293-41e2-80e0-0e4f4558c19a

### Reflection

-   Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

    -  I felt each lab did teach me skills that I used in the project. Specifically, Lab 4 and the DOM manipulation helped a lot. The main feature that was hard to implement was the adding and editing of new playlists. I had to rethink what the best way of storing playlists were and ho to make adding and editing songs intuitive and simple for the user.

-   If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.

    - I would have spent more time on making the page responsive and revamping the way you edit playlists. I think right now the system is a little bit clunky. Also, some extra features that could be added in the future is maybe a song data file that remembers songs so that you could reuse them in other playlists and it remembers the artist and album.

-   Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

    - My demo pretty much went as planned, I had practiced beforehand to make sure I hit all the talking points in the specified time. Something that didn't go as planned was that in my computer I had autocompletions for when I was creating a new playlist. However, on demo time I was not on my computer and didn't have that option, slowing me down. One of my peers involved the audience when adding songs, and I think that made the demo a little bit more fun and interactive.

### Open-source libraries used

-   n/a

### Shout out

Shout out to Gabriel for the good vibes and the excellent lectures this week. I fell like I learned a whole new side of this JavaScript that I did not know of 🔥
