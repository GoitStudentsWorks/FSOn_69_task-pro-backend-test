const { ctrlWrapper, HttpError, transport } = require('../../helpers');
const { helperSchema } = require('../../models/helper');

const sendHelpRequest = async (req, res) => {
  const { error } = helperSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: HttpError(400) });
  }
  const { email, comment } = req.body;

  try {
    const mailOptions = {
      from: 'eco2023@meta.ua',
      to: 'olgalovealex@meta.ua',
      subject: 'Help Request',
      text: `Email: ${email}\nComment: ${comment}`,
    };

    await transport.sendMail(mailOptions);

    res.status(200).json({ message: 'Help request sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send help request' });
  }
};

module.exports = { sendHelpRequest: ctrlWrapper(sendHelpRequest) };
