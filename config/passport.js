const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

passport.use(
    new GoogleStrategy(
        {
            clientID: "GOOGLE_CLIENT_ID",
            clientSecret: "GOOGLE_CLIENT_SECRET",
            callbackURL: "http://localhost:5000/auth/google/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            let userData = {
                email: profile.emails[0].value,
                name: profile.displayName,
                token: accessToken
            }
            done(null, userData)
        }
    )
)

