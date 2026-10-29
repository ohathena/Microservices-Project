const { OAuth2Client } = require('google-auth-library');
const { CustomerRepository } = require("../database");
const {
  FormateData,
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
  PublishMessage,
  ValidatePassword,
} = require("../utils");
const { GOOGLE_CLIENT_ID } = require("../config");

const oauthClient = new OAuth2Client(GOOGLE_CLIENT_ID);

// All Business logic for customer
class CustomerService {
  constructor(channel) {
    this.repository = new CustomerRepository();
    this.channel = channel;
  }

  async SignIn(userInputs) {
    const { email, password } = userInputs;

    if (!email || !password) {
      return FormateData({ error: "Email and password are required" });
    }

    const existingCustomer = await this.repository.FindCustomer({ email });

    if (existingCustomer) {
      const validPassword = await ValidatePassword(
        password,
        existingCustomer.password,
        existingCustomer.salt
      );

      if (validPassword) {
        const token = await GenerateSignature({
          email: existingCustomer.email,
          _id: existingCustomer._id,
        });
        return FormateData({
          id: existingCustomer._id,
          email: existingCustomer.email,
          name: existingCustomer.name,
          token,
        });
      } else {
        return FormateData({ error: "Invalid password" });
      }
    }

    return FormateData({ error: "User not found" });
  }

  async SignUp(userInputs) {
    const { name, email, password, phone } = userInputs;

    if (!email || !password) {
      return FormateData({ error: "Email and password are required" });
    }

    // Check if customer already exists
    const existingCustomer = await this.repository.FindCustomer({ email });
    if (existingCustomer) {
      return FormateData({ error: "Customer already exists with this email" });
    }

    // Create salt and hash password
    const salt = await GenerateSalt();
    const userPassword = await GeneratePassword(password, salt);

    const newCustomer = await this.repository.CreateCustomer({
      name: name || "",
      email,
      password: userPassword,
      phone: phone || "",
      salt,
    });

    PublishMessage(this.channel, "mailing_service", {
      event: "USER_REGISTERED",
      data: {
        to: newCustomer.email,
        name: newCustomer.name || "Customer",
      },
    });

    const token = await GenerateSignature({
      email: newCustomer.email,
      _id: newCustomer._id,
    });

    return FormateData({
      id: newCustomer._id,
      email: newCustomer.email,
      name: newCustomer.name,
      token,
    });
  }

  async GoogleSignIn({ credential }) {
    if (!credential) {
      return FormateData({ error: "Google credential token is required" });
    }

    try {
      // Verify token with Google's public keys
      const ticket = await oauthClient.verifyIdToken({
        idToken: credential,
        audience: GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      const { email, name, sub: googleId, picture } = payload;

      if (!email) {
        return FormateData({ error: "Google account has no associated email" });
      }

      // Check if user already exists
      let customer = await this.repository.FindCustomer({ email });

      if (!customer) {
        // Create new customer account with Google info
        customer = await this.repository.CreateCustomer({
          name: name || "Google User",
          email: email,
          password: `google_oauth_${googleId}`,
          phone: "",
          salt: "google_oauth",
        });

        PublishMessage(this.channel, "mailing_service", {
          event: "USER_REGISTERED",
          data: {
            to: customer.email,
            name: customer.name || "Google User",
          },
        });
      }

      const token = await GenerateSignature({
        email: customer.email,
        _id: customer._id || customer.id,
      });

      return FormateData({
        id: customer._id || customer.id,
        email: customer.email,
        name: customer.name || name,
        picture: picture || null,
        token,
      });
    } catch (err) {
      console.error("Google token verification failed:", err.message);
      return FormateData({ error: "Google authentication failed: " + err.message });
    }
  }

  async AddNewAddress(_id, userInputs) {
    const { street, postalCode, city, country } = userInputs;
    const addressResult = await this.repository.CreateAddress({
      _id,
      street,
      postalCode,
      city,
      country,
    });
    return FormateData(addressResult);
  }

  async GetProfile(id) {
    const existingCustomer = await this.repository.FindCustomerById({ id });
    return FormateData(existingCustomer);
  }

  async GetShopingDetails(id) {
    const existingCustomer = await this.repository.FindCustomerById({ id });
    if (existingCustomer) {
      return FormateData(existingCustomer);
    }
    return FormateData({ msg: "Error" });
  }

  async GetWishList(customerId) {
    const wishListItems = await this.repository.Wishlist(customerId);
    return FormateData(wishListItems);
  }

  async AddToWishlist(customerId, product) {
    const wishlistResult = await this.repository.AddWishlistItem(customerId, product);
    return FormateData(wishlistResult);
  }

  async ManageCart(customerId, product, qty, isRemove) {
    const cartResult = await this.repository.AddCartItem(
      customerId,
      product,
      qty,
      isRemove
    );
    return FormateData(cartResult);
  }

  async ManageOrder(customerId, order) {
    const orderResult = await this.repository.AddOrderToProfile(customerId, order);
    return FormateData(orderResult);
  }

  async SubscribeEvents(payload) {
    try {
      console.log("Triggering Customer Event...");
      const parsed = typeof payload === "string" ? JSON.parse(payload) : payload;
      const { event, data } = parsed;
      const { userId, product, order, qty } = data || {};

      switch (event) {
        case "ADD_TO_WISHLIST":
        case "REMOVE_FROM_WISHLIST":
          if (userId && product) this.AddToWishlist(userId, product);
          break;
        case "ADD_TO_CART":
          if (userId && product) this.ManageCart(userId, product, qty, false);
          break;
        case "REMOVE_FROM_CART":
          if (userId && product) this.ManageCart(userId, product, qty, true);
          break;
        case "CREATE_ORDER":
          if (userId && order) this.ManageOrder(userId, order);
          break;
        default:
          break;
      }
    } catch (err) {
      console.error("Error processing customer event:", err.message);
    }
  }
}

module.exports = CustomerService;
