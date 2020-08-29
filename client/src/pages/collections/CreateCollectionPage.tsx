import React, {useState, useEffect, useCallback, useContext} from 'react'
import {CreateCollectionForm} from "../../components/collections/CreateCollectionForm"
import {useHttp} from "../../hooks/http.hook"
import { AuthContext } from '../../context/AuthContext'
import {ICreateCollectionValues, ITopic} from "../../interfaces/common"
import {Loader} from "../../components/common/Loader"
import axios from 'axios'

export const CreateCollectionPage: React.FC = () => {
    const [topics, setTopics] = useState<ITopic[]>([])
    const {request, loading} = useHttp()
    const auth = useContext(AuthContext)

    const fetchTopics = useCallback(async () => {
        try {
            const fetched = await request('/api/topics/show', 'GET')
            setTopics(fetched.topics)
        } catch(e) {}
    }, [request])

    useEffect(() => {
        fetchTopics()
    }, [fetchTopics])

    const handleCreateCollection = async (values: ICreateCollectionValues) => {
        let imageUrl = await uploadFileToGoogleStorage(values.file)
        values['imageUrl'] = imageUrl
        delete values['file']

        await request('/api/collections/create', 'POST', values, {
            Authorization: `Bearer ${auth.token}`
        })
    }

    if(loading) {
        return <Loader />
    }

    return (
        <CreateCollectionForm topics={topics} handleCreateCollection={handleCreateCollection} />
    )
}

async function uploadFileToGoogleStorage(file: Blob | string | undefined) {
    if(!file) {
        return ''
    }

    const formData = new FormData()
    formData.append('file', file)

    try {
        const response = await axios.post('/api/googlecloud/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    } catch(err) {
        if(err.response.status === 500) {
            console.log('There was a problem with a server.')
        } else {
            console.log(err.response.data.message)
        }
    }
}