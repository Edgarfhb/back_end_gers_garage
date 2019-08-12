module.exports = (sequelize, Sequelize) => {
	const VehicleMake = sequelize.define('vehicle_make', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        make: {
            type: Sequelize.STRING
        }
	});

	return VehicleMake;
}
