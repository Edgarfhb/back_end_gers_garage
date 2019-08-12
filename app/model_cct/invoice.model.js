module.exports = (sequelize, Sequelize) => {
	const Invoice = sequelize.define('invoice', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        booking_id: {
            type: Sequelize.INTEGER
        },
        status_id: {
            type: Sequelize.INTEGER
        },
        total: {
            type: Sequelize.INTEGER
        }
	});

	return Invoice;
}
