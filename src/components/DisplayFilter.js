const DisplayFilter = ({filter, stories}) => {

        const results = stories.filter(story => filter === story.type) 
        const filteredStory = results.map ((story) => {
            return <li><b>{story.title} - {story.url}</b></li>
        })
    
    

    return (
        <ul>
            {filteredStory}
        </ul>
    )}

export default DisplayFilter