import React, { useEffect, useState } from "react";

export default function Main() {
    const [meme, setMeme] = React.useState({
        topText: "One does not simply",
        bottomText: "Walk into Mordor:",
        randomImage: "http://i.imgflip.com/1bij.jpg",
    });

    const [allMemes, setAllMemes] = useState([]);

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then((res) => res.json())
            .then((data) => setAllMemes(data.data.memes));
    }, []);

    function getMemeImage() {
        const getRandomNum = Math.floor(Math.random() * allMemes.length);
        const newImg = allMemes[getRandomNum].url;
        setMeme((prevMeme) => ({
            ...prevMeme,
            randomImage: newImg,
        }));
    }

    function handleChange(event) {
        const { value, name } = event.currentTarget;
        setMeme((prevMeme) => ({
            ...prevMeme,
            [name]: value,
        }));
    }

    return (
        <main>
            <div className="form">
                <label>
                    Top Text
                    <input type="text" placeholder="One does not simply" name="topText" value={meme.topText} onChange={handleChange} />
                </label>
                <label>
                    Bottom Text
                    <input type="text" placeholder="Walk into Mordor" name="bottomText" value={meme.bottomText} onChange={handleChange} />
                </label>
                <button type="button" className="btn btn-primary" onClick={getMemeImage}>
                    Generate new meme image
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    );
}
