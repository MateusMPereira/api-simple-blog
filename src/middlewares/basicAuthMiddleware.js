const basicAuthMiddleware = (req, res, next) => {
  const auth = (req, res, next) => {
    const credentials = basicAuth(req);
    const username = 'portugues-para-vestibular';
    const password = 'prtgsprvstblr';

    if (!credentials || credentials.name !== username || credentials.pass !== password) {
      res.set('WWW-Authenticate', 'Basic realm="example"');
      return res.status(401).send('Autenticação necessária.');
    }
  
    next();
  };
};
  
module.exports = basicAuthMiddleware;
  