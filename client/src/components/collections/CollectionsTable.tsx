import React from 'react'
import {Link} from "react-router-dom"
import {ICollectionTable} from "../../interfaces/common";

export const CollectionsTable: React.FC<ICollectionTable> = ({collections}) => {


    return (
        <table className="table mt-4">
            <tbody>
            {collections.map((collection) => (
                <tr key={collection._id}>
                    <th>
                        <Link to={`/collection/detail/${collection._id}`}>
                            {collection.name}
                        </Link>
                    </th>
                    <th><button className="btn btn-primary">Add item</button></th>
                    <th><button className="btn btn-secondary">Update item</button></th>
                    <th><button className="btn btn-danger">Delete item</button></th>
                </tr>
            ))}
            </tbody>
        </table>
    )
}