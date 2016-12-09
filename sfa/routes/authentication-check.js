module.exports = {
    checkAuth: function (req, res, next) {
        if (!req.cookies.user) {
            res.render('login', {
                title: 'Sales Force Automation',
                breadcrumb: 'Autenticação',
                user: req.cookies.user ? req.cookies.user.VendedorID : 'null'
            });
        } else {
            next();
        }
    },
    checkSuperAuth: function (req, res, next) {
        if (!req.cookies.user || !req.cookies.user.VendedorChefe) {
            if(!req.cookies.user.VendedorChefe){
                res.render('index', { title: 'Sales Force Automation', breadcrumb: 'Início', user: req.cookies.user ? req.cookies.user.VendedorID : 'null'});
            }else {
                res.render('login', {
                    title: 'Sales Force Automation',
                    breadcrumb: 'Autenticação',
                    user: req.cookies.user ? req.cookies.user.VendedorID : 'null'
                });
            }
        } else {
            next();
        }
    }
};