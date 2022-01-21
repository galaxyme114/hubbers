import * as React from 'react'
import { PackageRecord } from '../constants/models'
import { getCurrencySymbol } from '../utils/currency'
import Icon from './Icon'

export interface ExpertisePackageProps extends PackageRecord {
	isLight?: boolean
	isOpen: boolean
	isPurchased?: boolean
	isHidden?: boolean
	onOpen: any
	onOrder: any
}

const ExpertisePackage: React.StatelessComponent<ExpertisePackageProps> = (
	{
		name, description, price, delivery, currency, isOpen, onOpen, onOrder,
		isLight = false, isPurchased = false, isHidden = false
	}) => {
	return (
		<div className={'expertise-package ' + (!isOpen ? 'collapsed' : '') + ' ' + (isLight ? 'light' : '')}>
			<h3 className="expertise-package__title" onClick={onOpen}>
				{getCurrencySymbol(currency)}{price} {name}
				
				<div className="expertise-package__toggle">
					<Icon name="chevron-right"/>
				</div>
			</h3>
			<div className="expertise-package__duration">
				<Icon name={'clock'}/> {delivery} days delivery
			</div>
			<div className="expertise-package__description">
				{description}
			</div>
			{
				(!isHidden && !isPurchased) && (
					<div className="expertise-package__order">
						<button
							className="btn btn-outline"
							onClick={onOrder}>
							Order Now {getCurrencySymbol(currency)}{price}
						</button>
					</div>
				)
			}
			{
				isPurchased && (
					<div className="expertise-package__order">
						<button
							className="btn btn-outline"
							disabled={true}>
							<Icon name={'result-tick'}/> Ordered
						</button>
					</div>
				)
			}
		</div>
	)
}

export default ExpertisePackage