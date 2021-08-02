const Sequelize=require('sequelize');

module.exports=class Comment extends Sequelize.Model{
	static init(sequelize){
		return super.init({
			comment:{
				type:Sequelize.STRING(100),
				allowNull:false,
			},
		},{
			sequelize,
			timastamps:true,
			underscored:false,
			modelName:'Comment',
			tableName:'comments',
			paranoid:true,
			charset:'utf8',
			collate:'utf8_general_ci',
		});
	}
	static associate(db){
		db.Comment.belongsTo(db.Post);
		db.Comment.belongsTo(db.User);
	}
}