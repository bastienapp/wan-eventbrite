const express = require('express');
const app = express();
require('dotenv').config();
const eventbrite = require('eventbrite').default;

const sdk = eventbrite({ token: process.env.EVENTBRITE_TOKEN });

// pour la liste des événements
app.get('/events', function (req, res) {
  sdk
    .request(`/organizations/${process.env.ORGANIZATION_ID}/events`)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => res.status(500).json(err));
});

// pour la liste des participants à un événement
// ex /events/137574122905
app.get('/events/:id', function (req, res) {
  sdk
    .request(`/events/${req.params.id}/attendees`)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => res.status(500).json(err));
});

app.listen(8080);
