const showHomePage = (req, res) => {
    try {
        if (!req.user) return res.redirect('/auth/login');

        return res.render('home.ejs', { user: req.user });
    } catch (error) {
        console.error(error);
        return;
    }
}

export {
    showHomePage
}