import * as React from 'react'
import Slider from 'react-slick'

import { doFetchExpertiseByIds } from '../actions/suggestedExpertise'
import { ActionTypeStates } from '../constants/action-types'
import { expertiseCarousel } from '../constants/carouselSettings'
import { ExpertiseRecord } from '../constants/models'
import Expertise from './Expertise'

export interface ExpertiseListProps {
	expertiseIds: string[],
	onClick: any
}

export interface ExpertiseListState {
	loadingStatus: ActionTypeStates
	expertise: ReadonlyArray<ExpertiseRecord>
}

export default class ExpertiseList extends React.Component<ExpertiseListProps, ExpertiseListState> {
	constructor(props: ExpertiseListProps) {
		super(props)
		
		this.state = {
			loadingStatus: ActionTypeStates.INPROGRESS,
			expertise: null
		}
	}
	
	public componentDidMount() {
		this.fetchExpertise(this.props.expertiseIds)
	}
	
	public componentWillReceiveProps(nextProps: ExpertiseListProps) {
		this.fetchExpertise(nextProps.expertiseIds)
	}
	
	public render() {
		const {onClick} = this.props
		const {expertise} = this.state
		
		return (
			<div>
				<div className="expertise-list">
					<div className="container">
						<div className="expertise-list__list">
							{
								expertise && (
									<Slider {...expertiseCarousel}>
										{
											expertise.map((e: ExpertiseRecord) => (
												<div key={e._id}>
													<Expertise {...e} isMicro={true} onClick={() => {
														onClick(e)
													}}/>
												</div>
											))
										}
									</Slider>
								)
							}
						</div>
					</div>
				</div>
			</div>
		)
	}
	
	private fetchExpertise(expertiseIds: string[]) {
		doFetchExpertiseByIds(expertiseIds)
			.then((expertise) => this.setState({expertise}))
	}
}