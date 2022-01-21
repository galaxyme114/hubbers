import * as React from 'react'
import Slider from 'react-slick'
import { categoriesCarousel } from '../constants/carouselSettings'
import CategoryProgress, { CategoryProgressProps } from './CategoryProgress'
import CircularProgress from './CircularProgress'
import Icon from './Icon'

export interface CategoriesProgressProps {
	categories: ReadonlyArray<CategoryProgressProps>
	successValue: number
	overallProgress: number
	onSave: any
	onReset: any
}

export interface CategoriesProgressState {
	isSticky: boolean,
	isSaving: boolean,
	hasSaved: boolean
}

export default class CategoriesProgress extends React.Component<CategoriesProgressProps, CategoriesProgressState> {
	private divElement: HTMLElement
	private categoriesProgressSlider: Slider
	
	public constructor(props: CategoriesProgressProps) {
		super(props)
		
		this.state = {
			isSticky: false,
			isSaving: false,
			hasSaved: false
		}
	}
	
	public componentDidMount() {
		window.addEventListener('scroll', this.handleScroll.bind(this))
		window.addEventListener('touchmove', this.handleScroll.bind(this))
	}
	
	public componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll.bind(this))
		window.removeEventListener('touchmove', this.handleScroll.bind(this))
	}
	
	public render() {
		const {isSticky, isSaving, hasSaved} = this.state
		const {categories, overallProgress, onSave, onReset} = this.props
		const completedCategories = categories.filter(c => c.completedQuestions === c.totalQuestions)
		const activeCategory = categories.indexOf(categories.find(c => c.isActive))
		if (this.categoriesProgressSlider && activeCategory && activeCategory !== -1
			&& (activeCategory < categories.length - 3)) {
			this.categoriesProgressSlider.slickGoTo(activeCategory)
		}
		
		return (
			<div ref={divElement => this.divElement = divElement} className="categories-progress__outer">
				<div className={'categories-progress ' + (isSticky ? 'sticky' : '')}>
					<div className="categories-progress__inner">
						<div className="container">
							<div className="categories">
								<Slider ref={element => this.categoriesProgressSlider = element} {...categoriesCarousel}>
									{
										categories && categories.map(c => <div key={c.id}><CategoryProgress {...c} /></div>)
									}
								</Slider>
							</div>
							<div className="categories-progress__overall">
								<div className="categories-progress__overall__inner">
									<CircularProgress value={overallProgress} maxValue={100}/>
									<div className="categories-progress__overall__inner__actions">
										<button
											className="categories-progress__save-draft btn btn-small btn-transparent"
											onClick={() => {
												const resp = onSave()
												if (resp !== null) {
													this.setState({isSaving: true})
													resp.then(() => {
														this.setState({isSaving: false, hasSaved: true})
													})
												}
											}}>
											{(!isSaving && hasSaved) && <Icon name="checkmark"/>}
											{isSaving ? 'Saving ...' : 'Save draft'}
										</button>
										<button
											className="categories-progress__save-draft btn btn-small btn-transparent"
											onClick={onReset}>
											Start again
										</button>
									</div>
								</div>
								<div className="categories-progress__overall__indicator">
									{completedCategories.length} of {categories.length} categories completed
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
	
	private handleScroll() {
		const y = window.scrollY
		
		if (this.divElement) {
			const isSticky = y > this.divElement.offsetTop
			if (this.state.isSticky !== isSticky) {
				this.setState({isSticky})
			}
		}
	}
}