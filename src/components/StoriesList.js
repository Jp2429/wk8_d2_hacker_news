const StoriesList = ({stories}) => {
    const storyNodes = stories.map((story) => {
        return <li key={story.id}>{story.title} - {story.url}</li>
    })

    return(
        <ul>
            {storyNodes}
        </ul>
    )
}

export default StoriesList