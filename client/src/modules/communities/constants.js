
export const ActionTypes = Object.freeze({
    FETCHED_COMMUNITY: 'FETCHED_COMMUNITY'
})

export const initialState = {
    currentProfile: {},
    communities: {},
}


export const createFormInitialState = {
    name: '',
    story: '',
}

// Page 1
export const title1 = 'Let\'s get into it';
export const subTitle1 = 'Build your community profile';

export const nameLabel1 = 'Community Name *';
export const namePlaceholder1 = 'Enter your community name';

export const storyLabel1 = 'Community story *';
export const storyPlaceholder1 = 'Tell us about your community';

export const urlLabel1 = 'Website url';
export const urlPlaceholder1 = 'Enter website url';

export const ctaText1 = 'STEP 1 OF 2';

// Page 2
export const title2 = 'Your community tags'
export const subtitle2 = 'Categorise your community (3 minimum)'

export const fieldTitle2 = 'Choose from the most popular'
export const ctaText2 = 'CREATE COMMUNITY';

// Profile
export const storyTitle = 'Our Story'
export const membersTitle = 'Members'
export const adminTitle = 'Community Admin'
export const postTitle = 'Posts'
export const eventsTitle = 'Upcoming Events'
export const articlesTitle = 'Articles'
export const seeAllLabel = 'See all'