import { useState, useEffect } from "react";
import React from 'react';
import StoriesList from "../components/StoriesList";
import StoryFilter from "../components/StoryFilter";
import DisplayFilter from "../components/DisplayFilter";

const MainContainer = () => {

    const [stories, setStories] = useState([])
    const [ids, setIds] = useState([])
    const [filter, setFilter] = useState(null)

    useEffect(() => {
        getId()
        // getStories()
    },[])

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
        const slicedIds = newIds.slice(0, 20)
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
    }

    return (
        <>
        <StoryFilter stories={stories} onFilterChange={onFilterChange}/>
        {filter ? <DisplayFilter filter={filter} stories={stories}/> : null}
        {stories ? <StoriesList stories={stories}/> : null}
        </>
    )
}

export default MainContainer