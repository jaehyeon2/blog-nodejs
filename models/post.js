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
			},
			time: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			views:{
				type:Sequelize.INTEGER.UNSIGNED,
				allowNull:true,
				defaultValue: 0,
			},
		},{
			sequelize,
			timastamps:true,
			underscored:false,
			modelName:'Post',
			tableName:'posts',
			paranoid:true,
			charset:'utf8',
			collate:'utf8_general_ci',
		});
	}
	static associate(db){
		db.Post.belongsToMany(db.User, {as:'Owner'});
		db.Post.belongsToMany(db.Category);
		db.Post.hasMany(db.Comment);
	}
};