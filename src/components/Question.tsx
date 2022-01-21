import * as React from 'react'
import { QuestionTypes } from '../constants/enums'
import { QuestionRecord } from '../constants/models'
import SuggestedExpertise from '../containers/SuggestedExpertise'
import SmoothScroll from '../utils/smoothScroll'
import QuestionControlRating from './QuestionControlRating'
import QuestionControlYesNo from './QuestionControlYesNo'

interface QuestionProps extends QuestionRecord {
	onAnswer: any,
	onHover: any,
	isActive: boolean,
	isInteracted: boolean
}

export default class Question extends React.Component<QuestionProps, {}> {
	public render() {
		const {id, title, type, value, tags, correctValue, onAnswer, onHover, isActive, isInteracted} = this.props
		let QuestionControl
		
		switch (type) {
			case QuestionTypes.YES_NO:
				QuestionControl = QuestionControlYesNo
				break
			case QuestionTypes.RATING:
				QuestionControl = QuestionControlRating
				break
			default:
				QuestionControl = QuestionControlYesNo
		}
		
		return (
			<div id={'question--' + id}>
				<div className={'question question--' + type + ' ' + (isActive ? 'active' : '')} onMouseEnter={onHover}>
					<div className="question__title">{title}</div>
					<div className="question__control">
						<QuestionControl id={id} value={value} onAnswer={(v: any, t: any) => {
							onAnswer(v, t)
							setTimeout(() => {
								new SmoothScroll(300).scrollTo('question--' + id, 200)
							}, 250)
						}}/>
					</div>
					{/*<div className="question__score">{weight * 100}%</div>*/}
				</div>
				
				{
					(isInteracted && (value !== null && correctValue.indexOf(value) === -1)) &&
					<SuggestedExpertise expertiseTags={tags}/>
				}
			</div>
		)
	}
}