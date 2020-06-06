import Item from '../models/Item';

class ItemController {
    async index(req, res) {
        const items = await Item.findAll();

        const serializedItems = items.map((item) => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://localhost:3333/uploads/${item.image}`,
            };
        });

        return res.json(serializedItems);
    }
}

export default new ItemController();
