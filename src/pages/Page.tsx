import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'

import { RouteComponentProps } from 'react-router'
import { fetchPage } from '../actions/page'
import NotFound from '../components/NotFound'
import Spinner from '../components/Spinner'
import { ActionTypeStates } from '../constants/action-types'
import { RootState } from '../reducers/index'
import { State as PageState } from '../reducers/page'

interface PageMatchParams {
	slug: string
}

interface PageProps extends Partial<RouteComponentProps<PageMatchParams>> {
	pageState: PageState
	fetchPage: any
}

class Page extends React.Component<PageProps, {}> {
	public componentDidMount() {
		this.props.fetchPage(this.props.match.params.slug)
	}
	
	public render() {
		const {pageState} = this.props
		
		return (
			<div>
				{
					pageState.status === ActionTypeStates.INPROGRESS && (
						<div className="page-loading">
							<div>
								<em>Loading ...</em>
								<Spinner name="three-dots" fadeIn="none"/>
							</div>
						</div>
					)
				}
				{
					pageState.status === ActionTypeStates.SUCCESS && (
						<div className="page-standard">
							<Helmet>
								<title>{pageState.page.title} | Hubbers - Hub of Makers</title>
							</Helmet>
							<div className="container">
								<div className="page-standard__inner" dangerouslySetInnerHTML={{__html: pageState.page.content}}/>
							</div>
						</div>
					)
				}
				{
					pageState.status === ActionTypeStates.FAILED && <NotFound/>
				}
			</div>
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	pageState: state.page
})

export default connect(mapStateToProps, {
	fetchPage
})(Page)