import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {
	renderField(field) { //field contains event handler that makes sure <Field /> is repsonsible for this input
		return (
			<div className="form-group">
			 <label> {field.label} </label>
			 <input
			 	className="form-control"
			 	type="text"
			 	{...field.input}
			 />
			 {field.meta.error}
			</div>
		);
	}

	onSubmit(values) {
		console.log(values);
	}

	render() {
		const { handleSubmit } = this.props; //handleSubmit being passed to component on behalf of redux-form

		return ( 
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
			 <Field
			 	label="Post Title"
				name="title"
				component={this.renderField}
			 />
			 <Field
			 	label="Categories"
			 	name="categories"
			 	component={this.renderField}
			 />
			 <Field
			 	label="Post Content"
			 	name="content"
			 	component={this.renderField}
			 />
			 <button type="submit" className="btn btn-primary"> Submit </button>
			</form>
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
})(PostsNew);




//values.title -> name="title" -> field.meta.error