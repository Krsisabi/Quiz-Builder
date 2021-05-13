import React, { Component } from 'react'
import classes from './QuizList.module.scss'
import { NavLink } from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
import axios from 'axios'

export default class QuizList extends Component {

	state = {
		quizzes: [],
		loading: true
	}

	renderQuizzes() {
		return this.state.quizzes.map(quiz => {
			return (
				<li
					key={quiz.id}
				>
					<NavLink to={`/quiz/${quiz.id}`}>
						{quiz.name}
					</NavLink>
				</li>
			)
		})
	}

	async componentDidMount() {
		try {
			const response = await axios.get('https://quiz-builder-4ddde-default-rtdb.europe-west1.firebasedatabase.app/quizzes.json')

			const quizzes = []

			Object.keys(response.data).forEach((key, index) => {
				quizzes.push({
					id: key,
					name: `Test №${index + 1}`
				})
			})

			this.setState({
				quizzes, loading: false
			})
		} catch (e) {
			console.log(e)
		}
	}

	render() {
		return (
			<div className={classes.QuizList}>
				<div>
					<h1>Quiz List</h1>
					{
						this.state.loading
							? <Loader />
							: <ul>
									{this.renderQuizzes()}
								</ul>
					}

				</div>
			</div>
		)
	}
}