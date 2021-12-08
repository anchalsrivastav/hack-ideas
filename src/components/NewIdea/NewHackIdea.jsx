import React, { useRef, useState } from 'react'
import { Button, Form, Input, Select } from "antd";
import { useLocation } from 'react-router';
import { useEffect } from 'react/cjs/react.development';
import { NavLink } from 'react-router-dom';
import {formButton, formWrapper} from "./NewHackIdea.styles";
import {tags} from "../../constants";

const {Option} = Select;

const NewHackIdea = () => {
    const location = useLocation();
    const [hackListItems, setHackListItems] = useState([]);
    const formRef = useRef("");
    const errorMessages = [ {required: true, message: 'Please enter valid input'} ]
    const children = Object.entries(tags).map(([tagid, tagname], idx) => <Option key={tagid}>{tagname}</Option>);

    useEffect(() => {
        const hackList = location.state?.hackList ? location.state?.hackList : [];
        localStorage.setItem("hackIdea", JSON.stringify(hackList));
        setHackListItems([...hackList]);
    }, [location.state?.hackList]);

    const onSubmit = (values) => {
        const newHackIdeaList = [...hackListItems, {
            id: hackListItems.length + 1,
            creationDate: new Date(),
            title: values["title"],
            description: values["description"],
            tags: values["tags"],
            upvotes: 0,
        }]
        setHackListItems(newHackIdeaList);
        formRef.current?.resetFields();
        localStorage.setItem("hackIdea", JSON.stringify(newHackIdeaList));
    };

    return (
        <div style={formWrapper}>
            <Form ref={formRef} onFinish={onSubmit}>
                <h1>Add New Hack Item</h1>
                <Form.Item name="title" label="Title" rules={errorMessages}>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description" rules={errorMessages}>
                    <Input />
                </Form.Item>
                <Form.Item name="tags" label="Tags" rules={errorMessages}>
                    <Select
                        mode="tags"
                        placeholder="Please select Tags"
                        value={[]}
                        style={tags}
                    >
                        {children}
                    </Select>
                </Form.Item>
                <div>
                    <Button style={formButton} type="primary" htmlType="submit">Add HackIDEA</Button>
                    <Button style={formButton} type="default" htmlType="reset">Reset</Button>
                    <Button style={formButton}><NavLink to={'/dashboard'}>Go To Dashboard</NavLink></Button>
                </div>
            </Form>
        </div>
    )
}

export default NewHackIdea
