import * as React from 'react'
import { QuestionTypesYesNo } from '../constants/enums'

interface QuestionControlYesNoProps {
	id: number
	value: QuestionTypesYesNo
	onAnswer: any
}

export default class QuestionControlYesNo extends React.Component<QuestionControlYesNoProps, {}> {
	public render() {
		const {id, value, onAnswer} = this.props
		
		// Types of control buttons to display
		const types: ReadonlyArray<QuestionTypesYesNo> = [QuestionTypesYesNo.YES, QuestionTypesYesNo.NO]
		
		return (
			<div className="question-control question-control--YES_NO">
				{
					types.map((t: QuestionTypesYesNo) => (
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
		)
	}
}