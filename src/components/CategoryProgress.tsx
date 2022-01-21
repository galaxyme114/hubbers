import * as React from 'react'
import Icon from './Icon'
import ImageIcon from './ImageIcon'

export interface CategoryProgressProps {
	id: number,
	icon: string,
	title: string,
	preQualification: boolean,
	totalQuestions: number,
	completedQuestions: number,
	isActive: boolean,
	isEnabled: boolean,
	isMicro?: boolean,
	onClick: any
}

const CategoryProgress: React.StatelessComponent<CategoryProgressProps> = (
	{icon, title, isActive, isEnabled, totalQuestions, completedQuestions, onClick, isMicro = false}
) => {
	return (
		<div className={'category-progress ' +
		(isActive ? 'active' : '') + ' ' +
		(isEnabled ? '' : 'disabled') + ' ' +
		(isMicro ? 'micro' : '')
		} onClick={() => {
			// window.scrollTo(0, (document.getElementById('questionnaire').offsetTop) - 90)
			onClick()
		}}>
			<ImageIcon name={icon} isHighlighted={isActive}/>
			<h3 className="category-progress__title">{title}</h3>
			<span className="category-progress__count">
				{
					(completedQuestions === totalQuestions) && <Icon name="checkmark"/>
				}
				{completedQuestions} out of {totalQuestions} completed
			</span>
		</div>
	)
}

export default CategoryProgress