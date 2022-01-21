// List of API endpoints
// export const HUBBERS_V1 = 'https://legacy.hubbers.io/'
// export const HUBBERS_V2 = `${process.env.WEB_URL}/`
// export const API = `${process.env.API_URL}/v2/`
// export const API_V1 = HUBBERS_V1 + 'api/v1/'

export const HUBBERS_V1 = 'https://new.api.hubbers.io/'
export const HUBBERS_V2 = `${process.env.WEB_URL}/`
export const API = HUBBERS_V1 + 'v2/'
    
export const API_V1 = HUBBERS_V1 + 'api/v1/'
export const CATEGORIES_API = API + 'categories'
export const CONTESTS_API = API + 'contests'
export const CONTEST_ENTRY_API = API + 'entries'
export const ENTRIES_CONTEST_API = API + 'entries/contest'
export const SUBMIT_ENTRIES_API = API + 'entries'
export const ATTACHMENT_API = API + 'entries'
export const EXPERTISE_API = API + 'expertise'
export const MY_EXPERTISE_API = API + 'my-expertise'
export const EXPERTISE_CATEGORY_API = API + 'expertise/category'
export const BUSINESS_NEEDS_API = API + 'business-needs'
export const BUSINESS_NEEDS_CATEGORY_API = API + 'business-needs/category'
export const EXPERTISE_CATEGORY_LIST_API = API + 'expertise-category'
export const SKILLS_API = API_V1 + 'skills'
export const EXPERTISE_IDS_API = API + 'expertise/ids'
export const EXPERTISE_ORDER_API = API + 'expertise-order'
export const USER_SESSION_API = API + 'userSession'
export const USER_DATA_API = API + 'userData'
export const PROFILE_SELF_API = API + 'profile/self'
export const PROFILE_API = API + 'profile'
export const ASSETS_API = API + 'assets'
export const TESTIMONIALS_API = API + 'testimonials'
export const PAGE_API = API_V1 + 'pages'
export const PROJECTS_API = API + 'projects'
export const PASSWORD_CHANGE_API = API_V1 + 'users/password'
export const REQUEST_SMS_API = API + 'sms-confirmation/request'
export const VERIFY_SMS_API = API + 'sms-confirmation/verify'
export const EMAIL_SETTINGS_API = API + 'email-settings'

export const FOLLOW_API = API_V1 + 'follow'
export const UNFOLLOW_API = API_V1 + 'unfollow'
export const CHECK_FOLLOW_API = API_V1 + 'check-follow'

export const LINKEDIN_API_REDIRECT = API  + 'auth/linkedin'
export const LINKEDIN_API_KEY = process.env.LINKEDIN_API_KEY

export const AUTHENTICATE_API = API + 'auth'
export const REGISTER_API = API + 'auth/register'
export const LOGIN_API = API + 'auth/login'
export const RESET_PASSWORD_API = API + 'auth/forgot'
export const RECOVER_PASSWORD_API = API + 'auth/recover'
export const ONBOARDING_API = API + 'onboarding/{role}'
export const INVITE_API = API + 'invite/{role}?code={code}'

export const INVESTORS_DATA_API = API + 'investors-data'
export const USER_TRANSACTIONS_API = API + 'transactions'
export const EVENTS_API = API + 'events'

export const OBSERVER_FORM_API = API + 'request-access/observer'

// API Conversations
export const CONVERSATIONS_API = API + 'conversations'

// API Community
export const COMMUNITY_API = API + 'communities'
