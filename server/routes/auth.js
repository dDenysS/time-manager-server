const Router = require('koa-router')
const passport = require('koa-passport')

const router = new Router({
    prefix: '/auth'
})

router.get('/github/callback',
    passport.authenticate('github', {failureRedirect: '/login'}),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/')
    })

router.get('/github', passport.authenticate('github'))

module.exports = router
