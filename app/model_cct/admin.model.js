module.exports = (sequelize, Sequelize) => {
	const Admins = sequelize.define('admin', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
	});

	return Admins;
}
