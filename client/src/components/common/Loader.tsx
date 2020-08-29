import React from 'react'
import LoaderIndicator from 'react-loader-spinner'

export const Loader = () => {
    return (
        <div
            style={{
                width: "100%",
                height: "100",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <LoaderIndicator type="ThreeDots" color="#2BAD60" height={100} width={100} />
        </div>
    )
}