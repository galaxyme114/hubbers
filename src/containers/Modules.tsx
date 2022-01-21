import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../reducers/index'

const ImgPath = '/images/modules_icon/'

const ModulesData = [
	{
		img: 'lean-canvas.png',
		title: 'Lean Canvas',
		text: 'Lorem ipsum dolor sit amet consectetur.',
		sponsor: 'nasa.png'
	},
	{
		img: 'plm.png',
		title: 'PLM',
		text: 'Lorem ipsum dolor sit amet consectetur.',
		sponsor: 'nasa.png'
	},
	{
		img: 'user-test.png',
		title: 'User test',
		text: 'Lorem ipsum dolor sit amet consectetur.',
		sponsor: 'nasa.png'
	},
	{
		img: 'certificate.png',
		title: 'Certification',
		text: 'Lorem ipsum dolor sit amet consectetur.',
		sponsor: 'nasa.png'
	},
	{
		img: 'hardware-testing.png',
		title: 'Hardware testing + QA/QC',
		text: 'Lorem ipsum dolor sit amet consectetur.',
		sponsor: 'nasa.png'
	},
	{
		img: 'branding-plan.png',
		title: 'Branding plan',
		text: 'Lorem ipsum dolor sit amet consectetur.',
		sponsor: 'disney.png'
	},
	{
		img: 'marketing-plan.png',
		title: 'Marketing plan',
		text: 'Lorem ipsum dolor sit amet consectetur.',
		sponsor: 'nike.png'
	},
	{
		img: 'communication.png',
		title: 'Communicate/PR',
		text: 'Lorem ipsum dolor sit amet consectetur.',
		sponsor: 'slack.png'
	},
	{
		img: 'croudfunding.png',
		title: 'Crowdfunding campaign',
		text: 'Lorem ipsum dolor sit amet consectetur.',
		sponsor: 'celine.png'
	},
	{
		img: 'sales.png',
		title: 'Sales (B2B)',
		text: 'Lorem ipsum dolor sit amet consectetur.',
		sponsor: 'mail-chimp.png'
	},
	{
		img: 'sales-b2c.png',
		title: 'Sales B2C/ecommerce market place',
		text: 'Lorem ipsum dolor sit amet consectetur.',
		sponsor: 'nasa.png'
	},
	{
		img: 'logistic.png',
		title: 'Logistic/3PL',
		text: 'Lorem ipsum dolor sit amet consectetur.',
		sponsor: 'nasa.png'
	},
	{
		img: 'freight-forward.png',
		title: 'Freight forwarding',
		text: 'Lorem ipsum dolor sit amet consectetur.',
		sponsor: 'nasa.png'
	},
	{
		img: 'funraising.png',
		title: 'Funraising',
		text: 'Lorem ipsum dolor sit amet consectetur.',
		sponsor: 'amazon.png'
	},
	{
		img: 'invester-module.png',
		title: 'Investor module',
		text: 'Lorem ipsum dolor sit amet consectetur.',
		sponsor: 'adidas.png'
	},
	{
		img: 'legal-ip-contract.png',
		title: 'Legal/IP/Contract',
		text: 'Lorem ipsum dolor sit amet consectetur.',
		sponsor: 'nasa.png'
	}
]

interface ModulesProps {
	modules: boolean
	toggleModules: () => void
}

interface ModulesState {
}

class Modules extends React.Component<ModulesProps, ModulesState> {
	constructor(props: ModulesProps) {
		super(props)
		this.state = {}
	}
	
	public render() {
		return (
			<div
				className={'modules_content' + (this.props.modules ? ' active' : '')}
			>
				<div className="modules_content_inner">
					<div className="modules_content_inner_header">
						<h2 className="modules_content_inner_header__title">
							Choose module
						</h2>
						<button
							className="modules_content_inner_header__button"
							onClick={this.props.toggleModules}
						>
							&times;
						</button>
					</div>
					<div className="modules_content_inner_body">
						{ModulesData.map((module, i) => (
							<div className="module_card" key={i}>
								<img
									src={`${ImgPath}info-icon.png`}
									className="module_card__info_icon"
								/>
								<div className="module_card__body">
									<img
										src={`${ImgPath}${module.img}`}
										className="module_card__body__img"
									/>
									<h4 className="module_card__body__title">{module.title}</h4>
									<p className="module_card__body__text">{module.text}</p>
									<button className="module_card__body__setup-btn">
										Set Up
									</button>
								</div>
								<div className="module_card__footer">
									<span className="module_card__footer__text">
										Global sponsor
									</span>
									<img
										className="module_card__footer__img"
										src={`${ImgPath}${module.sponsor}`}
										alt=""
									/>
								</div>
							</div>
						))}
					</div>
					<div className="modules_content_inner_footer">
						<button className="add_icon">+</button>
						<span className="add_text">Add custom module</span>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: RootState) => ({})

export default connect(
	mapStateToProps,
	{}
)(Modules)
