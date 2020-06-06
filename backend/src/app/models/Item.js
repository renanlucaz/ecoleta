import Sequelize, { Model } from 'sequelize';

class Item extends Model {
    static init(sequelize) {
        super.init(
            {
                image: Sequelize.STRING,
                title: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsToMany(models.Point, {
            through: 'point_items',
            as: 'points',
            foreignKey: 'item_id',
        });
    }
}

export default Item;
