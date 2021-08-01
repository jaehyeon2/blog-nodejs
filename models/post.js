const Sequelize=require('sequelize');

module.exports=class Post extends Sequelize.Model{
	static init(sequelize){
		return super.init({
			title:{
				type:Sequelize.STRING(40),
				allowNull:false,
			},
			content:{
				type:Sequelize.STRING(500),
				allowNull:false,
			},
			writer:{
				type:Sequelize.STRING(40),
				allowNull:false,
			}
		},{
			sequelize,
			timastamps:true,
			underscored:false,
			modelName:'Post',
			tableName:'posts',
			paranoid:true,
			charset:'utf8mb4',
			collate:'utf8mb4_general_ci',
		});
	}
	static associate(db){
		db.Post.belongsToMany(db.User);
		db.Post.belongsToMany(db.Category);
		db.Post.hasMany(db.Comment);
	}
};