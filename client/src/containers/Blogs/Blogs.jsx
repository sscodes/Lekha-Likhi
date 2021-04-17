import React, { useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Blog from '../../components/Blog/Blog';
import Header from '../../components/Header/Header';
import 'bootstrap/dist/css/bootstrap.css';
import './Blogs.css';
import { useDispatch, useSelector } from 'react-redux';
import { readBlogs } from '../../actions';

const Blogs = () => {
    const blog = useSelector(state => state.blog);
    blog.posted = false;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(readBlogs());
    }, []);

    const fixed = "top";
    const navbarpos = "navbarBorderBottom";
    let role = null;
    if (window.localStorage.getItem('user'))
        role = JSON.parse(window.localStorage.getItem('user')).role;


    const blogs = JSON.parse(localStorage.getItem('blogs'));

    const renderCreateBlog = () => {
        return (
            <>
                <Container>
                    <Row>
                        <Col className="text-center">
                            <NavLink to={"/createblog"}>
                                <Button className="newBlogBtn text-center">Create a new Blog.</Button>
                            </NavLink>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    };


    return (
        <>
            <Header fixed={fixed} navbarpos={navbarpos} />
            {role === "admin" ? renderCreateBlog() : null}
            {blogs != null && blogs.length > 0 ? blogs.map((blog) => 
            (
                <div key={blog._id} >
                    <Blog id={blog._id} heading={blog.heading} author={blog.author} date={blog.date} content={blog.content} likes={blog.likes.length}/>
                    <Container>
                        <hr />
                    </Container>
                </div>
            )) : null}
        </>
    );
}

export default Blogs;