const express = require("express");

const { authUrl } = require("../../libs");
const { authHandler, login } = require("../../controllers");

const { userJoiSchema } = require("../../models");
const { current, logout } = require("../../controllers/users");
const { controllerSync, valid, authenticate } = require("../../middlewares");

const router = express.Router();
// api/

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - password
 *         - email
 *         - verificationToken
 *       properties:
 *          password:
 *            type: string
 *            description: The user password, minlength 6 simbols
 *          email:
 *            type: string
 *            description: The user email
 *          name:
 *             type: string
 *             description: The user name, minlength 2 simbols
 *          balance:
 *             type: number,
 *             description: The user balance
 *          token:
 *             type: string,
 *             description: The auto generated by server string
 *          verify:
 *             type: boolean,
 *             description: ''
 *          verificationToken:
 *             type: string,
 *             description: The auto generated by server string
 *       example:
 *         name: Zoltan
 *         password: 123456
 *         email: mail@mail.com
 *         balance: 0
 *         token: token
 *         verify: true
 *         verificationToken: verificationToken
 */

/**
 * @swagger
 * /api/users/auth:
 *   post:
 *     summary: Returns user mail and status ok
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Registred new user in DB
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/models/users'
 */

router.post(authUrl.auth, valid(userJoiSchema), controllerSync(authHandler));
router.post(authUrl.login, valid(userJoiSchema), controllerSync(login));
router.get(authUrl.current, authenticate, current);
router.get(authUrl.logout, authenticate, logout);

module.exports = router;
