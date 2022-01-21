import axios from 'axios'

import {
	FetchCategoriesFailed,
	FetchCategoriesPending,
	FetchCategoriesSuccess,
	SetActiveCategory,
	SetActiveExpertise,
	UpdateLockStatus,
	UpdateQuestionValue
} from '../constants/action-types'
import { CATEGORIES_API } from '../constants/api'
import { AnswerRecord, CategoryRecord, ExpertiseRecord } from '../constants/models'

/**
 * Fetch the categories and dispatch the data
 *
 */
export const fetchCategories = () => (dispatch: any) => {
	dispatch(new FetchCategoriesPending().toObject())
	
	return doFetchCategories()
		.then((categories: ReadonlyArray<CategoryRecord>) =>
			dispatch(new FetchCategoriesSuccess(categories).toObject()))
		.catch((error: any) => dispatch(new FetchCategoriesFailed(error).toObject()))
}

/**
 * Underlying method to fetch the category records from the plat-api using axios
 *
 * @returns {Promise<[CategoryRecord]>}
 */
export const doFetchCategories = (): Promise<[CategoryRecord]> => {
	return new Promise<[CategoryRecord]>((resolve: any, reject: any) => {
		axios.get(CATEGORIES_API)
			.then((data: any) => resolve(data.data.categories ? data.data.categories : []))
			.catch((error: any) => reject(error))
	})
}

/**
 * Populate the categories with the answers from the user
 */
export const populateCategoriesWithAnswers = (
	categories: ReadonlyArray<CategoryRecord>, answers: ReadonlyArray<AnswerRecord>) => (dispatch: any) => {
	
	categories.map(c => {
		c.questions.map(q => {
			const answeredQuestion: AnswerRecord = answers.find((a: AnswerRecord) => a.questionId === q.id)
			if (answeredQuestion) {
				q.value = answeredQuestion.value
			}
			return q
		})
		return c
	})
	
	// Loop through all categories and
	dispatch(new FetchCategoriesSuccess(categories).toObject())
}

/**
 * Set the active category
 *
 * @param {CategoryRecord} activeCategory
 */
export const setActiveCategory = (activeCategory: CategoryRecord) => (dispatch: any) => {
	dispatch(new SetActiveCategory(activeCategory).toObject())
}

/**
 * Update a question's value
 *
 * @param {number} questionId
 * @param value
 */
export const updateQuestionValue = (questionId: number, value: any) => (dispatch: any) => {
	dispatch(new UpdateQuestionValue({id: questionId, value}).toObject())
}

/**
 * Get the current user's validation state
 *
 */
export const isValidated = () => (dispatch: any) => {
	dispatch(new UpdateLockStatus(!(window.localStorage.validated === '1')).toObject())
}

/**
 * Set the current user's validation state
 *
 */
export const setValidated = () => (dispatch: any) => {
	dispatch(new UpdateLockStatus((window.localStorage.validated = '1') !== '1').toObject())
}

/**
 * Set the active expertise to display it in the expertise modal
 *
 */
export const setActiveExpertise = (expertise: ExpertiseRecord) => (dispatch: any) => {
	dispatch(new SetActiveExpertise(expertise).toObject())
	
	// Open the modal
	document.body.classList.add('show-expertise-modal')
	
	const $expertiseModal = document.getElementById('expertise-modal')
	if ($expertiseModal) {
		$expertiseModal.scrollTo({top: 0})
	}
}