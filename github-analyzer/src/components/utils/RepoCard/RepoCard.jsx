import './RepoCard.css'

const RepoCard = ({data}) => {
    const {name, htmlUrl, description} = data
    return <div className='repoCard-container'>
        <h1 className="repo-name"><a href={htmlUrl} target='_blank'>{name}</a></h1>
        <p className='repo-description'>{description}</p>
    </div>
}

export default RepoCard