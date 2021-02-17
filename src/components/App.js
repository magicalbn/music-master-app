import React, { Component } from "react";
import Artist from "./Artist";
import Tracks from "./Tracks";
import Spinner from './Spinner/spinner'

const API_ARTIST = "https://spotify-api-wrapper.appspot.com";
const API_TRACKS = "https://spotify-api-wrapper.appspot.com/artist";

class App extends Component {
    state = { artistQuery: "", artistDetails: null, tracksList: [], loading: false };

    updateArtistQuery = event => {
        //console.log(event.target.value);
        this.setState({ artistQuery: event.target.value });
    }

    searchArtist = () => {
        if (this.state.artistQuery.toString().trim() == "") {
            alert("Field Empty");
        }
        else {
            this.setState({ loading: true })
            // console.log(this.state.artistQuery);
            //   console.log("Artist URL:",`${API_ARTIST}/artist/${this.state.artistQuery.replace(/\s/g,'')}`);
            fetch(`${API_ARTIST}/artist/${this.state.artistQuery}`)
                .then(resopnse => resopnse.json())
                .then(json => {
                    //  console.log("json", json.artists);
                    if (json.artists.total > 0) {
                        this.setState({ artistDetails: json.artists.items[0] });
                        //  console.log("Artist Details", this.state.artistDetails)
                        //  console.log("Artist Name:", this.state.artistDetails.name)
                    }
                    this.fetchTracks();
                })
                .catch(error => {
                    this.setState({ loading: false })
                    alert(error.message)
                })
        }
    }

    fetchTracks = () => {
        //console.log("fetchting tracks..");
        //console.log("Album URL:",`${API_TRACKS}/${this.state.artistDetails.id}/top-tracks`);
        fetch(`${API_TRACKS}/${this.state.artistDetails.id}/top-tracks`)
            .then(response => response.json())
            .then(json => {
                //     console.log("Artist Tracks: ", json.tracks);
                this.setState({ tracksList: json.tracks,loading: false })
                //     console.log("Top Song:", this.state.tracksList[0].name);
            })
            .catch(error => {
                this.setState({ loading: false })
                alert(error.message)
            })
    }

    onKeyDown = event => {
        if (event.key == "Enter") {
            this.searchArtist();
        }
    }

    render() {
        //console.log("Artist Name:",this.state.artistDetails.name,". Top Track:",this.state.tracksList[0]);
        // console.log("State:", this.state);
        return (
            <div>
                <div className="intro">
                    <div className="intro__head">
                        <h1><i className="fas fa-headphones"></i> Music<span>Guru</span></h1>
                        <p>powered by <i className="fab fa-spotify"></i> <span>Spotify</span></p>
                    </div>
                    <div className="intro__search">
                        <input spellCheck="false" placeholder="Search Artist by name" onKeyDown={this.onKeyDown} onChange={this.updateArtistQuery}></input>
                        <button onClick={this.searchArtist}><i className="fas fa-search"></i></button>
                    </div>
                </div>
                {this.state.loading ? <Spinner /> : (<>
                    <Artist artist={this.state.artistDetails} />
                    <Tracks tracklist={this.state.tracksList} />
                </>)}

            </div>
        )
    }
}

export default App;