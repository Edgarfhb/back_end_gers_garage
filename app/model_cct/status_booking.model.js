module.exports = (sequelize, Sequelize) => {
	const StatusBooking = sequelize.define('status_booking', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        status: {
            type: Sequelize.STRING
        }
	});

	return StatusBooking;
}
