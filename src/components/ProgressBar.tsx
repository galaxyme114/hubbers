import * as React from 'react'

export interface ProgressBarProps {
	value: number,
	maxValue?: number,
	successValue?: number,
	isMicro?: boolean
	withCount?: boolean
}

const ProgressBar: React.StatelessComponent<ProgressBarProps> = (
	{value, maxValue = 100, successValue = 70, isMicro = false, withCount = true}) => {
	const width = Math.ceil((value / maxValue) * 100)
	
	return (
		<div className={'progress-bar ' + (isMicro ? 'micro' : '')}>
			<div className="progress-bar__inner">
				<div className="progress-bar__track" style={{width: width + '%'}}>
					{
						withCount && <span className="progress-bar__count">{width}%</span>
					}
				</div>
			</div>
		</div>
	)
}

export default ProgressBar