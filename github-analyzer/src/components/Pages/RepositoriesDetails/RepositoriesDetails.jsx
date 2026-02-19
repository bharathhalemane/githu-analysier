//repoDetailsApi = `https://api.github.com/repos/${username}/${repoName}`
//contributorsDetailsApi = https://api.github.com/repos/${username}/${repoName}/contributors
//languagesApi = https://api.github.com/repos/${username}/${repoName}/languages

import './RepositoriesDetails.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react"

const apiProgress = {
    success: "SUCCESS",
    failure: "FAILURE",
    loading: "LOADING"
}

const RepositoriesDetails = ({ username }) => {
    const { repoName } = useParams()
    const [repoData, setRepoData] = useState()
    const [contributors, setContributors] = useState()
    const [languages, setLanguages] = useState()
    const [progress, setProgress] = useState(apiProgress.loading)

    const formattedData = data => {
        return {
            description: data.description,
            forksCount: data.forks_count,
            htmlUrl: data.html_url,
            id: data.id,
            name: data.name,
            stargazersCount: data.stargazers_count,
            topics: data.topics,
            watchersCount: data.watchers_count,
        }
    }

    const getRepoData = async () => {
        try {
            setProgress(apiProgress.loading)
            const url = `https://api.github.com/repos/${username}/${repoName}`
            const option = {
                method: "GET"
            }
            const response = await fetch(url, option)
            if (response.status === 200) {
                const data = await response.json()
                const formattedRepoData = formattedData(data)
                setRepoData(formattedRepoData)                
            } else {
                setProgress(apiProgress.failure)
            }
            
        } catch (err) {
            setProgress(apiProgress.failure)
        }
    }

    const formattedContributorsData = data => {
        return {                
            avatarUrl: data.avatar_url,
            contributions: data.contributions
        }
    }

    const getContributors = async () => {
        
        try {
            const url = `https://api.github.com/repos/${username}/${repoName}/contributors`
            const option = {
                method: "GET"
            }
            const response = await fetch(url, option)
            if (response.status === 200) {
                const data = await response.json()       
                const formattedData = data.map(each => formattedContributorsData(each))
                setContributors(formattedData)
            }else{
                setProgress(apiProgress.failure)
            }            
        } catch (err) {
            setProgress(apiProgress.failure)
        }
    }

    const getLanguages = async () => {
        try {
            const url = `https://api.github.com/repos/${username}/${repoName}/languages`
            const option = {
                method: "GET"                
            }
            const response = await fetch(url, option)
            if (response.status === 200) {
                const data = await response.json()
                setLanguages(data)
            } else {
                setProgress(apiProgress.failure)
            }
        } catch (err) {
            setProgress(apiProgress.failure)
        }
    }
    useEffect(() => {
        setProgress(apiProgress.loading)
        getRepoData()
        getContributors()
        getLanguages()
    },[])

    return (
        <div>
            <h1>{repoName}</h1>
        </div>
    )
}

export default RepositoriesDetails