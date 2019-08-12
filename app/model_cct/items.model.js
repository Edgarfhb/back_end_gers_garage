module.exports = (sequelize, Sequelize) => {
	const Items = sequelize.define('items', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        cost: {
            type: Sequelize.INTEGER
        }
	});

	return Items;
}
