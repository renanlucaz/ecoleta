import Sequelize, { Model } from 'sequelize';

class Point extends Model {
    static init(sequelize) {
        super.init(
            {
                point_id: Sequelize.INTEGER,
                item_id: Sequelize.INTEGER,
            },
            {
                sequelize,
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Point, { foreignKey: 'point_id' });
        this.belongsTo(models.Item, { foreignKey: 'item_id' });
    }
}

export default Point;
