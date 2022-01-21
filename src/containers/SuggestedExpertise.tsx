import * as React from 'react'
import { connect } from 'react-redux'
import { setActiveExpertise } from '../actions/productLauncher'
import { fetchExpertise, toggleSuggestedExpertise } from '../actions/suggestedExpertise'
import {
	favouriteExpertise,
	removeFavouriteExpertise,
	removeShortlistExpertise,
	shortlistExpertise
} from '../actions/userData'
import Expertise from '../components/Expertise'
import { ActionTypeStates } from '../constants/action-types'
import { ExpertiseRecord } from '../constants/models'
import { RootState } from '../reducers/index'
import { State as SuggestedExpertiseDataState } from '../reducers/suggestedExpertise'
import { State as UserDataState } from '../reducers/userData'

const Spinner = require('react-spinkit')

export interface SuggestedExpertiseProps {
	state: SuggestedExpertiseDataState
	userDataState: UserDataState
	fetchExpertise: any
	toggleSuggestedExpertise: any
	setActiveExpertise: any
	shortlistExpertise: any
	removeShortlistExpertise: any
	favouriteExpertise: any
	removeFavouriteExpertise: any
	expertiseTags: [string]
}

class SuggestedExpertise extends React.Component<SuggestedExpertiseProps, {}> {
	public componentDidMount() {
		const {expertiseTags} = this.props
		this.props.fetchExpertise(null, expertiseTags)
	}
	
	public render() {
		const {state, userDataState} = this.props
		const expertiseList = state.expertiseList.slice(0, 3)
		
		return (
			<div className="suggested-expertise">
				<div className="suggested-expertise__top">
					<div className="suggested-expertise__label">
						Suggested Expertise
						{
							state.status === ActionTypeStates.INPROGRESS && <Spinner name="three-dots" fadeIn="none"/>
						}
						{
							state.status === ActionTypeStates.SUCCESS && <span>{' (' + state.expertiseList.length + ')'}</span>
						}
					</div>
					<div className="suggested-expertise__display-check">
						<label>
							<input
								type="checkbox"
								checked={state.displaySuggestedExpertise}
								onChange={() => {
									this.props.toggleSuggestedExpertise(!state.displaySuggestedExpertise)
								}}/>
							Show me suggestions
						</label>
					</div>
				</div>
				
				{
					(state.displaySuggestedExpertise && state.status !== ActionTypeStates.INPROGRESS) && (
						<div className="suggested-expertise__expertise-list">
							{
								expertiseList.map((e: ExpertiseRecord) => {
									const isShortlisted = userDataState.shortlistedExpertise ?
										userDataState.shortlistedExpertise.find(se => se === e._id) !== undefined : false
									const isFavourite = userDataState.favouriteExpertise ?
										userDataState.favouriteExpertise.find(fe => fe === e._id) !== undefined : false
									
									return (
										<Expertise
											key={e._id}
											{...e}
											isMicro={true}
											isShortlisted={isShortlisted}
											isFavourite={isFavourite}
											onClick={() => {
												this.handleExpertiseClick(e)
											}}
											onShortlist={() => {
												isShortlisted ? this.props.removeShortlistExpertise(e._id) : this.props.shortlistExpertise(e._id)
											}}
											onFavourite={() => {
												isFavourite ? this.props.removeFavouriteExpertise(e._id) : this.props.favouriteExpertise(e._id)
											}}
										/>
									)
								})
							}
						</div>
					)
				}
			</div>
		)
	}
	
	private handleExpertiseClick(expertise: ExpertiseRecord) {
		this.props.setActiveExpertise(expertise)
	}
}

const mapStateToProps = (state: RootState) => ({
	state: state.suggestedExpertise,
	userDataState: state.userData
})

export default connect(mapStateToProps, {
	fetchExpertise,
	toggleSuggestedExpertise,
	setActiveExpertise,
	shortlistExpertise,
	removeShortlistExpertise,
	favouriteExpertise,
	removeFavouriteExpertise
})(SuggestedExpertise)