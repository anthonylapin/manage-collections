import React from 'react'

export const MainPage = () => {
    return (
        <div className="text-center">
            <h2>Manage your collections</h2>
            <div className="main-page-buttons">
                <button type="button" className="btn btn-primary btn-lg btn-block">Add new collection</button>
                <button type="button" className="btn btn-secondary btn-lg btn-block">Update collection</button>
                <button type="button" className="btn btn-info btn-lg btn-block">Show collections</button>
                <button type="button" className="btn btn-danger btn-lg btn-block">Delete collection</button>
            </div>
        </div>
    )
}