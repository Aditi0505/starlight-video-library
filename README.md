# ![logo](/public/favicon.ico) StarLight Video Library

[Visit Site](https://starlightapp.netlify.app/)

## About

> **StarLight** is a video library app. Inspired by Taylor Swift, this platform contains her music videos, lyric videos, interviews, cover songs and much more!

---

### Implemented using

- React JS
- Redux Toolkit
- React Router v6
- [Redazzle](https://redazzleui.netlify.app/) for CSS
- [MockBee](https://mockbee.netlify.app/) for Backend

---

### Features

#### Home

- Contains landing page with the featured categories.
- Clicking on a banner gets the User redirected to the video listing page with the selected category.

#### Video listing

- Contains all the videos listed, with a section of category filters.
- Contains _clear filters_ button from where User can clear all the applied filters.
- User can click on the _Add to Watch Later_ button which will add the video to the Watch Later Page & once added shows _Remove From Watch Later_ on the video card.
- User can click on a particular video thumbnail that will redirect to a single video page.

#### Single Video Page

- User can navigate to the single page by clicking the video thumbnail.
- User can Save the video to the playlist by checking the checkbox. If the user un-check the selected playlist it will remove the video from the playlist.
- User can like video or dislike a video that will add or remove the video from the Liked Videos List.
- User can add or remove a particular video to watch later that will add or remove the video from the Watch Later list.
- User can add notes for the video.
#### Notes on a video

- User can add notes for a video from the particular video page.
- User can can edit notes for a video from the particular video page.
- User can delete notes of a video from a particular video page.

#### Search Videos

- User can search for a video from the list via the input textbox on the header navbar.
#### Filter Videos by Category
- User can filter videos by Category from the video listing page.
#### Playlist Management

- From the navbar, User can navigate to the playlists where all the playlists are present with the names & videos.
- On the Playlist Page,
    - User can create a new playlist.
    - User can delete an existing playlist
    - User can remove a video from a particular playlist.

#### Like/Dislike Video
- User can like or dislike a particular video from  a single video page which will add or remove the video from the Liked Videos List.
#### Watch Later 
- User can add or remove a particular video to watch later from a single video page that will add or remove the video from the Watch Later list.
#### History Page
- When user views a particular video that will add it to the history.
- User can delete a particular video from the history
- User can see a _Trash_ button icon which will clear all the history at once.
#### Loading & Alerts

- User can see loading spinners when the data in loading.
- User can see the acknowledgment alerts whenever: 
    - Video is added to the Liked Videos List
    - Video is removed from the Liked Videos List
    - Video is added to the Watch Later list
    - Video is removed from the Watch Later List
    - Video is added to the Custom Playlist List
    - Video is removed from the Custom Playlist List
    - A new playlist is created
    - A whole playlist is deleted
#### User profile
- User can see the user profile with details containing this email Id, address, etc.
#### Dark Mode
- Supports light and dark theme.
#### Authentication
- Has login, signup and logout feature.
- A new user can also login using test credentials.
---
## How to run your app locally

> Clone the repository on your local machine with the command below in your terminal, and cd into the _afterglow-extension_ folder

Clone the project

```
git clone https://github.com/Aditi0505/starlight-video-library.git
```

### Running the app

```
cd starlight-video-library
npm start
```

---

## Contributing to The Starlight Video Library

The person who build this (Me!) would highly appreciate if you are willing to add to or improve this project.

### Raise an issue

> If you have suggestions as to how this project could be improved, or you want to report a bug, open an issue!

### How to contribute

- Fork the project repository
- Clone your fork
- Create a new branch with a proper feature name in your local repo
- Make chages, commit and push
- Raise a Pull Request

---

## Connect with me!

[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/aadyaaditi)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/aditi-35bba3149/)

---

![starlight gif](/public/assets/gif/starlight.gif)
