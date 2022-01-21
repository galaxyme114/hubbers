import { reducer as authenticate, State as AuthenticateState } from './authenticate'
import { reducer as contestDetail, State as ContestDetailState } from './contestDetail'
import { reducer as emailSettings, State as EmaiLSettingsState } from './emailSettings'
import { reducer as entryDetail, State as EntryDetailState } from './entryDetail'
import { reducer as eventDetail, State as EventDetailState } from './eventDetail'
import { reducer as eventsList, State as EventsListState } from './eventsList'
import { reducer as expertiseDetail, State as ExpertiseDetailState } from './expertiseDetail'
import { reducer as expertMarketplace, State as ExpertMarketplaceState } from './expertMarketplace'
import { reducer as grabAShare, State as GrabAShareDataState } from './grabAShare'
import { reducer as homeContestsList, State as HomeContestListState } from './homeContestsList'
import { reducer as invite, State as InviteState } from './invite'
import { reducer as leaderBoard, State as LeaderBoardState } from './leaderBoard'
import { reducer as page, State as PageState } from './page'
import { reducer as productLauncher, State as ProductLauncherState } from './productLauncher'
import { reducer as profile, State as ProfileDataState } from './profile'
import { reducer as publicProfile, State as PublicProfileDataState } from './publicProfile'
import { reducer as projectDetail, State as ProjectDetailState } from './projectDetail'
import { reducer as projectsList, State as ProjectsListState } from './projectsList'
import { reducer as suggestedExpertise, State as SuggestedExpertiseState } from './suggestedExpertise'
import { reducer as testimonials, State as TestimonialsState } from './testimonials'

import { reducer as expertDesk, State as ExpertDeskState } from './expertDesk'
import { reducer as Allconvertations, State as AllConvertationsState } from './messages'
import { reducer as userData, State as UserDataState } from './userData'
import { reducer as community, State as CommunityDataState } from './community'

export interface RootState {
	authenticate: AuthenticateState
	userData: UserDataState
	productLauncher: ProductLauncherState
	suggestedExpertise: SuggestedExpertiseState
	projectsList: ProjectsListState
	projectDetail: ProjectDetailState
	expertiseDetail: ExpertiseDetailState
	expertMarketplace: ExpertMarketplaceState
	testimonials: TestimonialsState
	homeContestsList: HomeContestListState
	grabAShare: GrabAShareDataState
	eventsList: EventsListState
	eventDetail: EventDetailState
	profile: ProfileDataState
	publicProfile: PublicProfileDataState
	invite: InviteState
	page: PageState
	contestDetail: ContestDetailState,
	emailSettings: EmaiLSettingsState,
	Allconvertations: AllConvertationsState,
	expertDesk: ExpertDeskState
	entryDetail: EntryDetailState,
	leaderBoard: LeaderBoardState,
	community: CommunityDataState
}

export const rootReducer = {
	authenticate,
	userData,
	productLauncher,
	suggestedExpertise,
	projectsList,
	projectDetail,
	expertiseDetail,
	expertMarketplace,
	testimonials,
	homeContestsList,
	grabAShare,
	eventsList,
	eventDetail,
	profile,
	invite,
	page,
	contestDetail,
	emailSettings,
	Allconvertations,
	expertDesk,
	entryDetail,
	leaderBoard,
	community,
	publicProfile
}
