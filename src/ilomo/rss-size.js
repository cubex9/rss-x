module.exports = function (summary) {
    let size = 0

    var arr = / Size: ([\d.]+) (MB|GB) /gi.exec(summary)

    if (arr != null) {
        size = arr[1]

        if (arr[2] === 'MB') {
            size /= 1024
        }
    }

    return size
}
