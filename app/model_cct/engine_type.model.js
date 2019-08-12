module.exports = (sequelize, Sequelize) => {
	const EngineType = sequelize.define('engine_type', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        type: {
            type: Sequelize.STRING
        }
	});

	return EngineType;
}
