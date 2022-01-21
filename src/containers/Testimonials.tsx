import * as React from 'react'
import { connect } from 'react-redux'
import Slider from 'react-slick'

import { RootState } from '../reducers/index'
import { State as TestimonialsDataState } from '../reducers/testimonials'

import { fetchTestimonials } from '../actions/testimonials'
import { galleryCarousel } from '../constants/carouselSettings'
import { TestimonialRecord } from '../constants/models'

export interface TestimonialsProps {
	state: TestimonialsDataState
	fetchTestimonials: any
}

class Testimonials extends React.Component<TestimonialsProps, {}> {
	public componentDidMount() {
		this.props.fetchTestimonials()
	}
	
	public render() {
		const {state} = this.props
		
		return (
			<div className="testimonials__list">
				{
					state.testimonialsList.length > 0 && (
						<Slider {...galleryCarousel}>
							{
								state.testimonialsList.map((testimonial: TestimonialRecord) => (
									<div className="testimonial" key={testimonial.id}>
										<div
											className="testimonial__image"
											style={{backgroundImage: `url(${testimonial.image})`}}/>
										<div className="testimonial__content">
											{
												testimonial.title && <div className="testimonial__content__title">{testimonial.title}</div>
											}
											<div className="testimonial__content__content">{testimonial.content}</div>
											<div className="testimonial__content__caption">- {testimonial.caption}</div>
										</div>
									</div>
								))
							}
						</Slider>
					)
				}
			</div>
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	state: state.testimonials
})

export default connect(mapStateToProps, {
	fetchTestimonials
})(Testimonials)