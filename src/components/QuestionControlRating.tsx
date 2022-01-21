import * as React from 'react'
import { QuestionTypesRating } from '../constants/enums'

interface QuestionControlRatingProps {
	id: number
	value: QuestionTypesRating
	onAnswer: any,
	labelLow?: string,
	labelHigh?: string
}

export default class QuestionControlRating extends React.Component<QuestionControlRatingProps, {}> {
	public static defaultProps: Partial<QuestionControlRatingProps> = {
		labelLow: 'Unlikely',
		labelHigh: 'Likely'
	}
	
	public render() {
		const {id, value, onAnswer, labelLow, labelHigh} = this.props
		
		// Types of control buttons to display
		const types: ReadonlyArray<QuestionTypesRating> = [
			QuestionTypesRating.One,
			QuestionTypesRating.Two,
			QuestionTypesRating.Three,
			QuestionTypesRating.Four,
			QuestionTypesRating.Five,
			QuestionTypesRating.Six,
			QuestionTypesRating.Seven
		]
		
		return (
			<div className="question-control question-control--RATING">
				<span className="question-control__label question-control__label--low">{labelLow}</span>
				<div className="question-control__buttons">
					{
						types.map((t: QuestionTypesRating) => (
							<button
								key={t}
								className={t + ' ' + (value === t ? 'selected' : '')}
								onClick={() => {
									onAnswer(id, t)
								}}>
								{t}
							</button>
						))
					}
				</div>
				<span className="question-control__label question-control__label--high">{labelHigh}</span>
			</div>
		)
	}
}