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
            through: 'ItemsPoint',
            foreignKey: 'item_id',
            as: 'item',
        });
    }
}

export default Item;
