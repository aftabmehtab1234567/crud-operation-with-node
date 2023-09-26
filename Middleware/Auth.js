function requireAuth(req, res, next) {
    console.log('requireAuth middleware called');
    console.log('isAuthenticated:', req.session.isAuthenticated);
    console.log('userId:', req.session.userId);
  
    if (req.session.isAuthenticated && req.session.userId) {
        next(); // User is authenticated and the session is active, allow access to the route
    } else {
        console.log('Access denied. Redirecting to login.');
        // User is not authenticated or the session is not active, redirect to the login page
        res.redirect('/'); // Assuming '/login' is your login page URL
    }
}

module.exports = requireAuth;
