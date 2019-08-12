module.exports = (sequelize, Sequelize) => {
	const StatusInvoice = sequelize.define('status_invoice', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        status: {
            type: Sequelize.STRING
        }
	});

	return StatusInvoice;
}
