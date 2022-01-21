import * as React from 'react'

export interface CircularProgressProps {
	value: number,
	maxValue?: number
}

const CircularProgress: React.StatelessComponent<CircularProgressProps> = (
	{value, maxValue = 100}) => {
	const progress = Math.ceil((value / maxValue) * 100)
	const rotationLeft = progress <= 50 ? ((100 - progress) / 100 * 360 * -1) :
		(180 + ((100 - (50 - progress)) / 100 * 360))
	
	return (
		<div className="circular-progress">
			<span className="circular-progress__label">{progress}%</span>
			<div className={'circular-progress__circle ' + (progress >= 50 ? 'over50' : 'under50')}>
				<div
					className="circular-progress__half-circle circular-progress__circle--left"
					style={{transform: 'rotate(' + rotationLeft + 'deg)'}}/>
				<div className="circular-progress__half-circle  circular-progress__circle--right"/>
			</div>
			<div className="circular-progress__background"/>
		</div>
	
	)
}

export default CircularProgress