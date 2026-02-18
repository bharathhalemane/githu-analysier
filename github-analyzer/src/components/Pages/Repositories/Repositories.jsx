//url:- https://api.github.com/users/bharathhalemane/repos
import Header from '../../utils/Header/Header'
import Cookies from "js-cookie"
import { useState, useEffect } from "react"
import { Octokit } from "@octokit/rest"
import RepoCard from '../../utils/RepoCard/RepoCard'
import './Repositories.css'


const Repositories = () => {
    const [reposData, setReposData] = useState([])    
    const username = Cookies.get("username")
    const octokit = new Octokit()   

    const formattedData = data => {
        return {
            id: data.id,
            forksCount: data.forks_count,
            name: data.name,
            htmlUrl: data.html_url,
            stargazersCount: data.stargazers_count,
            topics: data.topics,
            watchersCount: data.watchers_count,  
            description: data.description
        }
    }

    const getReposData = async () => {
        try {            
            const response = await octokit.request('GET /users/{username}/repos', {
                username: username
            })            
            if (response.status === 200) {          
                console.log(response.data)
                const data = response.data.map(each => formattedData(each))
                setReposData(data)
                console.log(data)
            }else{
                console.log("error")
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getReposData()
    },[])


    return (
        <div>
            <Header activeId="repositories" />
            <ul className='repos-list-container'>
                {
                    reposData.map(repo => (
                        <li key={repo.id}>
                            <RepoCard data={repo}/>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Repositories