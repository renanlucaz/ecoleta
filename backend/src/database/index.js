import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Point from '../app/models/Point';
import Item from '../app/models/Item';
import ItemsPoint from '../app/models/ItemsPoint';

const models = [Point, Item, ItemsPoint];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models
            .map((model) => model.init(this.connection))
            .map(
                (model) =>
                    model.associate && model.associate(this.connection.models)
            );
    }
}

export default new Database();
