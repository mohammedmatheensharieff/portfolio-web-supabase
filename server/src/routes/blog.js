import express from 'express';
import { body, validationResult } from 'express-validator';
import slugify from 'slugify';
import BlogPost from '../models/BlogPost.js';
import authRequired from '../middleware/auth.js';
import sanitizeUser from '../utils/sanitizeUser.js';

const router = express.Router();

const validate = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
  }
  return next();
};

const formatPost = (post) => {
  if (!post) return null;
  const plain = post.toJSON();
  return {
    id: plain._id || plain.id,
    title: plain.title,
    content: plain.content,
    excerpt: plain.excerpt || null,
    coverImage: plain.coverImage || null,
    published: plain.published,
    slug: plain.slug,
    createdAt: plain.createdAt,
    updatedAt: plain.updatedAt,
    authorId: plain.author?._id?.toString() || plain.author?.id || plain.author,
    author: plain.author ? sanitizeUser(plain.author) : null,
  };
};

router.get('/', async (req, res, next) => {
  try {
    const query = { published: true };
    if (req.query.published === 'false') {
      delete query.published;
    }

    const posts = await BlogPost.find(query).populate('author').sort({ createdAt: -1 });
    res.json({ posts: posts.map(formatPost) });
  } catch (error) {
    next(error);
  }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug }).populate('author');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ post: formatPost(post) });
  } catch (error) {
    next(error);
  }
});

const postValidations = [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('excerpt').optional().isLength({ max: 400 }).withMessage('Excerpt too long'),
  body('coverImage').optional({ checkFalsy: true }).isURL().withMessage('Cover image must be a valid URL'),
  body('published').optional().isBoolean().withMessage('Published must be boolean'),
];

router.post('/', authRequired, postValidations, validate, async (req, res, next) => {
  try {
    const baseSlug = slugify(req.body.slug || req.body.title, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;
    // ensure unique slug
    while (await BlogPost.exists({ slug })) {
      slug = `${baseSlug}-${counter++}`;
    }

    const post = await BlogPost.create({
      title: req.body.title,
      content: req.body.content,
      excerpt: req.body.excerpt,
      coverImage: req.body.coverImage,
      published: Boolean(req.body.published),
      slug,
      author: req.user.id,
    });

    const populated = await post.populate('author');
    res.status(201).json({ post: formatPost(populated) });
  } catch (error) {
    next(error);
  }
});

router.put('/:slug', authRequired, postValidations, validate, async (req, res, next) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You do not have permission to update this post' });
    }

    post.title = req.body.title ?? post.title;
    post.content = req.body.content ?? post.content;
    post.excerpt = req.body.excerpt ?? post.excerpt;
    post.coverImage = req.body.coverImage ?? post.coverImage;
    if (typeof req.body.published === 'boolean') {
      post.published = req.body.published;
    }

    if (req.body.slug && req.body.slug !== post.slug) {
      const newSlugBase = slugify(req.body.slug, { lower: true, strict: true });
      let newSlug = newSlugBase;
      let counter = 1;
      while (await BlogPost.exists({ slug: newSlug, _id: { $ne: post._id } })) {
        newSlug = `${newSlugBase}-${counter++}`;
      }
      post.slug = newSlug;
    }

    await post.save();
    const populated = await post.populate('author');
    res.json({ post: formatPost(populated) });
  } catch (error) {
    next(error);
  }
});

router.delete('/:slug', authRequired, async (req, res, next) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You do not have permission to delete this post' });
    }

    await post.deleteOne();
    res.json({ message: 'Post deleted' });
  } catch (error) {
    next(error);
  }
});

export default router;
