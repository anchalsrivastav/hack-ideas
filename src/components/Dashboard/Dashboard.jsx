import { useLocation, useHistory } from "react-router";
import React, {useEffect, useState} from "react";
import { Tag, Row, Button, Select } from "antd";
import { HACKIDEAS, SORT_OPTIONS } from "../../constants";
import {
    addButton, cardBlock, column1, column2, content,
    dropDown,
    header,
    ideaBlock,
    row,
    title,
    upvoteButtonAndCount,
    upvoteCount
} from "./Dashboard.styles";
const {Option} = Select

const Dashboard = () => {
    const [hackList, setHackList] = useState([]);
    const history = useHistory();
    const location = useLocation();
    const userId = localStorage.getItem("userId")

    useEffect(()=>{
        let hackIdea = localStorage.getItem("hackIdea");
        if (location.state?.hackList) {
            setHackList(location.state?.hackList.length ? location.state?.hackList : [...HACKIDEAS]);
        }
        else if(hackIdea){
            hackIdea = JSON.parse(hackIdea);
            setHackList(hackIdea.length ? hackIdea : [...HACKIDEAS]);
        }
        else{
            setHackList([...HACKIDEAS])
        }
        return () => {
            localStorage.setItem("hackIdea", JSON.stringify(hackList));
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        localStorage.setItem("hackIdea", JSON.stringify(hackList));
    }, [hackList]);

    const addNewHackIdea = () => {
        history.push({
            pathname: '/add',
            state: {hackList: hackList}
        })
    }

    const handleLogout = () => {
        history.push({
            pathname: '/',
            state: {hackList: hackList}
        })
    }
    
    const handleSortChange = (e) => {
        const [sortBy, sortOrder] = e.split("-")
        const hackListSortFn = (h1, h2) => {
            let a = h1[sortBy]
            let b = h2[sortBy]
            if(sortBy === "creationDate"){
                a = Date.parse(a)
                b = Date.parse(b)
            }
            return sortOrder === "asc" ? a-b : b-a
        }
        
        let hackListClone = [...hackList];
        hackListClone = hackListClone.sort(hackListSortFn)
        setHackList([...hackListClone])
    }

    const Title = ({hack}) => {
        const handleUpvote = () => {
            const newList = [...hackList]
            newList.forEach(item => {
                if(item.id === hack.id){
                    item.upvotes += 1
                }
            })
            setHackList([...newList])
        }

        return (
            <div style={title}>
                <b>{String(hack.title).toUpperCase()}</b>
                <div style={upvoteButtonAndCount}>
                    <img alt="thumbsup" src="/thumbsup.png" onClick={handleUpvote} height="100%" width="100%" />
                    <div style={upvoteCount}>({hack.upvotes})</div>
                </div>
            </div>
        )
    }

    if (userId) {
        return (
            <>
                <div style={header}>
                    <h1>HackIdeas</h1>
                    <Button onClick={handleLogout}>Logout</Button>
                </div>
                <div style={content}>
                    <Row justify="end" align="center" style={row}>
                        <h3>Sort By </h3>
                        <Select style={dropDown} onChange={handleSortChange}>
                            {Object.entries(SORT_OPTIONS).map(sortOption => <Option key={sortOption[0]} value={sortOption[0]}>{sortOption[1]}</Option>)}
                        </Select>
                    </Row>
                    <div style={addButton}><Button onClick={addNewHackIdea}> + Add HackIdea</Button></div>
                    {hackList.map((hack) => {
                        return (
                            <div style={ideaBlock} key={hack.id}>
                                <Title hack={hack}/>
                                <div style={cardBlock}>
                                    <div style={column1}><h3> Description : </h3></div>
                                    <div style={column2}><h3> {hack.description} </h3></div>
                                </div>
                                <div style={cardBlock}>
                                    <div style={column1}><h3>Tags : </h3></div>
                                    <div style={column2}>{hack.tags.map((tag) => (
                                        <Tag key={tag}>{tag}</Tag>
                                    ))}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </>
        )
    }
    return (<h2>User not logged In!</h2>)
}

export default Dashboard;
