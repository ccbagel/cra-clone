import React from 'react';

function App() {
    const handleNPM = () => {
        return window.open("https://www.google.com")
    }
    const handleGH = () => {
        window.open("www.amazon.com")
    }

    return (
        <div>
            <div>
                <h1 className="heading">Create-React-App clone</h1>
                <p className="paragraph">Created b y Hasan Ahmed</p>
                <p className="paragraph">Download my package on NPM to try it out, or simply check out the code on Github</p>
            </div>
            <div className="btn-div">
                <button className="npm-btn" onClick={handleNPM}>NPM</button>
                <button className="github-btn" onClick={handleGH}>Github</button>
            </div>
        </div>
    )
}

export default App;
