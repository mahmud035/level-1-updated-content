import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route.js';
import { CoffeeRoutes } from '../modules/coffee/coffee.route.js';
import { PostRoutes } from '../modules/post/post.route.js';
import { ProductRoutes } from '../modules/product/product.route.js';
import { ScheduleRoutes } from '../modules/schedule/schedule.route.js';
import { UserRoutes } from '../modules/user/user.route.js';

const router = express.Router();

router.use('/users', UserRoutes);

router.use('/products', ProductRoutes);

router.use('/posts', PostRoutes);

router.use('/coffees', CoffeeRoutes);

router.use('/schedules', ScheduleRoutes);

router.use('/auth', AuthRoutes);

export default router;
