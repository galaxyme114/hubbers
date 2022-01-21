import * as React from 'react'

import { OfferRecord } from '../constants/models'

export interface ExpertiseOffersProps {
	briefOffers: [OfferRecord]
	onPurchase: any
	onCompleteBrief: any
}

export interface ExpertiseOffersState {
	
}

export default class ExpertiseOffers extends React.Component<ExpertiseOffersProps, ExpertiseOffersState> {
	constructor(props: ExpertiseOffersProps) {
		super(props)
		
		this.state = {}
	}
	
	public render() {
		const {briefOffers, onCompleteBrief, onPurchase} = this.props
		const isAnySelected = briefOffers.filter(bo => bo.selected).length > 0
		
		const renderOffer = (index: number, offer: OfferRecord) => {
			const totalPrice = offer.breakdown.map(b => b.selected ? b.price : 0).reduce((a, b) => a + b, 0)
			return (
				<div key={index}>
					<div className="expertise-offers__table__row">
						<span><i className={offer.selected ? 'active' : ''}/></span>
						<span>{offer.name}</span>
						<span>{totalPrice}</span>
					</div>
				</div>
			)
		}
		
		return (
			<div>
				<div className="expertise-offers">
					{
						(briefOffers && briefOffers.length) > 0 && (
							<div>
								<div className="expertise-offers__table">
									<div className="expertise-offers__table__header">
										<span/>
										<span>Name</span>
										<span>Price</span>
									</div>
									{
										briefOffers.map((bo, index) => renderOffer(index, bo))
									}
								</div>
								<div className="expertise-offers__cta">
									<button
										className="btn btn-outline btn-rounded"
										onClick={onPurchase}
										disabled={!isAnySelected}>Purchase
									</button>
								</div>
							</div>
						)
					}
					{
						(!briefOffers || !briefOffers.length) && (
							<div className="desk-section desk-section--new-project">
								<div className="desk-section__content">
									<h3>You've got no offers</h3>
									<p>Complete the task brief to receive offers for the expertise</p>
									<div className="cta">
										<button className="btn btn-rounded" onClick={onCompleteBrief}>Complete your brief</button>
									</div>
								</div>
							</div>
						)
					}
				</div>
			</div>
		)
	}
	
}