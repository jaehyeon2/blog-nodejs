const express=require('express')

const {User, Category, Post, Comment}=require('../models');
const {isLoggedIn, isNotLoggedIn}=require('./middlewares');

const router=express.Router();

router.use((req, res, next)=>{
	res.locals.user=req.user;
	next();
});

router.get('/', async(req, res, next)=>{
	try{
		const categories=await Category.findAll({order:['id', 'DESC']});
		res.render('main',{
			title:'blog-main',
			categories,
		});
	}catch(error){
		console.error(error);
		next(error);
	}
});

router.get('/join', isNotLoggedIn, (req, res)=>{
	res.render('join',{
		title:'회원가입-blog',
	});
});

router.get('/write_post', isLoggedIn, (req, res)=>{
	res.render('write',{
		title:'글쓰기-blog',
	});
});

router.pose('/write_post', isLoggedIn, async(req, res, next)=>{
	try{
		const posts=await Post.fincAll({
			where:{category:req.params.category},
			include:{
				model:'User',
				as:'Owner',
			},
		});
		res.render('category',{
			title:`blog-${category}`,
			posts,
		});
	}
});