
import UserService from './UserService'

describe('UserService', () => {

    let service

    const tags = [
        'app-dev',
        'ux-design',
        'javascript',
        'java'
    ]


    describe('getMatches function', () => {
        

        beforeEach(() => {
            service = new UserService()
        })

        afterEach(() => {
            service = null
        })

        it ('', () => {
            const result = service.getMatches('1', 'want', tags)
        })
    })
})