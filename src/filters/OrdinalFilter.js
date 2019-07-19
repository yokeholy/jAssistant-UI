export default value => {
    let tenth = value % 10;
    let hundredth = value % 100;
    if (tenth === 1 && hundredth !== 11) {
        return `${value} st`;
    }
    if (tenth === 2 && hundredth !== 12) {
        return `${value} nd`;
    }
    if (tenth === 3 && hundredth !== 13) {
        return `${value} rd`;
    }
    return `${value} th`;
};
