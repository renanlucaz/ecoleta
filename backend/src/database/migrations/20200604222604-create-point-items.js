module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('point_items', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            point_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'points', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            item_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'items', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: (queryInterface) => {
        return queryInterface.dropTable('points');
    },
};
