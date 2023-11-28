const { default: axios } = require("axios");
const express = require("express");

const app = express();
const cors = require("cors");
app.use(cors({}));

const fetch = async () => {
  let { data } = await axios.get(
    "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  );
  return draw(data.deck_id);
};

const draw = async (id) => {
  let { data } = await axios.get(
    `https://www.deckofcardsapi.com/api/deck/${id}/draw/?count=1`
  );
  return data.cards;
};
app.get("/", async (req, res) => {
  res.send("runing");
});

app.get("/getcard", async (req, res) => {
  const card = await fetch();
  res.send(card);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
