import React from "react";

const Artist = (props) => {
    if (!props.artist) return null;

    const { images, name, followers, genres } = props.artist;
    //  console.log("Followers", followers.total / 100000);

    var value = followers.total;

    if (value >= 1000000) {
        value = (value / 1000000).toFixed(2) + " M";
    } else if (value >= 1000) {
        value = (value / 1000).toFixed(2) + " K";
    }
    //console.log("Value",value);

    let Genres = "";
    Object.keys(genres).map((key) => {
        Genres = Genres + genres[key] + ", ";
    });
    // console.log({genres});
    //console.log({Genres});
    // {index > 0 && ","}{" "}

    return (
        <div className="artist">
            <div className="artist__image">
                <img
                    src={images[0] && images[0].url}
                    alt="artist profile"
                ></img>
            </div>
            <h2>{name}</h2>
            <h4>{value} Followers</h4>
            <p>
                Genre:{" "}
                {Object.keys(genres).map((key, index) => (
                    <>
                        {index > 0 && ","} {genres[key]}
                    </>
                ))}
            </p>
        </div>
    );
};

export default Artist;
