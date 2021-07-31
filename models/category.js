const Sequelize=require('sequelize');

module.exports=class Category extends Sequelize.Model{
	static init(sequelize){
		return super.init({
			category:{
				type:Sequelize.STRING(40),
				allowNull:false,
				unique:true,
			},
		},{
			sequelize,
			timastamps:true,
			underscored:false,
			modelName:'Category',
			tableName:'categories',
			paranoid:true,
			charset:'utf8',
			collate:'utf8_general_ci',
		});
	}
	static associate(db){
		db.Category.hasMany(db.Post);
	}
};