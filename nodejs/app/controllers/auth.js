const { Users, Sequelize } = require('../models');
const { throwIf, throwError, sendError } = require('../utils/errorHandling');
const crypto = require('crypto');
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
      reset_expires: Date.now() + 86400000
    });

    const data = {
      to: user.email,
      from: 'tkrtape@yourcode.app',
      template: 'forgot',
      subject: 'Pssword Reset',
      ctx: {
        url: `http://localhost:3000/auth/reset_token?token=${token}`,
        name: user.name.split(' ')[0]
      }
    };
    // TODO: Do I use first and last or just name
    await mailer.sendMail(data).catch(throwError(500, 'mail error'));
    res.json({
      message: 'Check your email for further instructions'
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
          [Sequelize.Op.gt]: Date.now()
        }
      }
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
      message: 'Password Reset'
    });

    const data = {
      to: user.email,
      from: 'tkrtape@yourcode.app',
      template: 'reset',
      subject: 'Password Reset Confirmation',
      ctx: {
        name: user.name.split(' ')[0]
      }
    };

    mailer.sendMail(data).catch(throwError(500, 'mail error'));
  } catch (e) {
    sendError(res)(e);
  }
};
