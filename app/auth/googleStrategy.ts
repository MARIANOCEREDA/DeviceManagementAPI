import GooglePlusTokenStrategy from "passport-google-plus-token";

const CustomGoogleStrategy = new GooglePlusTokenStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:'http://localhost:3000/api/v1/auth/google/callback',
    scope:[ 'email', 'profile']
},
async (accessToken, refreshToken, profile:any, done)=>{
    console.log("Access token: " + accessToken)
    console.log("Profile: " + profile)
    profile.accessToken = accessToken
    done(null, profile);
})

export { CustomGoogleStrategy }
