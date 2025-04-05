module.exports.generateRandomColorLight = async () => {
  return new Promise((resolve, reject) => {
    try {
      const colors = [
        '#F06D85',
        '#2EB6C9',
        '#F0C76D',
        '#20B486',
        '#0078D7',
        '#904EE2',
        '#45B6DA',
        '#602EC9',
        '#FF914D'
      ];
      const getRandomColor = () =>
        colors[Math.floor(Math.random() * colors.length)];
      resolve(getRandomColor());
    } catch (error) {
      reject(error);
    }
  });
};
