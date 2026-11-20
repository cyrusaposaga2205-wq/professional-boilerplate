import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { validate } from '../middleware/validate';
import {
    createUserSchema,
    updateUserSchema,
    idParamSchema,
    paginationQuerySchema,
} from '../dto/user.dto';
import { asyncHandler } from '../utils/asyncHandler';
import { authMiddleware } from '../middleware/auth';

export const userRoutes = Router();

// Public registration route
userRoutes.post(
    '/',
    validate(createUserSchema),
    asyncHandler(UserController.create)
);

// Protected routes
userRoutes.get(
    '/',
    authMiddleware,
    validate(paginationQuerySchema, 'query'),
    asyncHandler(UserController.getAll)
);

userRoutes.get(
    '/:id',
    authMiddleware,
    validate(idParamSchema, 'params'),
    asyncHandler(UserController.getById)
);

userRoutes.put(
    '/:id',
    authMiddleware,
    validate(idParamSchema, 'params'),
    validate(updateUserSchema),
    asyncHandler(UserController.update)
);

userRoutes.delete(
    '/:id',
    authMiddleware,
    validate(idParamSchema, 'params'),
    asyncHandler(UserController.delete)
);