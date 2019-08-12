module.exports = (sequelize, Sequelize) => {
	const Cars = sequelize.define('cars', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        vehicle_type_id: {
            type: Sequelize.INTEGER
        },
        vehicle_make_id: {
            type: Sequelize.INTEGER
        },
        engine_id: {
            type: Sequelize.INTEGER
        },
        vehicle_licence: {
            type: Sequelize.STRING
        }
	});

	return Cars;
}
