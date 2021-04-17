import { Col, Container, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import './Blog.css';
import { FaHeart, FaPenNib, FaRegCalendarAlt, FaRegHeart, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteBlogAction, likeBlog, unlikeBlog } from "../../actions/blogActions";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useEffect, useRef, useState } from "react";

const Blog = (props) => {
    const [like, setLike] = useState(false);
    let role = null;
    let userId = null;
    const id = props.id;
    if (window.localStorage.getItem('user')) {
        role = JSON.parse(window.localStorage.getItem('user')).role;
        userId = JSON.parse(window.localStorage.getItem('user'))._id;
    }

    useEffect(() => {
        let parsedLike = null;
        const blogs = JSON.parse(localStorage.getItem('blogs'));
        for (const blog of blogs) {
            if (blog.likes.length === 0) {
                parsedLike = false;
                setLike(parsedLike);
            }
            else if (blog._id === id) {
                let check = 0;
                for (const likedById of blog.likes) {
                    if (likedById === userId) {
                        parsedLike = true;
                        check = 1;
                        setLike(parsedLike);
                        break;
                    }
                }
                if (check === 0) {
                    parsedLike = false;
                    setLike(parsedLike);
                }
            }
        }
    }, []);

    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            localStorage.setItem("like", like);
        }
    }, [like]);


    const dispatch = useDispatch();

    const deleteBlog = (e) => {
        e.preventDefault();
        const delConfirm = window.confirm("Are you sure that you want to delete it?");
        if (delConfirm) {
            const id = props.id;
            dispatch(deleteBlogAction(id));
        }
    }

    const likeUnlikeBlog = (e) => {
        // e.preventDefault();
        if (like === false) {
            dispatch(likeBlog(id, userId));
        }
        else {
            dispatch(unlikeBlog(id, userId));
        }
    }

    const renderDeleteButton = () => {
        return (
            <>
                <Col className="att text-right blogbtn">
                    <FaTrash className="pr-1" onClick={deleteBlog} />
                </Col>
            </>
        )
    };

    return (
        <>
            <Container>
                <Row>
                    <Col className="text-center pt-5">
                        <h1 className="heading text-center">{props.heading}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} className="pt-5 att">
                        <FaPenNib className="pr-1" />
                        <span>{props.author}</span>
                    </Col>
                    <Col md={6} className="pt-5 text-md-right att">
                        <FaRegCalendarAlt className="pr-1" />
                        <span>{props.date}</span>
                    </Col>
                </Row>
                <Row>
                    <Col className="pt-4">
                        {props.content.split("\n").map(text => <p className="text1">{text}</p>)}
                        
                    </Col>
                </Row>
                <Row>
                    <Col className="att">
                        <FormControlLabel
                            control={<Checkbox icon={<FaRegHeart style={{ color: "#5e35b1" }} />}
                                checkedIcon={<FaHeart style={{ color: "#5e35b1" }} />}
                                name="checkedH" checked={like}
                                onChange={(e) => {
                                    setLike(e.target.checked);
                                }} />}
                            onClick={likeUnlikeBlog}
                        />
                        <span>{props.likes}</span>
                    </Col>
                    {role === "admin" ? renderDeleteButton() : null}
                </Row>
            </Container>
        </>
    );
}

export default Blog;