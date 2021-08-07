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
		const categories=await Category.findAll({order:[['id', 'DESC']]});
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

router.get('/category/:id', async(req, res, next)=>{
	try{
		const category_temp=Category.findOne({
			where:{id:req.params.id},
			attributes:['category'],
		});
		console.log('category:', category_temp);
		const posts=Post.findAll({
			where:{category:category_temp},
		});
	}catch(error){
		console.error(error);
		next(error);
	}
})

router.post('/write_post', isLoggedIn, async(req, res, next)=>{
	const today = new Date();   
	const time=today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate()+' '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
	try{
		const {title, content, category}=req.body;
		console.log('title', title);
		console.log('content', content);
		const post=await Post.create({
			writer:req.user.nick,
			title,
			content,
			category,
			time:time,
			view:0,
		});
		
		const cate = Category.findOrCreate({
			where:{category:category},
		});
		const postnumber=await Post.findOne({
			attributes:['postnum'],
			where:{id:req.params.id},
		})
		await Post.update({
			views:postnumber+1,
		},{
			where:{id:req.params.id},
		});
		res.redirect('/');
	}catch(error){
		console.error(error);
		next(error);
	}
});

router.get('/post/:id', async(req, res, next)=>{
	try{
		const post_tmp=await Post.findOne({
			where:{id:req.params.id},
		});
		await Post.update({
			views:post_tmp.views+1,
		},{
			where:{id:req.params.id},
		});
		
		const post=await Post.findOne({
			where:{id:req.params.id},
		});
		
		res.render('post', {
			title:`${post.title}-NodeBoard`,
			post,
		});
	}catch(error){
		console.error(error);
		next(error);
	}
});

module.exports = router;