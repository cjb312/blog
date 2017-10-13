import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';
import { Container } from "reactstrap";

class PostsShow extends Component {
	componentDidMount() {
		const { id } = this.props.match.params; //react-router params -> obj conatins all wilcard values that exists inside that given url. in this case its just id
		this.props.fetchPost(id);
	}

	onDeleteclick() {
		const { id } = this.props.match.params;
		this.props.deletePost(id, () =>{
			this.props.history.push('/'); //back to post index after deleteion of a post
		});
	}

	render() {
		const { post } = this.props;

		if (!post) {
			return <div>Loading...</div>;
		}

		return (
		 <Container className="single-post-container" fluid={true}>
			 <p className="post-titles title-header"> Title: </p>
			 <h3 className="post-header">{post.title}</h3>

			 <h6 className="post-category"> <span className="post-titles"> Category: </span> {post.categories}</h6>

			 <Container className="post-info-container">
			 	<p className="post-content">{post.content}</p>
			 </Container>

			 <Container className="button-container">
				<Link className="pull-xs-left" to="/" className="btn btn-primary back-button">Back To Index</Link>
				<button className="btn delete-button pull-xs-right" onClick={this.onDeleteclick.bind(this)}>
				 Delete Post
				</button>
			 </Container>
			 <div className="push"></div>
		 </Container>
		);
	}
}

function mapStateToProps({ posts }, ownProps) { //ownProps -> props object that is going to render. this.props === ownProps
	return { post: posts[ownProps.match.params.id] }; //mapping the single post
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);


// in bigger apps you would have mapStateToProps in its own file so this component is just for displaying
