import { useState, useEffect } from "react";
import React from 'react';
import StoriesList from "../components/StoriesList";
import StoryFilter from "../components/StoryFilter";
import DisplayFilter from "../components/DisplayFilter";

const MainContainer = () => {

    const [stories, setStories] = useState([])
    const [filteredStories,setFilteredStories]=useState([])
    const [ids, setIds] = useState([])
    const [filter, setFilter] = useState(null)

    useEffect(() => {
        getId()
        // getStories()
    },[filteredStories])

    const getId = () => {
        fetch ("https://hacker-news.firebaseio.com/v0/topstories.json")
            .then(res => res.json())
            .then(dataIds => {
                // setIds(dataIds)
                getStories(dataIds)
            })
    }

    const getStories = (dataIds) => {
        const newIds = [...dataIds]
        const slicedIds = newIds.slice(0, 30)
        setIds(slicedIds)

        const idsPromises = slicedIds.map ((id) => {
            return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
                .then(res => res.json())
        })
        Promise.all(idsPromises)
            .then(stories => setStories(stories))
    }   
    console.log(stories)

    const onFilterChange = (text) => {
        setFilter(text)
        filterStories(text)
    }
    const filterStories=(text)=>{
        const results = stories.filter(story => story.title.includes(text)) 
        console.log(results,'this is the results')
        setStories(results)
    }
    const handleClick=()=>{
        const resetFilteredStories = []
        setFilteredStories(resetFilteredStories)
        console.log(filteredStories.length,'this is lengths')
        console.log(stories,'this is stories')
    }


    return (
        <>
        <StoryFilter stories={stories} onFilterChange={onFilterChange}/>
        <button onClick={handleClick}>Reset</button>
        {/* {filter ? <DisplayFilter filter={filter} stories={stories}/> : null} */}
        <StoriesList stories={!filteredStories.length ? stories:filteredStories}/>       
        </>
    )
}

export default MainContainer