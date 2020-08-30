import React, {useCallback, useContext, useEffect} from 'react'
import {useHttp} from '../../hooks/http.hook'
import {AuthContext} from "../../context/AuthContext"
import {CollectionsTable} from "../../components/collections/CollectionsTable"

export const ShowCollectionsPage: React.FC = () => {
    const {request} = useHttp()
    const auth = useContext(AuthContext)

    const fetchData = useCallback(async () => {
        try {
            const data = await request('/api/collections', 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            })
            console.log(data)
        } catch (e) {

        }
    }, [request, auth.token])

    useEffect(() => {
        fetchData()
    }, [fetchData])


    return (
        <div>
            <div className="text-center mb-2">
                <h5>Your collections list</h5>
                <CollectionsTable />
            </div>
        </div>
    )
}