const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserbyUsername, getUserById){
    const authenticateUser = async (username, password, done) => {
        const user = getUserbyUsername(username);
        if (user == null) {
            return done(null, false, { message: 'No user with that username' })
        };

        try {
            // console.log('user: ' + user)
            // console.log('username: ' + username)
            // console.log('password: ' + password)
            // console.log('user_password: ' + user.password)
            if (await bcrypt.compare(password, user.password)) {                
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password incorrect!' });            
            }
        } catch (err) {
            return done(err);
        };
    };

    passport.use(new LocalStrategy(authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    });
};

module.exports = initialize;