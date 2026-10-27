const CustomerService = require('../services/customer-service');
const UserAuth = require('./middlewares/auth');
const { SubscribeMessage } = require('../utils');

module.exports = (app, channel) => {
  const service = new CustomerService();

  // Listen for message broker events if channel exists
  if (channel) {
    SubscribeMessage(channel, service);
  }

  app.post('/signup', async (req, res, next) => {
    try {
      const { name, email, password, phone } = req.body;
      const { data } = await service.SignUp({ name, email, password, phone });
      if (data && data.error) {
        return res.status(400).json(data);
      }
      return res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.post('/login', async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const { data } = await service.SignIn({ email, password });
      if (data && data.error) {
        return res.status(400).json(data);
      }
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.post('/google-login', async (req, res, next) => {
    try {
      const { credential } = req.body;
      if (!credential) {
        return res.status(400).json({ error: "Google credential token is required" });
      }
      const { data } = await service.GoogleSignIn({ credential });
      if (data && data.error) {
        return res.status(400).json(data);
      }
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.post('/address', UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { street, postalCode, city, country } = req.body;
      const { data } = await service.AddNewAddress(_id, {
        street,
        postalCode,
        city,
        country,
      });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get('/profile', UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { data } = await service.GetProfile(_id);
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get('/shoping-details', UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { data } = await service.GetShopingDetails(_id);
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get('/wishlist', UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { data } = await service.GetWishList(_id);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get('/whoami', (req, res) => {
    return res.status(200).json({
      service: 'Customer Service',
      database: 'Neon PostgreSQL',
      status: 'healthy',
    });
  });
};
