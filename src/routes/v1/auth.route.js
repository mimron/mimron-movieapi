const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');

const router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout', validate(authValidation.logout), authController.logout);
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);
router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);
router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */

/**
 * @swagger
 * path:
 *  /auth/register:
 *    post:
 *      summary: Register as user or admin
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - userName
 *                - emailAddress
 *                - password
 *                - role
 *              properties:
 *                emailAddress:
 *                  type: string
 *                  format: emailAddress
 *                  description: must be unique
 *                password:
 *                  type: string
 *                  format: password
 *                  minLength: 8
 *                  description: At least one number and one letter
 *                userName:
 *                  type: string
 *                role:
 *                  type: string
 *              example:
 *                emailAddress: userone@email.com
 *                password: password12345
 *                userName: userone
 *                role: user
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  user:
 *                    $ref: '#/components/schemas/User'
 *                  tokens:
 *                    $ref: '#/components/schemas/AuthTokens'
 *        "400":
 *          $ref: '#/components/responses/DuplicateEmail'
 */

/**
 * @swagger
 * path:
 *  /auth/login:
 *    post:
 *      summary: Login
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - emailAddress
 *                - password
 *              properties:
 *                emailAddress:
 *                  type: string
 *                  format: emailAddress
 *                password:
 *                  type: string
 *                  format: password
 *              example:
 *                emailAddress: userone@email.com
 *                password: password12345
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  user:
 *                    $ref: '#/components/schemas/User'
 *                  tokens:
 *                    $ref: '#/components/schemas/AuthTokens'
 *        "401":
 *          description: Invalid emailAddress or password
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *              example:
 *                code: 401
 *                message: Invalid emailAddress or password
 */

/**
 * @swagger
 * path:
 *  /auth/logout:
 *    post:
 *      summary: Logout
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - refreshToken
 *              properties:
 *                refreshToken:
 *                  type: string
 *              example:
 *                refreshToken: yJhbGciOiJIUzI1NiIsInR5cCI6IkpXyJhbGciOiJIUzI1NiIsInR5cCI6IkpX
 *      responses:
 *        "204":
 *          description: No content
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * path:
 *  /auth/refresh-tokens:
 *    post:
 *      summary: Refresh auth tokens
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - refreshToken
 *              properties:
 *                refreshToken:
 *                  type: string
 *              example:
 *                refreshToken: yJhbGciOiJIUzI1NiIsInR5cCI6IkpXyJhbGciOiJIUzI1NiIsInR5cCI6IkpX
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AuthTokens'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * path:
 *  /auth/forgot-password:
 *    post:
 *      summary: Forgot password
 *      description: An emailAddress will be sent to reset password.
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - emailAddress
 *              properties:
 *                emailAddress:
 *                  type: string
 *                  format: emailAddress
 *              example:
 *                emailAddress: userone@email.com
 *      responses:
 *        "204":
 *          description: No content
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * path:
 *  /auth/reset-password:
 *    post:
 *      summary: Reset password
 *      tags: [Auth]
 *      parameters:
 *        - in: query
 *          name: token
 *          required: true
 *          schema:
 *            type: string
 *          description: The reset password token
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - password
 *              properties:
 *                password:
 *                  type: string
 *                  format: password
 *                  minLength: 8
 *                  description: At least one number and one letter
 *              example:
 *                password: password12345
 *      responses:
 *        "204":
 *          description: No content
 *        "401":
 *          description: Password reset failed
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *              example:
 *                code: 401
 *                message: Password reset failed
 */
