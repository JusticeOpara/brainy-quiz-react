import React from "react"
export default function () {
    return (
        <div className="start-game">
            <h1 className="heading">welcome to brainy quiz app</h1>
            {/* {errorMessage && <div className="error">{errorMessage}</div>} */}
            <a className="btn" onClick={fetchQuitData} disable={isLoading}>PLAY</a>
        </div>

    )
}