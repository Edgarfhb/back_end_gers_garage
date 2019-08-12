module.exports = (sequelize, Sequelize) => {
	const Staff = sequelize.define('staff', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        }
	});

	return Staff;
}
