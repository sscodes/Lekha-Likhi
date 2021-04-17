import { Form, Container, Button, Row, Col } from "react-bootstrap";
import Input from "../../components/Forms/SignInput";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../../actions/blogActions";
import 'bootstrap/dist/css/bootstrap.css';
import './CreateBlog'

const CreateBlog = () => {
    const [heading, setHeading] = useState('');
    const [author, setAuthor] = useState('');
    const [date, setDate] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const blog = useSelector(state => state.blog);
    const dispatch = useDispatch();

    const postBlog = (e) => {
        e.preventDefault();
        const blog = {
            heading, author, date, content
        }

        dispatch(createBlog(blog));
    }

    if (blog.posted) {
        return <Redirect to={`/blogs`} />
    }

    const fixed = "top";
    const navbarpos = "navbarBorderBottom";

    return (
        <div>
            <Header fixed={fixed} navbarpos={navbarpos} />
            <Container fluid>
                <Row style={{ marginTop: "50px" }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h1 className="createBlogHeading text-center">Create a Blog!</h1>
                        <Form onSubmit={postBlog} className="mainContent">
                            <Input
                                label="Heading:"
                                placeholder="Enter Heading"
                                value={heading}
                                type="text"
                                onChange={(e) => setHeading(e.target.value)}
                            />

                            <Input
                                label="Author:"
                                placeholder="Enter Author"
                                value={author}
                                type="text"
                                onChange={(e) => setAuthor(e.target.value)}
                            />

                            <Input
                                label="Date:"
                                placeholder="Enter Date"
                                value={date}
                                type="text"
                                onChange={(e) => setDate(e.target.value)}
                            />

                            <Input
                                as="textarea"
                                rows="7"
                                label="Content:"
                                placeholder="Enter Content"
                                value={content}
                                type="text"
                                onChange={(e) => setContent(e.target.value)}
                            />

                            <Button type="submit" className="btn">
                                Post!
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default CreateBlog;