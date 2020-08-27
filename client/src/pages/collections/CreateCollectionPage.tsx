import React, {useState, useEffect, useCallback} from 'react'
import {CreateCollectionForm} from "../../components/collections/CreateCollectionForm"
import {useHttp} from "../../hooks/http.hook"

interface ITopic {
    id: string,
    name: string
}

export const CreateCollectionPage: React.FC = () => {
    const [topics, setTopics] = useState<ITopic[]>([])
    const {request, loading} = useHttp()

    const fetchTopics = useCallback(async () => {
        try {
            const fetched = await request('/api/topics/show', 'GET')
            setTopics(fetched.topics)
        } catch(e) {}
    }, [request])

    useEffect(() => {
        fetchTopics()
    }, [fetchTopics])

    if(loading) {
        return <h1>Loading</h1>
    }
    return (
        <CreateCollectionForm topics={topics} />
    )
}

