import Layout from './hoc/Layout/Layout'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import Quiz from './containers/Quiz/Quiz'
import QuizList from './containers/QuizList/QuizList'
import Auth from './containers/Auth/Auth'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import { connect } from 'react-redux'
import Logout from './components/Logout/Logout'

function App(props) {

	let routes = (
		<Switch>
			<Route path="/auth" component={Auth} />
			<Route path="/quiz/:id" component={Quiz} />
			<Route path="/" exact component={QuizList} />
			<Redirect to="/" />
		</Switch>
	)

	if (props.isAuthenticated) {
		routes = (
			<Switch>
				<Route path="/quiz-creator" component={QuizCreator} />
				<Route path="/quiz/:id" component={Quiz} />
				<Route path="/" exact component={QuizList} />
				<Route path="/logout" component={Logout} />
				<Redirect to="/" />
			</Switch>
		)
	}

	return (
		<Layout>
			{routes}
		</Layout>
	);
}

function mapStateToProps(state) {
	return {
		isAuthenticated: !!state.auth.token
	}
}

export default withRouter(connect(mapStateToProps)(App))