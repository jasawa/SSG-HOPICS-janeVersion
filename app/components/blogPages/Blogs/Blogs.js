import React, { Component } from "react";
import DeleteBtn from "../../../components/DeleteBtn";
import EditBtn from "../../../components/EditBtn";
import Jumbotron from "../../../components/Jumbotron";
import FontSizeP from "../../../components/FontSize/FontSizeP";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../../components/Grid";
import { List, ListItem } from "../../../components/List";
import { Input, TextArea, FormBtn } from "../../../components/Form";
import Nav from '../../children/Nav';
//import Detail from './Detail';

class Blogs extends Component {
  constructor(props) {
    super(props);

    this.state = {
    blogs: [],
    title: "",
    postedBy: "",
    content: ""
    };
  }
// class Blogs extends Component {
//   state = {
//     blogs: [],
//     title: "",
//     postedBy: "",
//     content: ""
//   };

  componentDidMount() {
    this.loadBlogs();
  }

  loadBlogs () {
    API.getBlogs()
      .then(res => {
        this.setState({ blogs: res.data, title: "", postedBy: "", content: "" })
      })
      .catch(err => console.log(err));
  };

  deleteBlog = id => {
    API.deleteBlog(id)
      .then(res => this.loadBlogs())
      .catch(err => console.log(err));
  };

  editBlog = (_id) => {
    // event.preventDefault();
    if (this.props.match.params.id) {
      // console.log("hi")
      API.editBlog({
        title: this.state.title,
        postedBy: this.state.postedBy,
        content: this.state.content
      })
        .then(res => this.loadBlogs())
        .catch(err => console.log(err));
    }
  };

  // ????????????????
  // ????????????????
  // editBlog = id => {
  //   API.editBlog(id)
  //     .then(res => this.loadBlogs())
  //     .catch(err => console.log(err));
  // };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.postedBy) {
      API.saveBlog({
        title: this.state.title,
        postedBy: this.state.postedBy,
        content: this.state.content
      })
        .then(res => this.loadBlogs())
        .catch(err => console.log(err));
    }
  };

  render() {


    return (
      <div>
        <Nav
          authenticated={this.props.authenticated}
          authenticate={this.props.authenticate}
          deAuthenticate={this.props.deAuthenticate}
          logout={this.props.logout}
        />  

      <Container fluid>
        <Row>
          <Col size="md-3 sm-0"></Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>General</h1>
              This is a forum for general work-based matters
            </Jumbotron>
            {this.state.blogs.length > 0 ? (
              <List>
                {console.log(this.state.blogs)}
                {this.state.blogs.map(blog => (
                  <ListItem key={blog._id}>
                    
                      <strong>
                        <FontSizeP>
                        {blog.title}
                        </FontSizeP>
                        <FontSizeP>
                        Posted by  {blog.postedBy} on {blog.date}
                        </FontSizeP>
                      </strong>
                       <FontSizeP>
                          {blog.content}
                      </FontSizeP>
                    //onc
                    <Link to={"/blog/" + blog._id}>
                    <EditBtn onClick={() => this.editBlog(blog._id)} />    
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBlog(blog._id)} />
                    {/* <EditBtn>
                      <Link to={"/blog" + blog._id}>
                      <strong>
                        {blog.title} by {blog.postedBy}
                      </strong>
                    </Link>
                    </EditBtn> */}
        
                    {/* <Link to={"/blog" + blog._id}>
                 
        
                    </Link> */}
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          {/*</Col>

          <Col size="md-6">*/}
            <Jumbotron>
              <h1>Add a Post to General</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.postedBy}
                onChange={this.handleInputChange}
                name="postedBy"
                placeholder="Posted by (required)"
              />
              <TextArea
                value={this.state.content}
                onChange={this.handleInputChange}
                name="content"
                placeholder="Content"
              />
              <FormBtn
                disabled={!(this.state.postedBy && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Submit a Post
              </FormBtn>
            </form>
          </Col>
          <Col size="md-3 sm-0"></Col>
        </Row>
      </Container>
      </div>
    );
  }
}

export default Blogs;
