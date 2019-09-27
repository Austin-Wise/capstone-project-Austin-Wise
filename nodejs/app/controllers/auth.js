const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { Users, Sequelize } = require('../models');
const { throwIf, throwError, sendError } = require('../utils/errorHandling');
const mailer = require('../utils/mailer');

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await Users.findOne({ where: { email } }).then(
      throwIf(r => !r, 404, 'not found', 'User Not Found'),
      throwError(500, 'sequelize error')
    );
    const buffer = crypto.randomBytes(20);
    const token = buffer.toString('hex');

    // reset_expires: 24 hours (in ms)
    user.update({
      reset_token: token,
      reset_expires: Date.now() + 86400000,
    });

    const data = {
      to: user.email,
      from: 'tkrtape@yourcode.app',
      template: 'forgot',
      subject: 'Password Reset',
      ctx: {
        url: `http://localhost:3000/auth/reset_token?token=${token}`,
        name: user.firstName,
      },
    };
    await mailer.sendMail(data).catch(throwError(500, 'mail error'));
    res.json({
      message: 'Check your email for further instructions',
    });
  } catch (e) {
    sendError(res)(e);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword, verifyPassword } = req.body;
    const user = await Users.findOne({
      where: {
        reset_token: token,
        reset_expires: {
          [Sequelize.Op.gt]: Date.now(),
        },
      },
    }).then(
      throwIf(
        r => !r,
        404,
        'not found',
        'Password reset token is invalid or has expired'
      ),
      throwError(500, 'sequelize error')
    );
    if (newPassword !== verifyPassword) {
      throwError(422, 'Passwords do not match');
    }
    user.password = bcrypt.hashSync(newPassword, 10);
    user.reset_token = undefined;
    user.reset_expires = undefined;
    user.save();

    res.json({
      message: 'Password Reset',
    });

    const data = {
      to: user.email,
      from: 'tkrtape@yourcode.app',
      template: 'reset',
      subject: 'Password Reset Confirmation',
      ctx: {
        name: user.name.split(' ')[0],
      },
    };

    mailer.sendMail(data).catch(throwError(500, 'mail error'));
  } catch (e) {
    sendError(res)(e);
  }
};

exports.signUp = async (req, res) => {
  const { firstName, lastName, email, password, rePassword } = req.body;
  try {
    if (rePassword !== password) {
      throw new Error('Passwords do not match');
    } else {
      const passwordHashed = await bcrypt.hash(password, 10);
      console.log(passwordHashed);
      const userRecord = await Users.create({
        firstName,
        lastName,
        email,
        password: passwordHashed,
      });
      res.status(200).json({ token: this.generateToken(userRecord) });
    }
  } catch (e) {
    sendError(res)(e);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRecord = await Users.findOne({ where: { email } });
    console.log(userRecord);
    if (!userRecord) {
      throw new Error('User not found');
    } else {
      const correctPassword = await bcrypt.compare(
        password,
        userRecord.password
      );
      if (!correctPassword) {
        throw new Error('Incorrect Password');
      }
    }
    res.status(200).json({ token: this.generateToken(userRecord) });
  } catch (e) {
    sendError(res)(e);
  }
};

exports.generateToken = user => {
  const data = {
    id: user.id,
  };
  const signature = process.env.SIGNATURE;
  const expiration = '6h';

  return jwt.sign({ data }, signature, { expiresIn: expiration });
};
