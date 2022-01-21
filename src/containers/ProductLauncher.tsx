import * as React from 'react'
import { connect } from 'react-redux'

import { State as AuthenticateState } from '../reducers/authenticate'
import { RootState } from '../reducers/index'
import { State as ProductLauncherDataState } from '../reducers/productLauncher'
import { State as UserDataState } from '../reducers/userData'

import {
	fetchCategories,
	isValidated,
	populateCategoriesWithAnswers,
	setActiveCategory,
	setValidated,
	updateQuestionValue
} from '../actions/productLauncher'
import { checkUserSession, fetchUserData, fetchUserSession, resetUserData, saveUserData } from '../actions/userData'
import CategoriesProgress from '../components/CategoriesProgress'
import { CategoryProgressProps } from '../components/CategoryProgress'
import Questionnaire from '../components/Questionnaire'
import ResultModal from '../components/ResultModal'
import UserEmailModal from '../components/UserEmailModal'
import { ActionTypeStates } from '../constants/action-types'
import { CategoryRecord } from '../constants/models'
import ExpertiseModal from './ExpertiseModal'

const Spinner = require('react-spinkit')

interface ProductLauncherProps {
	sessionKey?: string
	authenticateState: AuthenticateState
	state: ProductLauncherDataState
	userState: UserDataState
	fetchCategories: any
	setActiveCategory: any
	updateQuestionValue: any
	isValidated: any
	setValidated: any
	fetchUserSession: any
	checkUserSession: any
	fetchUserData: any
	saveUserData: any
	resetUserData: any
	populateCategoriesWithAnswers: any
}

interface ProductLauncherState {
	inputPassword: string
}

class ProductLauncher extends React.Component<ProductLauncherProps, ProductLauncherState> {
	constructor(props: ProductLauncherProps) {
		super(props)
		
		this.state = {
			inputPassword: ''
		}
	}
	
	public componentDidMount() {
		// Check if the user has validated the page (entered the password)
		this.props.isValidated()
		
		// Load the session key if it exists in local storage
		this.props.checkUserSession(this.props.sessionKey)
		
		// Fetch the latest categories from the server
		// and get the latest user answers to populate those questions
		this.props.fetchCategories()
			.then((response: any) => response.payload)
			.then((categories: ReadonlyArray<CategoryRecord>) => {
				if (categories.length > 0) {
					this.props.setActiveCategory(categories[0])
				}
				
				this.props.fetchUserData(this.props.sessionKey)
					.then((response: any) => response.payload.answers ? response.payload.answers : [])
					.then((answers: any) => this.props.populateCategoriesWithAnswers(categories, answers))
			})
	}
	
	public render() {
		const {state, userState, authenticateState} = this.props
		let overallProgress: number = 0
		
		// Populate categories data
		const categories: CategoryProgressProps[] = state.categories.map(
			(c: CategoryRecord): CategoryProgressProps => {
				// Find correct values to calculate overall progress
				c.questions.map(q => {
					if (q.correctValue.indexOf(q.value) !== -1) {
						overallProgress += q.weight
					}
				})
				
				return {
					id: c.id,
					icon: c.icon,
					title: c.title,
					preQualification: c.preQualification,
					totalQuestions: c.questions.length,
					completedQuestions: c.questions.filter(q => q.value !== null).length,
					isActive: c === state.activeCategory,
					isEnabled: true,
					onClick: () => {
						this.props.setActiveCategory(c)
					}
				}
			}
		)
		const activeCategoryIndex = state.categories.indexOf(state.activeCategory)
		const nextCategoryIndex = activeCategoryIndex + 1
		const isFirst = activeCategoryIndex === 0
		const isLast = (state.categories.length <= nextCategoryIndex)
		
		return (
			<div>
				{
					(state.status !== ActionTypeStates.INPROGRESS) && (
						<div>
							<CategoriesProgress
								categories={categories}
								successValue={70}
								overallProgress={Math.ceil(overallProgress * 100)}
								onSave={() => {
									if (userState.sessionKey) {
										return this.props.saveUserData()
									} else {
										document.body.classList.add('show-user-email-modal')
										return null
									}
								}}
								onReset={() => {
									this.props.fetchCategories()
										.then((response: any) => response.payload)
										.then((fetchedCategories: ReadonlyArray<CategoryRecord>) => {
											if (fetchedCategories.length > 0) {
												this.props.setActiveCategory(fetchedCategories[0])
											}
										})
								}}
							/>
							{
								state.activeCategory && (
									<Questionnaire
										{...state.activeCategory}
										isFirst={isFirst}
										isLast={isLast}
										onAnswer={(questionId: number, value: any) => {
											this.props.updateQuestionValue(questionId, value)
											if (userState.sessionKey) {
												this.props.saveUserData()
											}
										}}
										onNext={() => {
											if (userState.sessionKey) {
												this.proceedToNextStep()
											} else {
												document.body.classList.add('show-user-email-modal')
											}
										}}
										onPrevious={() => {
											this.proceedToPreviousStep()
										}}/>
								)
							}
						</div>
					)
				}
				{
					(state.status === ActionTypeStates.INPROGRESS) && (
						<div className="page-loading">
							<div>
								<em>Loading ...</em>
								<Spinner name="three-dots" fadeIn="none"/>
							</div>
						</div>
					)
				}
				{/* Modals */}
				{
					state.activeExpertise && (
						<ExpertiseModal expertise={state.activeExpertise}/>
					)
				}
				{
					!userState.sessionKey && (
						<UserEmailModal
							onSubmit={(userEmail: string) => {
								this.props.fetchUserSession(userEmail)
									.then(() => this.props.saveUserData())
								this.proceedToNextStep()
							}}
							onCancel={() => {
								this.props.fetchUserSession()
									.then(() => this.props.saveUserData())
								this.proceedToNextStep()
							}}
						/>
					)
				}
				<ResultModal score={overallProgress} isLoggedIn={authenticateState.user != null}/>
			</div>
		)
	}
	
	private proceedToNextStep() {
		const {state} = this.props
		const activeCategoryIndex = state.categories.indexOf(state.activeCategory)
		const nextCategoryIndex = activeCategoryIndex + 1
		const isLast = (state.categories.length <= nextCategoryIndex)
		
		// Find the next category and go to that category
		if (!isLast) {
			window.scrollTo(0, (document.getElementById('questionnaire').offsetTop) - 180)
			this.props.setActiveCategory(state.categories[nextCategoryIndex])
		} else {
			document.body.classList.add('show-result-modal')
		}
		
		document.body.classList.remove('show-user-email-modal')
	}
	
	private proceedToPreviousStep() {
		const {state} = this.props
		const activeCategoryIndex = state.categories.indexOf(state.activeCategory)
		const nextCategoryIndex = activeCategoryIndex - 1
		
		// Find the previous category and go to that category
		window.scrollTo(0, (document.getElementById('questionnaire').offsetTop) - 180)
		this.props.setActiveCategory(state.categories[nextCategoryIndex])
	}
}

const mapStateToProps = (state: RootState) => ({
	state: state.productLauncher,
	userState: state.userData,
	authenticateState: state.authenticate
})

export default connect(mapStateToProps, {
	fetchCategories,
	setActiveCategory,
	updateQuestionValue,
	isValidated,
	setValidated,
	fetchUserSession,
	checkUserSession,
	fetchUserData,
	saveUserData,
	populateCategoriesWithAnswers,
	resetUserData
})(ProductLauncher)