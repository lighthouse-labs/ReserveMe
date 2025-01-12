const router = require("express").Router();
const withAuth = require('../middleware');

module.exports = db => {
  router.get("/admin/:store_id/counter", withAuth, (request, response) => {
    const store_id = request.params.store_id;
    db.query(
      `
      SELECT
      store_id,
      name,
      
      location,
      capacity,
      customer_count,
      reservation_capacity,

      is_admin
    FROM stores WHERE store_id = ${store_id}
    `
    ).then(({ rows: store }) => {
      response.json(store);
    });
  });

  router.get("/admin/counter", withAuth, (request, response) => {

    db.query(
      `
      SELECT
      user_id
      FROM users WHERE is_admin = true
`
    ).then(() => {
      response.send('Counter page here');
    });
  });
  return router;
};
