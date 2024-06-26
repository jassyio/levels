import db from '../../lib/db';
import Interaction from '../../models/AdInteractions';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { adId, userId, doubleLiked, liked, disliked } = req.body;

    // Connect to the database
    await db.connect();

    // Try to find an existing interaction
    let interaction = await Interaction.findOne({ adId, userId });

    if (interaction) {
      // If an interaction exists, update it
      interaction.doubleLiked = doubleLiked;
      interaction.liked = liked;
      interaction.disliked = disliked;
      interaction.viewed += 1;
      await interaction.save();
    } else {
      // If no interaction exists, create a new one
      interaction = await Interaction.create({
        adId,
        userId,
        doubleLiked,
        liked,
        disliked,
        viewed: 1,
      });
    }

    res.status(200).json(interaction);
  } else {
    // Handle any other HTTP methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  db.disconnect();
}
