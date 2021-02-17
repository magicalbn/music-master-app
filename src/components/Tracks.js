import React, { Component } from 'react';


/*const Eachtrack = props => {
    const { album, name,preview_url } = props.track;
    console.log(preview_url);

    playAudio = () => {
        const audio = new Audio(preview_url);
        audio.play();
    }

    return (
        <div className="tracks__card" onClick={this.playAudio}>
            <img src={album.images[1].url}></img>
            <div className="tracks__details">
                
                <h5>{name}</h5>
            </div>
        </div>
    );
}*/

/*
class Eachtrack extends Component {
      state = { playing: false, currentAudio: null, previousSongURL: null }
  
      playAudio = () => {
          console.log(this.state.playing);
          console.log("state",this.state);
          
  
          if (!this.state.playing) {
              const audio = new Audio(this.props.track.preview_url);
              audio.play();
              this.setState({ playing: true, currentAudio: audio, previousSongURL: this.props.track.preview_url });
              
            
              
  
          }
          else {
              this.pauseAudio();
          }
      }
  
      pauseAudio = () => {
          this.state.currentAudio.pause();
          this.setState({ playing: false });
          if(this.state.previousSongURL != this.props.track.preview_url){
              console.log("trackChanged");
              this.playAudio();
          }
  
          
          console.log("pause", this.state.playing);
      }

    render() {

        const { album, name, preview_url } = this.props.track;
        // console.log(preview_url);




        return (
            <div className="tracks__card" onClick={this.playAudio}>
                <img src={album.images[1].url}></img>
                <div className="tracks__details">

                    <h5>{name}</h5>
                </div>
            </div>
        );
    }
}*/


class Tracks extends Component {
    
    componentWillUnmount() {
        if(this.state.currentAudio)
        this.pauseAudio(this.state.currentAudio)
    }

    state = { playing: false, currentAudio: null, previousSongURL: "" }

    playAudio = previewUrl => () => {
      //  console.log(this.state.playing);
      //  console.log("state", this.state);


        if (!this.state.playing) {
            const audio = new Audio(previewUrl);
            audio.play();
            this.setState({ playing: true, currentAudio: audio, previousSongURL: previewUrl });
        }
        else {
            this.pauseAudio(previewUrl);
        }
    }

    pauseAudio = previewUrl => {
        this.state.currentAudio.pause();
        this.setState({ playing: false });
        if (this.state.previousSongURL != previewUrl) {
          //  console.log("trackChanged");
            const audio = new Audio(previewUrl);
            audio.play();
            this.setState({ playing: true, currentAudio: audio, previousSongURL: previewUrl });
        }
        else {
            this.setState({ previewUrl: "" })
        }


       // console.log("pause", this.state.playing);
    }

    trackIcon = track => {
        if (track.preview_url == null) {
            return <span className="tracks__icon"><i className="fas fa-ban"></i></span>
        }
        else if (this.state.playing && this.state.previousSongURL == track.preview_url) {
             return <span className="tracks__icon"><i className="fas fa-pause"></i></span> 
            }
         return <span className="tracks__icon"><i className="fas fa-play"></i></span>
    }

    render() {

        if (this.props.tracklist.length == 0)
            return null;

        const TRACKS = this.props.tracklist;
        //console.log("Tracks", TRACKS);
        return (
            <div className="tracks">
                <div className="tracks__list">
                    {
                        TRACKS.map(TRACK => {
                            /* <Eachtrack key={TRACK.id} track={TRACK} />*/
                            const { album, name, preview_url } = TRACK;
                            
                            return (
                                <div key={TRACK.id} className="tracks__card" onClick={this.playAudio(preview_url)}>
                                    <img src={album.images[1].url}></img>
                                    <div className="tracks__details">

                                        <h5>{name}</h5>
                                        
                                    </div>
                                    {this.trackIcon(TRACK)}
                                </div>
                            )

                        }
                        )
                    }
                </div>
            </div>
        );
    }
}

export default Tracks;


