import dbConnect from "../../../db/connect.js";
import Place from "../../../db/models/Place.js";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const place = await Place.find();
    if (!place) {
      return response.status(404).json({ status: "Not Found" });
    }
    response.status(200).json(place);
  }

  if (request.method === "POST") {
    try {
      const placeData = request.body;
      await Place.create(placeData);

      response.status(201).json({ status: "Place created" });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }
}
