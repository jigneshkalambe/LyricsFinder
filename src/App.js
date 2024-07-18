import axios from "axios";
import React, { useState } from "react";
import "./App.css";

const App = () => {
    const [apiData, setApiData] = useState();
    const [lyrics, setLyrics] = useState("");
    const [loading, setLoading] = useState(false);
    const [btnText, setBtnText] = useState("Copy Lyrics ?");

    const getData = async (e) => {
        const value = e.target.value;
        if (value !== "") {
            await axios
                .get(`https://api.lyrics.ovh/suggest/${value}`)
                .then((res) => {
                    setApiData(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setApiData();
        }
    };

    const lyricsHandler = async (artist, title) => {
        setLyrics("");
        setLoading(true);
        await axios
            .get(`https://api.lyrics.ovh/v1/${artist}/${title}`)
            .then((res) => {
                if (res.data.lyrics) {
                    setLyrics(res.data.lyrics);
                } else {
                    setLyrics("Lyrics not found");
                }
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLyrics("Lyrics not found");
                setLoading(false);
            });
    };

    const copyTextHandler = () => {
        if (btnText === "Copy Lyrics ?") {
            setBtnText("Copied !");
            navigator.clipboard.writeText(lyrics);
            setTimeout(() => {
                setBtnText("Copy Lyrics ?");
            }, 1000);
        }
    };

    return (
        <div className="wrapper">
            <div className="d-flex justify-content-center">
                <h1 className="m-0">Find lyrics</h1>
            </div>
            <div className="input_div">
                <input
                    type="text"
                    autoComplete="off"
                    placeholder="Enter Song Name or Enter Artist Name"
                    className="input form-control"
                    onChange={getData}
                    name="value"
                ></input>
            </div>
            <div className="d-flex flex-column gap-2 mt-3">
                {/* Collapse */}
                {/* {apiData?.map((val, ind) => {
                    return (
                        <div key={ind}>
                            <div className="d-flex justify-content-center">
                                <button
                                    onClick={() => lyricsHandler(val.artist.name, val.album.title)}
                                    className="button-30"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#${ind}`}
                                >
                                    {val.album.title} by {val.artist.name}
                                </button>
                            </div>
                            <div className="collapse" id={`${ind}`}>
                                <div className="lyricsBox">
                                    <pre style={{ whiteSpace: "pre-wrap", color: "black" }}>{loading ? "Lyrics are about to loading" : lyrics}</pre>
                                </div>
                            </div>
                        </div>
                    );
                })} */}
                {/* Collapse */}
                {/* Accordion */}
                {/* <div className="accordion d-flex gap-2 flex-column" id={`maincollapse`}>
                    {apiData?.map((val, ind) => {
                        return (
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button
                                        className="button-30"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#collapse${ind}`}
                                        onClick={() => lyricsHandler(val.artist.name, val.album.title)}
                                    >
                                        {val.album.title} by {val.artist.name}
                                    </button>
                                </h2>
                                <div id={`collapse${ind}`} className="accordion-collapse collapse " data-bs-parent={`#maincollapse`}>
                                    <div className="lyricsBox">
                                        <pre style={{ whiteSpace: "pre-wrap", color: "black" }}>
                                            {loading ? "Lyrics are about to loading" : lyrics}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div> */}
                {/* Accordion */}
                {/* Modal */}
                {apiData?.map((val, ind) => {
                    return (
                        <div key={ind}>
                            <button
                                onClick={() => lyricsHandler(val.artist.name, val.album.title)}
                                className="button-30"
                                data-bs-toggle="modal"
                                data-bs-target={`#${ind}`}
                            >
                                {val.album.title} by {val.artist.name}
                            </button>
                            <div className="modal fade" id={`${ind}`}>
                                <div className="modal-dialog modal-dialog-scrollable modal-lg">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5">Lyrics</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="lyricsBox">
                                                <pre style={{ whiteSpace: "pre-wrap", color: "black" }}>
                                                    {loading ? "Lyrics are about to loading" : lyrics}
                                                </pre>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-dark d-block" data-bs-dismiss="modal">
                                                Close
                                            </button>
                                            <input className="btn btn-success d-block" type="button" onClick={copyTextHandler} value={btnText} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
                {/* Modal */}
            </div>
        </div>
    );
};

export default App;
