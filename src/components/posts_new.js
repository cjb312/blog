import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';
import { Container } from "reactstrap";

class PostsNew extends Component {
	renderField(field) { //field contains event handler that makes sure <Field /> is repsonsible for this input

		//destructuring by accessing properites with nested for cleaner code with es6
		const { meta: {touched, error} } = field;
		const className = `form-group ${touched && error ? "has-danger" : ''}`;

		return (
			<div className={className}>
			 <label> {field.label} </label>
			 <input
			 	className="form-control"
			 	type="text"
			 	{...field.input}
			 />
			<div className="text-help">
			 {touched ? error: ''}
			</div>
			</div>
			//if the user touches a field and navigates to another but the previous field doesn't meet the validate functions paramaters
			//the error message will then display
		);
	}

	onSubmit(values) {
		this.props.createPost(values, () => {
			this.props.history.push('/');  //take user back to index once a post has been created
		});
	}

	render() {
		const { handleSubmit } = this.props; //handleSubmit being passed to component on behalf of redux-form

		return (
			<Container className="post-submit-container">
				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				 <Field className="field" label="Post Title" name="title" component={this.renderField} />
				 <Field className="field" label="Categories" name="categories" component={this.renderField} />
				 <Field className="field" label="Post Content" name="content" component={this.renderField} />
				 <Container className="submit-button-container" fluid={true}>
					 <button className="" type="submit" className="btn submit-button text-xs-left"> Submit </button>
					 <Link to="/" className="btn delete-button text-xs-right">Cancel</Link>
				 </Container>
				</form>
				<div className="push"></div>
			</Container>
		);
	}
}

function validate(values) { //values is an object that contains all info user has entered for each property

	//console.log(values);  -> { title; "asdf", categories: "afdad", content: "adfad"}
	const errors = {};

	//Validate the inputs from 'values'
	if (!values.title || values.title.length < 2) {
		errors.title = "Enter a title that is at least 2 characters!";
	}

	if (!values.categories || values.categories.lenght < 2) {
		errors.categories = "Enter some categories that are at leat 2 characters";
	}

	if (!values.content) {
		errors.content = "Please enter content";
	}

	//If errors is empty, the form is fine to submit
	//If errors has any properties, redux form assumes form is invalid
	return errors
}

export default reduxForm({
	validate,
	form: 'PostsNewForm'
})(
	connect(null, { createPost })(PostsNew)
);




//values.title -> name="title" -> field.meta.error
