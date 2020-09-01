import React from 'react'
import {useParams} from 'react-router-dom'
import {ICollectionDetailParams} from "../../interfaces/common"

export const CollectionDetailPage: React.FC = () => {
    const collectionId = useParams<ICollectionDetailParams>().id
    console.log(collectionId)
    return (
        <div>
            <h1>Detail page</h1>
        </div>
    )
}