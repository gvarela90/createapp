const ejs = require('ejs');


module.exports = (content, data) => {
  try {
    return ejs.render(content, data);
  } catch (error) {
    return content;
  }
}