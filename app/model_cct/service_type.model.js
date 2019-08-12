module.exports = (sequelize, Sequelize) => {
	const ServiceType = sequelize.define('service_type', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        type: {
            type: Sequelize.STRING
        },
        cost: {
            type: Sequelize.INTEGER
        },
        staff_cost: {
            type: Sequelize.INTEGER
        }
	});

	return ServiceType;
}
