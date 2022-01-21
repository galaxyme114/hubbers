import * as React from 'react'
import Icon from './Icon'

export interface RatingProps {
	value: number
}

const Rating: React.StatelessComponent<RatingProps> = ({value}) => {
	const starIconList = ['star-empty', 'star-empty', 'star-empty', 'star-empty', 'star-empty']
	
	for (let i = 0; i < value; i++) {
		starIconList[i] = (((value - i) >= 1) ? 'star' : 'star-half-empty')
	}
	
	return (
		<div className="star-rating">
			{
				starIconList.map((s, i) => <Icon key={i} name={s}/>)
			}
		</div>
	)
}

export default Rating