module.exports = (sequelize, Sequelize) => {
	const VehicleType = sequelize.define('vehicle_type', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        type: {
            type: Sequelize.STRING
        }
	});

	return VehicleType;
}
