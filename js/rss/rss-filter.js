module.exports = function(item) {

    if( /WEBRip|BDRip|DVDRip|WEB-DL/.test(item.title)) {
        return true;
    }

    return false;
}