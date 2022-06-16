require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

/**
 * @type {object}
 * @desc Checkout middleware controller, contains all middleware functions.
 */
const checkoutController = {};

/**
 * @desc Creates a Checkout Session where the client inputs their card information to purchase an item from the marketplace.
 * @returns redirects the user to '/success' or '/signup' based off the Stripe Session response
 * @see https://stripe.com/docs/api?lang=node
 */
checkoutController.createCheckoutSession = async (req, res) => {
  try {
    const { foundItem } = res.locals;
    const price_in_rupees = foundItem.price * 100; //use price_in_cents once an American stripeAPI key is created.
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: foundItem.name,
            },
            unit_amount: price_in_rupees,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:8080/success',
      cancel_url: 'http://localhost:8080/signup',
    });
    res.locals.responseURL = { url: session.url }; // success or cancel url is sent back to the user as a response that is later opened with the window API on the front end.
    return next();
  } catch (err) {
    return next({
      log: 'Error caught in createCheckoutSession in checkoutController!',
      status: 500,
      message: { err: JSON.stringify(error) },
    });
  }
};

module.exports = checkoutController;
