function requireAuth(req, res, next) {
    
    console.log('isAuthenticated:', req.session.isAuthenticated);
    console.log('userId:', req.sessionID);
    
    if (req.session.isAuthenticated && req.session.user) {
        next(); 
    } else {
        console.log('Access denied. Redirecting to login.');
        // User is not authenticated or the session is not active, redirect to the login page
        res.redirect('/login'); // Assuming '/login' is your login page URL
    }
}

  
module.exports = requireAuth;
