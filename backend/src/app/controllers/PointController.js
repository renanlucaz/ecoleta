import Sequelize, { Op, QueryTypes } from 'sequelize';
import databaseConfig from '../../config/database';
import Point from '../models/Point';
import Item from '../models/Item';

class PointController {
    async index(req, res) {
        const sequelize = new Sequelize(databaseConfig);

        const { city, uf, items } = req.query;

        const parsedItems = items.split(',').map((item) => item.trim());

        const item_id = await sequelize.query(
            `select * from point_items where item_id in (${parsedItems})`,
            {
                type: QueryTypes.SELECT,
            }
        );

        const parsedPoints = item_id.map((point) => point.point_id);

        const points = await Point.findAll({
            where: {
                [Op.and]: [{ city }, { uf }],
                id: { [Op.in]: parsedPoints },
            },
        });

        return res.json(points);
    }

    async store(req, res) {
        const {
            items,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        } = req.body;

        const emailExists = await Point.findOne({
            where: { email },
        });

        if (emailExists) {
            return res.status(400).json({ error: 'email already exists' });
        }

        const point = await Point.create({
            image:
                'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        });

        if (items && items.length > 0) {
            point.setItems(items);
        }

        return res.json(point);
    }

    async show(req, res) {
        const { id } = req.params;

        const point = await Point.findOne({
            where: { id },
            include: {
                model: Item,
                as: 'items',
                attributes: ['title'],
            },
        });

        if (!point) {
            return res.status(400).json({
                error: 'Point not found ',
            });
        }

        return res.json(point);
    }
}

export default new PointController();
