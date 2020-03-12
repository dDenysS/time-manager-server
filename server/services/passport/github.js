const passport = require('koa-passport')
const GitHubStrategy = require('passport-github').Strategy

const config = require('../../../config.json.js')

const User = require('../../database/models/User.js')

passport.use(new GitHubStrategy({
        clientID: config.github.clientId,
        clientSecret: config.github.clientSecret,
        callbackURL: 'http://localhost:3000/api/auth/github/callback'
    },
    async (accessToken, refreshToken, profile, cb) => {
        console.log(profile)
        const user = await User.query().findOne({githubId: profile.id}).first()

        if (user) {
            cb(null, user)
        } else {
            cb('Error')
        }
    }
))
