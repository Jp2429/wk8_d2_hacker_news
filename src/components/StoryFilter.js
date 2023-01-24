import React, {useState}  from 'react';


const StoryFilter = ({stories, onFilterChange}) => {

        const [text, setText] = useState([]
            )
        const handleChange = (evt) => {
            const input = evt.target.value
            setText(input)
        }

        const handleSubmit = (evt) => {
            evt.preventDefault()
            const textToSubmit = text.trim()
            if (! textToSubmit) {
                return
            }
            onFilterChange(textToSubmit)
            setText("")
        }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Story type" value={text} onChange={handleChange}></input>
            <input type="submit" value="post"></input>
        </form>
    )
}

export default StoryFilter