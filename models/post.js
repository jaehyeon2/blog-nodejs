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
			category:{
				type:Sequelize.STRING(40),
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
			timestamps:true,
			underscored:false,
			modelName:'Post',
			tableName:'posts',
			paranoid:true,
			charset:'utf8',
			collate:'utf8_general_ci',
		});
	}
	static associate(db){
		db.Post.belongsTo(db.User);
		db.Post.belongsTo(db.Category);
		db.Post.hasMany(db.Comment);
	}
};