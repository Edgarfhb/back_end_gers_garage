module.exports = (sequelize, Sequelize) => {
	const Bookings = sequelize.define('booking', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        date: {
            type: Sequelize.DATE
        },
        car_id: {
            type: Sequelize.INTEGER
        },
        service_id: {
            type: Sequelize.INTEGER
        },
        status_id: {
            type: Sequelize.INTEGER
        },
        staff_id: {
            type: Sequelize.INTEGER
        },
				invoice_id: {
            type: Sequelize.INTEGER
        },
        comments: {
            type: Sequelize.STRING
        }
	});

	return Bookings;
}
